import React, { useEffect, useRef, useState, useMemo } from "react";

const API_BASE_URL = "http://localhost:8080/api";
const GET_SESSIONS_API = ""; // yaha sirf get sessions wali API paste karni hai
const BOT_LOGO = "/icon-02.png";
const ACTIVE_CHAT_KEY = "activeChatId";

const AskHealthNow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatId, setChatId] = useState(
    localStorage.getItem(ACTIVE_CHAT_KEY) || null
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const scrollRef = useRef(null);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const token = localStorage.getItem("token");

  const currentUser = useMemo(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }, [isLoggedIn]);

  const getCurrentTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const formatHistoryTime = (createdAt) => {
    if (!createdAt) return getCurrentTime();
    try {
      return new Date(createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return getCurrentTime();
    }
  };

  const formatSessionLabel = (createdAt, id) => {
    try {
      const date = new Date(createdAt);
      const datePart = date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
      });
      const timePart = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${datePart}, ${timePart}`;
    } catch {
      return `Chat #${id.slice(-6)}`;
    }
  };

  const mapBackendRoleToUiRole = (role) => {
    if (role === "assistant") return "bot";
    return "user";
  };

  const getWelcomeMessage = () => ({
    role: "bot",
    text: `Hi, ${currentUser?.fullName || "User"}! How can I help you today? 😊`,
    time: getCurrentTime(),
  });

  const [messages, setMessages] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      if (localStorage.getItem("isLoggedIn") === "true" && parsedUser) {
        return [
          {
            role: "bot",
            text: `Hi, ${parsedUser.fullName || "User"}! How can I help you today? 😊`,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ];
      }
    } catch (error) {
      console.log(error);
    }
    return [];
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isOpen, isLoading, isHistoryLoading]);

  const loadChatSessions = async () => {
    if (!token || !GET_SESSIONS_API) return false;

    try {
      const res = await fetch(GET_SESSIONS_API, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data?.success && Array.isArray(data?.data?.sessions)) {
        setSessions(data.data.sessions);
        return true;
      }

      setSessions([]);
      return false;
    } catch (error) {
      console.error("Failed to load sessions:", error);
      setSessions([]);
      return false;
    }
  };

  const createChatSession = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/chat/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data?.success && data?.data?.chatId) {
        const newChatId = data.data.chatId;
        setChatId(newChatId);
        localStorage.setItem(ACTIVE_CHAT_KEY, newChatId);
        await loadChatSessions();
        return newChatId;
      }

      return null;
    } catch (error) {
      console.error("Failed to create chat session:", error);
      return null;
    }
  };

  const loadChatHistory = async (targetChatId) => {
    if (!targetChatId || !token) return false;

    setIsHistoryLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/chat/history/${targetChatId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data?.success && Array.isArray(data?.data?.messages)) {
        const historyMessages = data.data.messages.map((msg) => ({
          role: mapBackendRoleToUiRole(msg.role),
          text: msg.text || "",
          time: formatHistoryTime(msg.createdAt),
        }));

        if (historyMessages.length > 0) {
          setMessages(historyMessages);
        } else {
          setMessages([getWelcomeMessage()]);
        }

        setChatId(targetChatId);
        localStorage.setItem(ACTIVE_CHAT_KEY, targetChatId);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Failed to load chat history:", error);
      return false;
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const ensureSessionAndHistory = async () => {
    let activeId = chatId || localStorage.getItem(ACTIVE_CHAT_KEY);

    await loadChatSessions();

    if (activeId) {
      const loaded = await loadChatHistory(activeId);
      if (loaded) return activeId;
    }

    const newChatId = await createChatSession();
    if (newChatId) {
      setMessages([getWelcomeMessage()]);
      return newChatId;
    }

    return null;
  };

  const handleToggleChat = async () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);

    if (nextOpen) {
      await ensureSessionAndHistory();
    }
  };

  const handleSelectSession = async (sessionId) => {
    if (!sessionId || sessionId === chatId) return;
    await loadChatHistory(sessionId);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    let activeChatId = chatId || localStorage.getItem(ACTIVE_CHAT_KEY);

    if (!activeChatId) {
      activeChatId = await createChatSession();
      if (!activeChatId) return;
    }

    const textToSend = input.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: textToSend,
        time: getCurrentTime(),
      },
    ]);

    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chatId: activeChatId,
          text: textToSend,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data?.success
            ? data?.data?.reply || "No reply received."
            : data?.message || "Something went wrong.",
          time: getCurrentTime(),
        },
      ]);

      await loadChatSessions();
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Server error.",
          time: getCurrentTime(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = async () => {
    setIsLoading(false);
    setIsHistoryLoading(false);
    setInput("");
    setMessages([getWelcomeMessage()]);
    setChatId(null);
    localStorage.removeItem(ACTIVE_CHAT_KEY);

    await createChatSession();
  };

  if (!isLoggedIn) return null;

  return (
    <div className="bg-white font-sans selection:bg-emerald-500/20">
      {!isOpen && (
        <button
          onClick={handleToggleChat}
          className="fixed bottom-6 right-6 z-[60] flex h-16 w-16 items-center justify-center overflow-hidden rounded-[22px] border border-slate-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <img
            src={BOT_LOGO}
            alt="Chat Icon"
            className="h-12 w-12 object-contain"
          />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 top-[64px] z-50 flex animate-in fade-in slide-in-from-bottom-5 bg-[#fbfcfd]">
          <aside className="hidden w-72 flex-col border-r border-slate-100 bg-white p-6 md:flex">
            <button
              onClick={startNewChat}
              className="mb-8 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 active:scale-[0.98]"
            >
              <svg
                className="h-4 w-4 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>New Session</span>
            </button>

            <div className="scrollbar-thin flex-1 space-y-1 overflow-y-auto pr-2 scrollbar-thumb-slate-200">
              <p className="px-2 pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Activity
              </p>

              {sessions.length === 0 ? (
                <div className="rounded-lg bg-slate-50 px-3 py-2.5 text-sm text-slate-400">
                  No previous chats
                </div>
              ) : (
                sessions.map((session) => (
                  <button
                    key={session._id}
                    type="button"
                    onClick={() => handleSelectSession(session._id)}
                    className={`block w-full truncate rounded-lg px-3 py-2.5 text-left text-sm transition ${
                      chatId === session._id
                        ? "bg-emerald-50 font-semibold text-emerald-700"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                    title={session._id}
                  >
                    {formatSessionLabel(session.createdAt, session._id)}
                  </button>
                ))
              )}
            </div>

            <div className="mt-auto border-t border-slate-100 pt-5">
              <div className="flex items-center gap-3.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3">
                <img
                  className="h-10 w-10 rounded-full border border-white object-cover shadow-sm"
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                    currentUser?.fullName || "User"
                  }`}
                  alt="avatar"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-800">
                    {currentUser?.fullName || "User"}
                  </p>
                  <p className="mt-1 text-[10px] font-extrabold uppercase leading-none text-emerald-600">
                    Active Profile
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <main className="relative flex flex-1 flex-col bg-white">
            <header className="flex h-16 items-center justify-between border-b border-slate-50 px-8">
              <div className="flex items-center gap-3">
                <img
                  src={BOT_LOGO}
                  className="h-8 w-8 object-contain"
                  alt="logo"
                />
                <h1 className="font-bold text-slate-900">
                  Ask<span className="text-emerald-500">Health</span>Now{" "}
                  <span className="ml-1 text-[11px] font-bold text-slate-400">
                    AI
                  </span>
                </h1>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
              >
                ✕ Close
              </button>
            </header>

            <div
              ref={scrollRef}
              className="scrollbar-thin flex-1 overflow-y-auto px-6 py-12 scrollbar-thumb-slate-100"
            >
              <div className="mx-auto max-w-2xl space-y-10 lg:max-w-3xl">
                {isHistoryLoading && (
                  <div className="text-center text-sm font-medium text-slate-400">
                    Loading chat history...
                  </div>
                )}

                {!isHistoryLoading &&
                  messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-4 md:gap-6 ${
                        msg.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm ${
                          msg.role === "bot"
                            ? "border border-slate-100 bg-white p-1"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {msg.role === "bot" ? (
                          <img
                            src={BOT_LOGO}
                            alt="Bot"
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          "👤"
                        )}
                      </div>

                      <div
                        className={`flex max-w-[80%] flex-col gap-1.5 ${
                          msg.role === "user" ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`rounded-2xl px-5 py-3 text-[15px] leading-relaxed shadow-sm ${
                            msg.role === "bot"
                              ? "border border-slate-100/50 bg-slate-50 text-slate-800"
                              : "bg-slate-900 font-medium text-white"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="px-1 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}

                {isLoading && (
                  <div className="flex gap-4 md:gap-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-white p-1 animate-pulse">
                      <img
                        src={BOT_LOGO}
                        alt="Bot"
                        className="h-full w-full object-contain grayscale opacity-50"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 rounded-2xl bg-slate-50 px-5 py-3">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:0.2s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 md:pb-10">
              <form
                onSubmit={handleSendMessage}
                className="relative mx-auto max-w-2xl lg:max-w-3xl"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a health question..."
                  className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-6 pr-16 text-[15px] text-slate-700 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] outline-none transition-all focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/5"
                />
                <button
                  type="submit"
                  disabled={isLoading || isHistoryLoading || !input.trim()}
                  className={`absolute right-2 top-2 flex h-[44px] w-[44px] items-center justify-center rounded-xl transition-all duration-300 group ${
                    !input.trim() || isLoading
                      ? "cursor-not-allowed bg-slate-100 text-slate-400"
                      : "bg-gradient-to-tr from-slate-800 to-black text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] active:scale-95"
                  }`}
                >
                  {isLoading ? (
                    <svg
                      className="h-5 w-5 animate-spin text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className={`h-5 w-5 transition-transform duration-300 ${
                        input.trim()
                          ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-[-10deg]"
                          : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                      />
                    </svg>
                  )}
                </button>
              </form>

              <p className="mt-4 text-center text-[11px] font-bold text-slate-400">
                AI-generated responses. Consult a professional for medical
                advice.
              </p>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default AskHealthNow;
import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = ({ switch: switchModal, onClose }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailOrPhone: formData.emailOrPhone.trim(),
          password: formData.password,
        }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (!res.ok) {
        setIsError(true);
        setMessage(data.message || "Invalid credentials");
        toast.error(data.message || "Invalid credentials");
        return;
      }

      if (data.data?.token) {
        localStorage.setItem("token", data.data.token);
      }

      if (data.data?.user) {
        localStorage.setItem("user", JSON.stringify(data.data.user));
      }

      localStorage.setItem("isLoggedIn", "true");

      setIsError(false);
      setMessage(data.message || "Login successful");
      toast.success(data.message || "Login successful");

      setFormData({
        emailOrPhone: "",
        password: "",
      });

      setTimeout(() => {
        if (onClose) onClose();
        window.location.reload();
      }, 800);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage("Server error. Please try again.");
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-full bg-linear-to-r from-teal-100 via-cyan-100 to-blue-100 p-8 sm:p-10">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />

      <div className="relative z-10">
        <div className="mb-8 text-center">
          <div className="relative mb-5 inline-flex">
            <div className="relative rounded-[22px] border border-white/50 bg-white/60 p-5 shadow-[0_10px_30px_rgba(15,118,110,0.15)] backdrop-blur-xl">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-10 w-10 text-teal-600"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-800">
            Welcome Back
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-base leading-7 text-slate-600">
            Login with your email or phone number
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Email or Phone
            </label>
            <input
              type="text"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              placeholder="Enter email or phone"
              className="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-slate-800 placeholder:text-slate-400 shadow-sm outline-none backdrop-blur-md transition-all duration-300 focus:border-teal-300 focus:bg-white/85 focus:ring-4 focus:ring-teal-500/15"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-slate-800 placeholder:text-slate-400 shadow-sm outline-none backdrop-blur-md transition-all duration-300 focus:border-teal-300 focus:bg-white/85 focus:ring-4 focus:ring-teal-500/15"
              required
            />
          </div>

          {message && (
            <p
              className={`text-center text-sm font-semibold ${
                isError ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-2xl bg-linear-to-r from-teal-500 via-cyan-500 to-sky-500 py-4 text-lg font-bold text-white shadow-[0_12px_30px_rgba(6,182,212,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_35px_rgba(6,182,212,0.35)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-7 text-center text-sm font-medium text-slate-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={switchModal}
            className="font-extrabold text-teal-700 transition hover:text-teal-600 hover:underline"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
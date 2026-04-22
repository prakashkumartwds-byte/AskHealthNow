import React, { useEffect, useState } from "react";
import { Link, NavLink, } from "react-router-dom";

import Login from "../Login/login";
import Register from "../Register/Register";
import LocationBox from "../LocationBox/LocationBox";

const Navbar = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authData, setAuthData] = useState({
    isLoggedIn: false,
    user: null,
  });


  useEffect(() => {
    const syncAuth = () => {
      const loginStatus = localStorage.getItem("isLoggedIn") === "true";
      const storedUser = localStorage.getItem("user");

      let parsedUser = null;
      try {
        parsedUser = storedUser ? JSON.parse(storedUser) : null;
      } catch (error) {
        console.log(error);
        parsedUser = null;
      }

      setAuthData({
        isLoggedIn: loginStatus,
        user: parsedUser,
      });
    };

    syncAuth();
    window.addEventListener("storage", syncAuth);

    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const closeModal = () => setActiveModal(null);

  const openLogin = () => {
    setMenuOpen(false);
    setActiveModal("login");
  };

  const openRegister = () => {
    setMenuOpen(false);
    setActiveModal("register");
  };

const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("user");

  setAuthData({
    isLoggedIn: false,
    user: null,
  });

  setMenuOpen(false);

  window.location.reload(); 
};
  const navLinkClass = ({ isActive }) =>
    `transition hover:text-teal-600 ${
      isActive ? "text-teal-600" : "text-slate-600"
    }`;

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/70 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex cursor-pointer items-center gap-2">
              <div className="rounded-lg bg-teal-600 p-2 shadow-md">
                <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              <span className="text-base font-bold tracking-tight sm:text-lg">
                Ask<span className="text-teal-600">Health</span>Now
              </span>
            </Link>

            <div className="hidden lg:block">
              <LocationBox />
            </div>

            <div className="hidden items-center gap-8 text-sm font-semibold lg:flex">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/consult-doctor" className={navLinkClass}>
                Consult Doctor
              </NavLink>
              <NavLink to="/medical-stores" className={navLinkClass}>
                Medical Stores
              </NavLink>
              <NavLink to="/blog" className={navLinkClass}>
                Blog
              </NavLink>
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              {!authData.isLoggedIn ? (
                <>
                  <button
                    onClick={openLogin}
                    className="cursor-pointer font-bold text-slate-700 transition hover:text-teal-600"
                  >
                    Login
                  </button>

                  <button
                    onClick={openRegister}
                    className="cursor-pointer rounded-lg bg-linear-to-r from-teal-500 to-cyan-500 px-5 py-2 font-semibold text-white shadow-md transition hover:scale-105 hover:shadow-lg"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 font-semibold text-slate-700">
                    <span className="text-xl">🙎‍♂️</span>
                    <span>{authData.user?.fullName || "User"}</span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {menuOpen && (
            <div className="border-t border-slate-200 py-4 lg:hidden">
              <div className="mb-4">
                <LocationBox />
              </div>

              <div className="flex flex-col gap-4 text-sm font-semibold">
                <NavLink
                  to="/"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/consult-doctor"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Consult Doctor
                </NavLink>
                <NavLink
                  to="/medical-stores"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Medical Stores
                </NavLink>
                <NavLink
                  to="/blog"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Blog
                </NavLink>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                {!authData.isLoggedIn ? (
                  <>
                    <button
                      onClick={openLogin}
                      className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 font-bold text-slate-700 transition hover:text-teal-600"
                    >
                      Login
                    </button>

                    <button
                      onClick={openRegister}
                      className="cursor-pointer rounded-lg bg-linear-to-r from-teal-500 to-cyan-500 px-4 py-2 font-semibold text-white shadow-md transition"
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 font-semibold text-slate-700">
                      <span className="text-xl">🙎‍♂️</span>
                      <span>{authData.user?.fullName || "User"}</span>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            onClick={closeModal}
          />

          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-white/40 bg-white/70 shadow-[0_30px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl">
            <button
              onClick={closeModal}
              className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-slate-500 shadow transition hover:scale-105 hover:bg-white hover:text-slate-800"
            >
              ✕
            </button>

            <div className="max-h-[90vh] overflow-y-auto">
              {activeModal === "login" && (
                <Login
                  switch={() => setActiveModal("register")}
                  onClose={closeModal}
                />
              )}

              {activeModal === "register" && (
                <Register
                  switch={() => setActiveModal("login")}
                  onClose={closeModal}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
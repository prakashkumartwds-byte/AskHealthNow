import React, { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Components
import Navbar from "./component/Navbar/Navbar";
import ChatBot from "./component/ChatBot/ChatBot";
import Footer from "./component/Footer/Footer";

// Public Pages
import Home from "./Pages/Home/Home";
import ConsultDoctor from "./Pages/ConsultDoctor/ConsultDoctor";
import MedicalStores from "./Pages/MedicalStore/MedicalStores";
import HealthBlog from "./Pages/Blog/Blog";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PublicLayout = ({ children, isLoggedIn }) => {
  return (
    <>
      <Navbar />
      {isLoggedIn && <ChatBot />}
      {children}
      <Footer />
    </>
  );
};

const App = () => {
  const isLoggedIn = useMemo(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicLayout isLoggedIn={isLoggedIn}>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/consult-doctor"
          element={
            <PublicLayout isLoggedIn={isLoggedIn}>
              <ConsultDoctor />
            </PublicLayout>
          }
        />
        <Route
          path="/medical-stores"
          element={
            <PublicLayout isLoggedIn={isLoggedIn}>
              <MedicalStores />
            </PublicLayout>
          }
        />
        <Route
          path="/blog"
          element={
            <PublicLayout isLoggedIn={isLoggedIn}>
              <HealthBlog />
            </PublicLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

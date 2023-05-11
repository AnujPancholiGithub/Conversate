import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import Header from "../components/Partials/Header";
import ChatPage from "../pages/ChatPage";

const Allroutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/Auth" element={<AuthPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Chats" element={<ChatPage />} />
      </Routes>
    </>
  );
};

export default Allroutes;

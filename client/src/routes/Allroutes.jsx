import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import Header from "../components/Partials/Header";

const Allroutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/Auth" element={<AuthPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default Allroutes;

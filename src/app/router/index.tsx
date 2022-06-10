import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../ui/pages/home";
import Login from "../../ui/pages/login";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="*" element={<Navigate to="/" replace />}></Route>
    </Routes>
  );
};

export default AppRouter;

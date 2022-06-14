import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../ui/pages/Home";
import Login from "../../ui/pages/Login";
import Register from "../../ui/pages/Register";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="*" element={<Navigate to="/" replace />}></Route>
    </Routes>
  );
};

export { AppRouter };

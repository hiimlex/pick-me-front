import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../ui/pages/home";
import Login from "../../ui/pages/login";
import Register from "../../ui/pages/register";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="*" element={<Navigate to="/" replace />}></Route>
    </Routes>
  );
};

export default AppRouter;

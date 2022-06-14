import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../../ui/pages/Home";
import LoginPage from "../../ui/pages/Login";
import ProfilePage from "../../ui/pages/Profile";
import RegisterPage from "../../ui/pages/Register";
import { ProtectedRoute } from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route
        path="/profile/:username"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="*" element={<Navigate to="/" replace />}></Route>
    </Routes>
  );
};

export { AppRouter };

import type { JSX } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthSuccess } from "./pages/Auth/AuthSuccess/AuthSuccess";
import { Login } from "./pages/Auth/Login";
import { Profile } from "./pages/Auth/Profile/Profile";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("@jobmail:token");
  return token ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="" element={<></>} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

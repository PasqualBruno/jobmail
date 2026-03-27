import type { JSX } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthSuccess } from './pages/AuthSuccess/AuthSuccess';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile/Profile';


// Componente simples para proteger a rota de perfil
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('@jobmail:token');
  return token ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
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
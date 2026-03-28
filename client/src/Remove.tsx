import { ConfigProvider } from "antd";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import { AuthSuccess } from "./pages/Auth/AuthSuccess/AuthSuccess";
import { Login } from "./pages/Auth/Login";

// 1. Guard de Rota Protegida (Utilizando Outlet para rotas aninhadas)
const PrivateRoute = () => {
  const token = localStorage.getItem("@jobmail:token");
  console.log(token);
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default function App() {
  return (
    <ConfigProvider theme={{}}>
      <BrowserRouter>
        <Routes>
          {/* --- ROTAS PÚBLICAS --- */}
          <Route path="/" element={<Login />} />
          <Route path="/auth-success" element={<AuthSuccess />} />

          {/* --- ROTAS PRIVADAS (Com MainLayout) --- */}
          <Route element={<PrivateRoute />}>
            {/* Todas as rotas aqui dentro herdarão o Menu e Sidebar automaticamente */}
            <Route element={<MainLayout />}>
              <Route path="/profile" element={<div>Profile</div>} />

              {/* Futuras rotas do seu menu */}
              <Route path="/send" element={<div>Página de Envio</div>} />
              <Route
                path="/templates"
                element={<div>Página de Templates</div>}
              />

              {/* Redireciona o "/" para "/profile" se estiver logado e tentar acessar a raiz */}
              <Route path="/home" element={<Navigate to="/profile" />} />
            </Route>
          </Route>

          {/* FALLBACK: Se a rota não existir, volta para o Login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

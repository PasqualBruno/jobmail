import { ConfigProvider, Layout, theme } from "antd";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import { menuItems } from "./config/navigation.config";
import { AuthSuccess } from "./pages/Auth/AuthSuccess/AuthSuccess";
import { Login } from "./pages/Auth/Login";

const PrivateRoute = () => {
  const token = localStorage.getItem("@jobmail:token");
  return token ? <Outlet /> : <Navigate to="/" />;
};

const PublicRoute = () => {
  const token = localStorage.getItem("@jobmail:token");
  return token ? <Navigate to="/applications" /> : <Outlet />;
};

export default function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Menu: {
            activeBarBorderWidth: 0,
          },
          Layout: {
            siderBg: "none",
            headerBg: "none",
          },
        },
      }}
    >
      <Layout className="root-layout">
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Login />} />
              <Route path="/auth-success" element={<AuthSuccess />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route element={<MainLayout />}>
                {menuItems?.map((item) => {
                  if (
                    item &&
                    "key" in item &&
                    !("type" in item && item.type === "divider")
                  ) {
                    if (item.key === "/logout") return null;

                    return (
                      <Route
                        key={item.key?.toString()}
                        path={item.key?.toString()}
                        element={<div>{item.label}</div>}
                      />
                    );
                  }
                  return null;
                })}
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Layout>
    </ConfigProvider>
  );
}

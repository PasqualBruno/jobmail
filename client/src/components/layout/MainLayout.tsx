import { Layout, Menu } from "antd";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "../../config/navigation.config";

const { Sider, Content } = Layout;

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (isMobile) {
      setCollapsed(true);
    }

    if (key === "/logout") {
      localStorage.removeItem("@jobmail:token");
      navigate("/");
    } else {
      navigate(key);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsed={collapsed}
        onBreakpoint={(broken) => {
          setIsMobile(broken);
          if (!broken) setCollapsed(false);
        }}
        onCollapse={(value) => setCollapsed(value)}
        style={{ backgroundColor: "#141414", padding: "12px 0px" }}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          items={menuItems}
          style={{ borderInlineEnd: "none" }}
        />
      </Sider>

      <Layout>
        <Content style={{ padding: 24, minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

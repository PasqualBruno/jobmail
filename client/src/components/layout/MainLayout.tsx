import { Layout, Menu, Grid } from "antd";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { menuItems } from "../../config/navigation.config";
import "./MainLayout.css"

const { Sider, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const isMobile = !screens.lg && !!screens.md || !screens.lg; 

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "/logout") {
      localStorage.removeItem("@jobmail:token");
      navigate("/");
    } else {
      navigate(key);
    }
  };

  const mobileMenuFormat = menuItems.map(item => ({
  ...item,
  icon: null, 
  label: (
    <div className="mobile-tab-item">
      <span className="mobile-tab-icon">{item.icon}</span>
      <span className="mobile-tab-label">{item.label}</span>
    </div>
  ),
}));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isMobile && (
        <Sider
          width={250}
          
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "#141414",
          }}
        >
          <div style={{ height: 32, margin: 16, background: "rgba(255, 255, 255, 0.2)" }} />
          <Menu
            
            mode="inline"
            selectedKeys={[location.pathname]}
            onClick={handleMenuClick}
            items={menuItems}
          />
        </Sider>
      )}

      <Layout style={{ marginLeft: isMobile ? 0 : 250, transition: "all 0.2s" }}>
        <Content style={{ 
          padding: "24px", 
          minHeight: "100vh", 
          paddingBottom: isMobile ? 80 : 24, 
          display: "flex",
          flexDirection: "column"
        }}>
          <Outlet />
        </Content>

    
        {isMobile && (
          <Footer
            style={{
              position: "fixed",
              bottom: 0,
              width: "100%",
              padding: 0,
              height: 64,
              backgroundColor: "#141414",
              zIndex: 1000,
              display: "flex",
              alignItems: "center"
            }}
          >
            <Menu
              mode="horizontal"
              selectedKeys={[location.pathname]}
              onClick={handleMenuClick}
              items={mobileMenuFormat}
              style={{ 
                width: "100%", 
                display: "flex", 
                justifyContent: "space-around",
                lineHeight: "64px",
                backgroundColor: "transparent",
                borderBottom: "none"
              }}
           />
          </Footer>
        )}
      </Layout>
    </Layout>
  );
};

export default MainLayout;
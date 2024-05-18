import React from "react";
import "./AppLayout.css";
import { Layout, theme, Menu, Typography } from "antd";
import { useNavigate } from "react-router-dom";
//import MoviesList from "../Components/MoviesList";
import AppRoutes from "../Components/Routes/index";
const { Content, Footer, Sider } = Layout;
const { Title } = Typography;

const AppLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/AdminLogin");
  };
  const navigateToHome = () => {
    navigate("/");
  };

  const items = [
    {
      key: '1',
      label: 'MOVIES',
      onClick: () => navigateToHome(),
    },
    {
      key: '2',
      label: 'ADD MOVIE',
      onClick: () => navigateToLogin(),
    }
  ];

  return (
    <Layout hasSider style={{ marginLeft: 200, height: '100vh' }}>
      <Sider
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, background: "#F2EBF9" }}
      >
        <Title level={3} style={{textAlign: 'center', padding: 0, letterSpacing: 2, fontWeight: 500, color: '#6E6E6E'}}>Movie Rating</Title>
        <Menu
          style={{ background: "#F2EBF9", letterSpacing: 2 }} 
          mode="inline" defaultSelectedKeys={['1']} 
          items={items} 
        />
        
      </Sider>
      <Content
        style={{ margin: '24px 16px 0', overflow: 'initial' }}
      >
        <div
          className="site-layout-content"
          style={{
            padding: 24,
            textAlign: 'center'
          }}
        >
          <AppRoutes />

          {/* <MoviesList /> */}
        </div>
      </Content>
    </Layout>
  );
};
export default AppLayout;

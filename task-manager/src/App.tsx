import React, { useState } from "react";
import { Layout, Menu, theme, ConfigProvider } from "antd";
import { useRoutes, useNavigate } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { TaskList } from "./pages/TaskList";
import { TaskEdit } from "./pages/TaskEdit";
import TaskNew from "./pages/TaskNew";

import "./App.css";

import {
  UserOutlined,
  SmileTwoTone,
  HomeOutlined,
  UserAddOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
const { Header, Sider, Content, Footer } = Layout;

const App: React.FC = () => {
  const routes = [
    {
      path: "/",
      key: "/",
      icon: <HomeOutlined />,
      label: "Home",
      element: <TaskList userId={Number(sessionStorage.getItem("user"))} />,
    },
    {
      path: "/register",
      key: "/register",
      icon: <UserAddOutlined />,
      label: "Register",
      element: <Register />,
    },
    {
      path: "/login",
      key: "/login",
      icon: <UserOutlined />,
      label: "Login",
      element: <Login />,
    },
    {
      path: "/tasks/edit/:userId/:taskId",
      key: "/tasks/edit/:userId/:taskId",
      icon: <UserOutlined />,
      label: "Edit",
      element: <TaskEdit />,
    },
    {
      path: "/tasks/new/:userId",
      key: "/tasks/new/:userId",
      icon: <UserOutlined />,
      label: "New",
      element: <TaskNew />,
    },
  ];
  let element = useRoutes(routes);

  const navigate = useNavigate();

  const onClick = (e: any) => {
    let path = e.keyPath.reverse().join("/");
    navigate(path);
  };
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: "#00b96b",
          borderRadius: 2,

          colorBgContainer: "#FAFAF5",
        },
      }}
    >
      <div className="App">
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            {/* <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          > */}
            <div className="logo">
              <SmileTwoTone />
            </div>

            <Menu
              theme="light"
              onClick={onClick}
              mode="inline"
              defaultSelectedKeys={["/"]}
              items={routes.slice(0, -2)}
            />
          </Sider>
          <Layout>
            <Header
              style={{ padding: 0, background: colorBgContainer }}
            ></Header>

            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                {element}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              A Task Management APP Created by Yu Pei
            </Footer>
          </Layout>
        </Layout>
      </div>
    </ConfigProvider>
  );
};

export default App;

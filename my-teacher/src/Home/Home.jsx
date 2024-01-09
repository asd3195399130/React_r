import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  PoweroffOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme, Modal } from "antd";
import "./Home.css";
import { useNavigate } from "react-router-dom";
function Home(props) {
  const naviagte =  new useNavigate()
  const { Header, Sider, Content } = Layout;
 const { confirm } = Modal;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "仪表盘",
      to: "table",
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "讲师列表",
      to:"teacher"
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "nav 3",
    },
  ];
  // 退出登录
  const exit=()=>{
     confirm({
       title: "提示",
       icon: <ExclamationCircleFilled />,
       content: "你确定真的要退出吗?",
       okText: "确定",
       okType: "danger",
       cancelText: "取消",
       onOk() {
         console.log("OK");
         naviagte("/"); 
       },
       onCancel() {
         console.log("Cancel");
       },
     });

  }

  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical">
            <h1>后台管理列表</h1>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            {items.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.to}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Button type="text" icon={<PoweroffOutlined  />} onClick={exit}>
             退出登录
            </Button>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
            <div>
              <Outlet></Outlet>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
export default Home;

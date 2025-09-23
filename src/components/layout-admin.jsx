import {
  AliwangwangOutlined,
  ApiOutlined,
  AppstoreOutlined,
  BugOutlined,
  ExceptionOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ScheduleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import "../style/page-admin.css";
import { callGetCourseCategory } from "../service/service-api";
import { useAuth } from "./auth";
const LayoutAdmin = () => {
  const { user, handleLogout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [categories, setCategories] = useState();
  const location = useLocation();

  const handleOpenModal = async () => {
    const category = await callGetCourseCategory();

    setCategories(category.data.result);
  };
  const itemsDrop = [
    {
      key: "1",
      label: <Link to={"/"}>Trang chủ</Link>,
    },
    {
      key: "2",
      label: <Link to={"/"}>Quản lí tài khoản</Link>,
    },
    {
      key: "3",
      label: (
        <Link to={"/login"} style={{ color: "black" }} onClick={handleLogout}>
          Đăng xuất
        </Link>
      ),
    },
  ];
  const itemMenu = [
    {
      label: <Link to="/admin">Dashboard</Link>,
      key: "/admin",
      icon: <AppstoreOutlined />,
      role: ["ADMIN", "INSTRUCTOR"],
    },
    {
      label: <Link to="/admin/users">User</Link>,
      key: "/admin/users",
      icon: <UserOutlined />,
      role: ["ADMIN"],
    },
    {
      key: "/admin/courses",
      icon: <ScheduleOutlined />,
      label: <Link to="/admin/courses">Course</Link>,
      role: ["ADMIN", "INSTRUCTOR"],
    },
    {
      key: "/admin/assignments",
      icon: <AliwangwangOutlined />,
      label: <Link to="/admin/assignments">Assignment</Link>,
      role: ["ADMIN", "INSTRUCTOR"],
    },
    {
      key: "/admin/permissions",
      icon: <ApiOutlined />,
      label: <Link to="/admin/permissions">Permission</Link>,
      role: ["ADMIN"],
    },
    {
      key: "/admin/roles",
      icon: <ExceptionOutlined />,
      label: <Link to="/admin/roles">Role</Link>,
      role: ["ADMIN"],
    },
  ];
  return (
    <Layout>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div style={{ height: 32, margin: 16, textAlign: "center" }}>
          <BugOutlined /> ADMIN
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[location.pathname]}
          items={itemMenu.filter((item) =>
            item?.role?.some((role) => role === user?.role?.name)
          )}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#f5f5f5",
            display: "flex",
            justifyContent: "space-between",
            marginRight: 24,
          }}
        >
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
          <div>
            <Dropdown placement="topRight" arrow menu={{ items: itemsDrop }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <span style={{ color: "black" }}>Xin chào .{user?.name}</span>
                  <Avatar
                    style={{ backgroundColor: "#bfbfbf" }}
                    icon={<UserOutlined />}
                  />
                </Space>
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "0px 24px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet
            context={{
              handleOpenModal,
              categories,
            }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;

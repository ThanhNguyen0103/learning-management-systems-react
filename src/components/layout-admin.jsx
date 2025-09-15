import {
  AppstoreOutlined,
  BugOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Link, Outlet } from "react-router";
import "../style/page-admin.css";
import {
  callGetCourse,
  callGetCourseCategory,
  callGetUser,
} from "../service/service-api";
const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [instructors, setInstructors] = useState();
  const [categories, setCategories] = useState();
  const [courses, setCourses] = useState();
  const handleOpenModal = async () => {
    const intructors = await callGetUser();
    const category = await callGetCourseCategory();
    const course = await callGetCourse();
    setCategories(category.data.result);
    setInstructors(intructors.data.result);
    setCourses(course.data.result);
  };
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
          items={[
            {
              label: <Link to="/admin">Dashboard</Link>,
              key: "/admin",
              icon: <AppstoreOutlined />,
            },
            {
              label: <Link to="/admin/users">User</Link>,
              key: "/admin/users",
              icon: <UserOutlined />,
            },
            {
              key: "/admin/courses",
              icon: <UploadOutlined />,
              label: <Link to="/admin/courses">Course</Link>,
            },
            {
              key: "/admin/assignments",
              icon: <UploadOutlined />,
              label: <Link to="/admin/assignments">Assignment</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "#f5f5f5" }}>
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
              instructors,
              categories,
              courses,
            }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;

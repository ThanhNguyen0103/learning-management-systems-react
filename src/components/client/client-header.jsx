import {
  AntCloudOutlined,
  DownOutlined,
  TwitterOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Avatar, Button, ConfigProvider, Dropdown, Menu, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link, matchPath, useLocation, useNavigate } from "react-router";
import reactLogo from "../../assets/react.svg";
import { useAuth } from "../auth";
const HeaderClient = () => {
  const { user } = useAuth();
  const location = useLocation();
  const items = [
    {
      label: "Trang Chủ",
      key: "/",
      icon: <TwitterOutlined />,
      className: "customclass",
    },
    {
      label: "Khóa Học",
      key: "courses",
      icon: <AntCloudOutlined />,
      className: "customclass",
    },
    {
      label: "Liên hệ",
      key: "contact",
      icon: <WhatsAppOutlined />,
      className: "customclass",
    },
  ];
  let selectedKey = items[0].key;

  for (let item of items) {
    if (matchPath({ path: item.key + "/*" }, location.pathname)) {
      selectedKey = item.key;
      break;
    }
  }
  const itemsDrop = [
    {
      key: "1",
      label: <a>Quản lí tài khoản</a>,
    },
    {
      key: "2",
      label: <a>Khóa học của tôi</a>,
    },
  ];
  return (
    <>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>
          <Link to={"/"} style={{ display: "flex", alignItems: "center" }}>
            <img
              src={reactLogo}
              alt="logo"
              style={{
                marginRight: 24,
                animation: "logo-spin 20s linear infinite",
              }}
            />
          </Link>
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#fff",
              colorBgContainer: "#222831",
              colorText: "#a7a7a7",
            },
          }}
        >
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedKey}
            items={items}
            style={{ flex: 1, minWidth: 0, height: 50, marginBottom: 18 }}
          />
          {user ? (
            <div>
              <Dropdown placement="topRight" arrow menu={{ items: itemsDrop }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <span style={{ color: "#ffff" }}>
                      Xin chào .{user.name}
                    </span>
                    <Avatar
                      style={{ backgroundColor: "#bfbfbf" }}
                      icon={<UserOutlined />}
                    />
                  </Space>
                </a>
              </Dropdown>
            </div>
          ) : (
            <Link to={"/login"}>
              <Button
                style={{
                  border: "none",
                  backgroundColor: "#001529",
                  color: "white",
                  fontFamily: '"Poppins", Sans-serif',
                  fontSize: 15,
                }}
              >
                Đăng nhập
              </Button>
            </Link>
          )}
        </ConfigProvider>
      </Header>
    </>
  );
};
export default HeaderClient;

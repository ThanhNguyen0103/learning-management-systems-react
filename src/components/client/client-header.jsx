import {
  AntCloudOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { ConfigProvider, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link, matchPath, useLocation, useNavigate } from "react-router";
import reactLogo from "../../assets/react.svg";
const HeaderClient = () => {
  const navigate = useNavigate();
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
      key: "cars",
      icon: <AntCloudOutlined />,
      className: "customclass",
    },
    {
      label: "Liên hệ",
      key: "ca",
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
            defaultSelectedKeys={["/"]}
            items={items}
            style={{ flex: 1, minWidth: 0, height: 50, marginBottom: 18 }}
          />
        </ConfigProvider>
      </Header>
    </>
  );
};
export default HeaderClient;

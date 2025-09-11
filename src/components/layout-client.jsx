import { Breadcrumb, Carousel, Layout, Menu, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import HeaderClient from "./client/client-header";
import img from "../assets/landing-page.png";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
const LayoutClient = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ backgroundColor: "#ffff" }}>
      <HeaderClient />
      <Content style={{ padding: "0 48px", marginTop: 20 }}>
        <Carousel arrows>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "40px 80px",
                background: "black",
                height: "360px",
              }}
            >
              <div style={{ flex: 6, color: "#000", paddingRight: "40px" }}>
                <h2
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    marginBottom: "16px",
                  }}
                >
                  Join the group to update information about free and quality
                  courses
                </h2>
                <p style={{ fontSize: "16px", marginBottom: "24px" }}>
                  (Join group Facebook để nhận thông tin và order các khóa học
                  nhé)
                </p>
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#d70018",
                    border: "none",
                    borderRadius: "4px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Tham gia ngay
                </button>
              </div>
              <div style={{ flex: 4, textAlign: "center" }}>
                <img
                  src={img}
                  alt="banner"
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </div>
        </Carousel>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default LayoutClient;

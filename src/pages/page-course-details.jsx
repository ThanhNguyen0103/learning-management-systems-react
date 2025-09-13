import {
  CheckOutlined,
  FileTextOutlined,
  HomeOutlined,
  LaptopOutlined,
  LinkOutlined,
  MobileOutlined,
  PlaySquareOutlined,
  RightOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Layout,
  List,
  Row,
  Space,
  theme,
} from "antd";
import Meta from "antd/es/card/Meta";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import img12 from "../assets/db2.jpg";
const CourseDetailsPage = () => {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const items = [
    {
      key: "1",
      label: "This is panel header 1",
      children: <p>{text}</p>,
    },
    {
      key: "2",
      label: "This is panel header 2",
      children: <p>{text}</p>,
    },
    {
      key: "3",
      label: "This is panel header 3",
      children: <p>{text}</p>,
    },
  ];
  const data = [
    "Xây dựng niềm đam mê với ngôn ngữ lập trình Java",
    "Học Java Spring không khó đến vậy",
    "Debug Ứng Dụng Java Spring Siêu Dễ, đặc biệt là Spring Security",
    "Tích hợp thanh toán với ví VNPAY",
    "Nắm vững kiến thức của Spring và mô hình MVC",
    "Thực hành Spring MVC để tạo một website hoàn chỉnh",
    "Học và hiểu rõ cơ chế Spring Security và Spring Session",
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <section className="section-banner-heading">
        <div style={{ margin: "0px 100px" }}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={14}>
              <Breadcrumb
                separator={
                  <RightOutlined style={{ fontSize: 12, fontWeight: 700 }} />
                }
                style={{
                  margin: "16px 0",
                  fontSize: 14,
                  fontFamily: '"Poppins", Sans-serif',
                }}
                items={[
                  {
                    title: (
                      <>
                        <>
                          <HomeOutlined />
                          <span>Trang chủ</span>
                        </>
                      </>
                    ),
                  },
                  { title: <span>Khóa học</span> },
                ]}
              />
              <h1>
                Java Spring MVC - Xây Dựng FullStack Website với Spring Boot
              </h1>
              <h2>Học Spring MVC Chưa Từng Dễ Tới Vậy</h2>
              <p> ( 259 đánh giá ) 1089 học viên</p>
              <p>Ngôn ngữ: Tiếng Việt</p>
              <div>
                <span>Tags: BACKEND</span>
                <span>Tác giả : Thanh Nguyen</span>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <Layout
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <Content>
          <section>
            <div
              style={{
                margin: "48px 100px",
                border: "1px solid #d1d7dc",
                padding: 24,
              }}
            >
              <h2>Những gì bạn sẽ học</h2>
              <List
                size="small"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      border: "none",
                      fontSize: 16,
                      paddingRight: 0,
                      paddingLeft: 0,
                    }}
                  >
                    <Space>
                      <CheckOutlined />
                      {item}
                    </Space>
                  </List.Item>
                )}
                style={{ columns: 2 }}
              />
            </div>

            <div
              style={{
                margin: "48px 100px",
              }}
            >
              <h2>Nội dung khóa học</h2>
              <Collapse items={items} defaultActiveKey={["1"]} />
            </div>
            <Divider />
            <div
              style={{
                margin: "0 100px",
              }}
            >
              <h2>Mô tả</h2>
              <div>
                <p style={{ fontSize: 16, lineHeight: 2 }}>
                  Spring Framework là công cụ rất nổi tiếng trong cộng đồng
                  Java, và một trong các tác dụng cùa nó là xây dựng một website
                  hoàn chỉnh và chuyên nghiệp. Bằng cách áp dụng mô hình MVC
                  (Model-View-Controller) và kiến trúc của Spring giúp chúng ta
                  tiết kiệm thời gian xây dựng một website.
                </p>
              </div>
              <div style={{ fontSize: 15 }}>
                <div>Các kiến được đề cập trong khóa học này:</div>

                <div style={{ lineHeight: 2.5 }}>
                  <span> 1. Công nghệ sử dụng Backend (Java) :</span>
                  <br />
                  <span>
                    <b> Spring Boot: </b> cấu hình và chạy dự án Spring một cách
                    nhanh chóng Spring JPA: viết query database theo ORM (object
                    relational mapping) Cách viết code theo mô hình : Controller
                    - Service - Repository
                  </span>
                  <br />
                  <span>
                    <b>Spring JPA:</b> viết query database theo ORM (object
                    relational mapping) Cách viết code theo mô hình : Controller
                    - Service - Repository Cách viết code theo mô hình Domain
                    Driven Design : Định nghĩa domain (model) Cách validate dữ
                    liệu với package hỗ trợ sẵn của java Cách tư duy và thiết kế
                    database, đồng thời ràng buộc mối quan hệ giữa các model
                    (OneToOne, OneToMany, ManytoMany)
                  </span>
                  <br />
                  <span>
                    <b>Spring MVC:</b> viết code theo mô hình MVC với view là
                    JSP, sử dụng JSTL (Jakarta Standard Tag Library)
                  </span>
                  <br />
                  <span>
                    <b>Spring Security:</b> Authentication (người dùng đã đăng
                    nhập hay chưa ?) và authorization (người dùng có quyền làm
                    gì) cho Spring
                  </span>
                </div>
              </div>
            </div>
          </section>
        </Content>
        <div className="slider-banner-cart">
          <Sider
            style={{
              background: "#fff",
              position: "sticky",
              top: 24,
              alignSelf: "start",
            }}
            width={360}
          >
            <Card
              cover={
                <div style={{ position: "relative" }}>
                  <img
                    alt="example"
                    src={img12}
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      display: "block",
                      // borderRadius: "8px 8px 0 0",
                    }}
                  />
                </div>
              }
              style={{
                minHeight: 320,
                boxShadow: "0 4px 15px 4px rgba(39,57,101,.1)",
              }}
            >
              <Meta
                className="slider"
                title={
                  <div className="card-meta-title">
                    <span
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#cb1c22",
                      }}
                    >
                      949.000 ₫
                    </span>
                    <br />
                    <span
                      style={{
                        color: "#99a2aa",
                      }}
                    >
                      1.499.000 ₫ -37%
                    </span>
                  </div>
                }
                description={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Button size="large">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          lineHeight: 1,
                        }}
                      >
                        <ShoppingCartOutlined
                          style={{ fontSize: 18, color: "#4096ff" }}
                        />
                        Mua ngày
                      </div>
                    </Button>
                    <span>
                      Cam kết mua khóa học 1 lần - thời gian học mãi mãi!
                    </span>

                    <div>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>
                        Khóa học bao gồm:
                      </span>
                      <span>
                        <Space>
                          <PlaySquareOutlined />
                          30 giờ video theo yêu cầu
                        </Space>
                      </span>
                      <span>
                        <Space>
                          <LaptopOutlined />
                          190 videos hướng dẫn
                        </Space>
                      </span>
                      <span>
                        <Space>
                          <FileTextOutlined />
                          01 tài liệu hướng dẫn theo từng video
                        </Space>
                      </span>
                      <span>
                        <Space>
                          <LinkOutlined />
                          Thời gian xem khóa học suốt đời
                        </Space>
                      </span>
                      <span>
                        <Space>
                          <MobileOutlined />
                          Truy cập trên thiết bị di động và TV
                        </Space>
                      </span>
                    </div>
                  </div>
                }
              />
            </Card>
          </Sider>
        </div>
      </Layout>
    </>
  );
};
export default CourseDetailsPage;

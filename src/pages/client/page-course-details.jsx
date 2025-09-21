import {
  CheckCircleOutlined,
  CheckOutlined,
  FileTextOutlined,
  HomeOutlined,
  LaptopOutlined,
  LinkOutlined,
  MobileOutlined,
  PlaySquareOutlined,
  RightOutlined,
  ShoppingCartOutlined,
  StarFilled,
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
  Modal,
  Row,
  Space,
  theme,
} from "antd";
import Meta from "antd/es/card/Meta";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import { useEffect, useState } from "react";
import { callGetCourseById } from "../../service/service-api";
import { useParams } from "react-router";
const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleGetCourseById();
  }, []);
  const handleGetCourseById = async () => {
    const res = await callGetCourseById(id);
    if (res.data) {
      setCourse(res.data);
    }
  };

  const text = `Hướng dẫn sử dụng khóa học hiệu quả 
#1. Hướng Dẫn Sử Dụng Khóa Học Hiệu Quả
#2. Hướng Dẫn Quyền Truy Cập Tài Liệu Khóa Học
#3. Hướng Dẫn Quyền Truy Cập Source Code
#4. Hướng Dẫn Tải Source Code Theo Từng Video
#5.1. Demo kết quả đạt được
#5.2 Yêu cầu để học được khóa học này
#5.3 Cách Dùng Udemy - Hỗ Trợ Hỏi Đáp Q&A
#5.4 Về Tác giả
`;
  const items = [
    {
      key: "1",
      label: "Chapter 1 : Bắt buộc xem",
      children: (
        <p style={{ whiteSpace: "pre-line" }}>
          {text
            .trim()
            .split("\n")
            .map((line, idx) => (
              <p
                key={idx}
                style={{ display: "flex", alignItems: "center", margin: 0 }}
              >
                {idx !== 0 && ( // chỉ từ dòng thứ 2 trở đi mới có icon
                  <PlaySquareOutlined
                    style={{ color: "green", marginRight: 8 }}
                  />
                )}
                {line}
              </p>
            ))}
        </p>
      ),
    },
    {
      key: "2",
      label: "Chapter 2 : Setup Environment",
      children: <p>// todo</p>,
    },
    {
      key: "3",
      label: "Chapter 3  : Hello World",
      children: <p>//to do</p>,
    },
    {
      key: "4",
      label: "Chapter 4 : Systax Basic",
      children: <p>//to do</p>,
    },
    {
      key: "5",
      label: "Chapter 5 : Summary",
      children: <p>//to do</p>,
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
              <h1>{course?.name}</h1>

              <div style={{ display: "flex" }}>
                <div style={{ color: "gold", fontSize: 18, marginRight: 4 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarFilled key={i} />
                  ))}
                </div>
                <p> ( 259 đánh giá ) 1089 học viên</p>
              </div>
              <p>Ngôn ngữ : Tiếng Việt</p>
              <div>
                <span
                  style={{
                    backgroundColor: "#daebfc",
                    padding: "4px 8px",
                    borderRadius: 8,
                    color: "#0059B2",
                    marginRight: 8,
                  }}
                >
                  Tags: {course?.categories?.map((item) => item.name).join(",")}
                </span>

                <span
                  style={{
                    backgroundColor: "#daebfc",
                    padding: "4px 8px",
                    borderRadius: 8,
                    color: "#0059B2",
                  }}
                >
                  Tác giả : {course?.instructor?.name}
                </span>
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
              <div style={{ fontSize: 16, lineHeight: 2 }}>
                {course?.description}
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
                    src={`http://localhost:8080/storage/thumnail/${course?.thumnail}`}
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
                      {(course?.price * 0.63).toLocaleString("vi-VN")} ₫
                    </span>
                    <br />
                    <span
                      style={{
                        color: "#99a2aa",
                      }}
                    >
                      {course?.price?.toLocaleString("vi-VN")} ₫ -37%
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
                    <Button
                      size="large"
                      className="btn-buy-course"
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
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
                    <Modal
                      title="Basic Modal"
                      closable={true}
                      open={open}
                      onCancel={() => {
                        setOpen(false);
                      }}
                    >
                      <p>///todo</p>
                    </Modal>
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

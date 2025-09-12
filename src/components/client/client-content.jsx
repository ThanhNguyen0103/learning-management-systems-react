import { Avatar, Card, Carousel, Col, Divider, Row, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import img1 from "../../assets/landing-page.png";
import img2 from "../../assets/web-hosting.png";
import img3 from "../../assets/back-end.png";
import img4 from "../../assets/business-analyst.png";
import img5 from "../../assets/database.png";
import img6 from "../../assets/devops.png";
import img7 from "../../assets/excel.png";
import img8 from "../../assets/java-2.png";
import img9 from "../../assets/web-design.png";
import img10 from "../../assets/db1.jpg";
import img11 from "../../assets/db2.jpg";
import img12 from "../../assets/db3.jpg";
import img13 from "../../assets/db4.jpg";
import img14 from "../../assets/db5.jpg";
import img15 from "../../assets/db6.jpg";
import img16 from "../../assets/db7.jpg";
import img17 from "../../assets/db8.jpg";
import Meta from "antd/es/card/Meta";
import { FlagOutlined } from "@ant-design/icons";
const ContentClient = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Content style={{ padding: "0 48px", backgroundColor: "#fff" }}>
      <Carousel arrows>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "40px 80px",
              background: "#fff",
              height: "360px",
            }}
          >
            <div style={{ flex: 6, color: "#000", paddingRight: "40px" }}>
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  marginBottom: "16px",
                  fontFamily: '"Poppins", Sans-serif',
                }}
              >
                Join the group to update information about free and quality
                courses
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  marginBottom: "24px",
                  fontFamily: '"Poppins", Sans-serif',
                }}
              >
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
                src={img1}
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

      <Divider />
      <section>
        <div
          className="section-heading"
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <h1>Category</h1>
          <p>
            The website is designed according to each very standard roadmap.
          </p>
          <p>Following this roadmap, you will have a correct learning path</p>
        </div>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ justifyContent: "center", marginBottom: 24 }}
        >
          <Col className="gutter-row" span={5}>
            <Card style={{ padding: "0px 0px", backgroundColor: "#f5f3fe" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <img src={img2} alt="" style={{ width: "40%" }} />
                <h3>Fundamental</h3>
              </div>
            </Card>
          </Col>
          <Col className="gutter-row" span={5}>
            <Card style={{ padding: "0px 0px", backgroundColor: "#f5f3fe" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <img src={img3} alt="" style={{ width: "40%" }} />
                <h3>Back-end</h3>
              </div>
            </Card>
          </Col>
          <Col className="gutter-row" span={5}>
            <Card style={{ padding: "0px 0px", backgroundColor: "#f5f3fe" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <img src={img4} alt="" style={{ width: "40%" }} />
                <h3>Data Analyst</h3>
              </div>
            </Card>
          </Col>
          <Col className="gutter-row" span={5}>
            <Card style={{ padding: "0px 0px", backgroundColor: "#f5f3fe" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <img src={img5} alt="" style={{ width: "40%" }} />
                <h3>Database</h3>
              </div>
            </Card>
          </Col>
        </Row>

        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ justifyContent: "center", marginBottom: 24 }}
        >
          <Col className="gutter-row" span={5}>
            <Card style={{ padding: "0px 0px", backgroundColor: "#f5f3fe" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <img src={img6} alt="" style={{ width: "40%" }} />
                <h3>DevOps</h3>
              </div>
            </Card>
          </Col>
          <Col className="gutter-row" span={5}>
            <Card style={{ padding: "0px 0px", backgroundColor: "#f5f3fe" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <img src={img9} alt="" style={{ width: "40%" }} />
                <h3>Front-end</h3>
              </div>
            </Card>
          </Col>
          <Col className="gutter-row" span={5}>
            <Card style={{ padding: "0px 0px", backgroundColor: "#f5f3fe" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <img
                  src={img7}
                  alt=""
                  style={{ width: "40%", marginRight: 4 }}
                />
                <h3>Excel & PowerPoint</h3>
              </div>
            </Card>
          </Col>
          <Col className="gutter-row" span={5}>
            <Card style={{ padding: "0px 0px", backgroundColor: "#f5f3fe" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <img
                  src={img8}
                  alt=""
                  style={{ width: "40%", marginRight: 6 }}
                />
                <h3>ENGLISH COURSE</h3>
              </div>
            </Card>
          </Col>
        </Row>
      </section>
      <Divider />
      <section>
        <div
          className="section-heading"
          style={{ textAlign: "center", marginBottom: 60, marginTop: 60 }}
        >
          <h1>Featured Courses</h1>
          <p>If you need any courses, please comment below the article..</p>
          <p>
            The team will evaluate, if suitable, we will publish those courses
            for you
          </p>
        </div>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ justifyContent: "center", marginBottom: 24 }}
        >
          <Col className="gutter-row" span={5} style={{ marginBottom: 28 }}>
            <Card
              cover={
                <div style={{ position: "relative" }}>
                  <img
                    alt="example"
                    src={img10}
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      display: "block",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                  <div className="circle-icon">
                    <FlagOutlined style={{ fontSize: 16, color: "#fff" }} />
                  </div>
                </div>
              }
              style={{
                minHeight: 320,
                boxShadow: "0 4px 15px 4px rgba(39,57,101,.1)",
              }}
            >
              <Meta
                title={
                  <div className="card-meta-title">
                    SQL Database Administration: Advanced MySQL
                  </div>
                }
                description={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                      style={{ marginRight: 8 }}
                    />
                    <span>In Back-end, Data Structure And Algorithm</span>
                  </div>
                }
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={5} style={{ marginBottom: 28 }}>
            <Card
              cover={
                <div style={{ position: "relative" }}>
                  <img
                    alt="example"
                    src={img11}
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      display: "block",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                  <div className="circle-icon">
                    <FlagOutlined style={{ fontSize: 16, color: "#fff" }} />
                  </div>
                </div>
              }
              style={{
                minHeight: 320,
                boxShadow: "0 4px 15px 4px rgba(39,57,101,.1)",
              }}
            >
              <Meta
                title={
                  <div className="card-meta-title">
                    Building Microservices with Spring Boot & Spring Cloud
                  </div>
                }
                description={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                      style={{ marginRight: 8 }}
                    />
                    <span>In Back-end, Data Structure And Algorithm</span>
                  </div>
                }
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={5} style={{ marginBottom: 28 }}>
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
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                  <div className="circle-icon">
                    <FlagOutlined style={{ fontSize: 16, color: "#fff" }} />
                  </div>
                </div>
              }
              style={{
                minHeight: 320,
                boxShadow: "0 4px 15px 4px rgba(39,57,101,.1)",
              }}
            >
              <Meta
                title={
                  <div className="card-meta-title">
                    Spring Security 6 Zero to Master along with JWT,OAUTH2
                  </div>
                }
                description={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                      style={{ marginRight: 8 }}
                    />
                    <span>In Back-end, Data Structure And Algorithm</span>
                  </div>
                }
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={5} style={{ marginBottom: 28 }}>
            <Card
              cover={
                <div style={{ position: "relative" }}>
                  <img
                    alt="example"
                    src={img13}
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      display: "block",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                  <div className="circle-icon">
                    <FlagOutlined style={{ fontSize: 16, color: "#fff" }} />
                  </div>
                </div>
              }
              style={{
                minHeight: 320, // hoặc số bạn muốn
                boxShadow: "0 4px 15px 4px rgba(39,57,101,.1)",
              }}
            >
              <Meta
                title={
                  <div className="card-meta-title">
                    Development Software Engineering Microservices Apache
                  </div>
                }
                description={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                      style={{ marginRight: 8 }}
                    />
                    <span>In Back-end, Data Structure And Algorithm</span>
                  </div>
                }
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={5} style={{ marginBottom: 28 }}>
            <Card
              cover={
                <div style={{ position: "relative" }}>
                  <img
                    alt="example"
                    src={img14}
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      display: "block",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                  <div className="circle-icon">
                    <FlagOutlined style={{ fontSize: 16, color: "#fff" }} />
                  </div>
                </div>
              }
              style={{
                minHeight: 320, // hoặc số bạn muốn
                boxShadow: "0 4px 15px 4px rgba(39,57,101,.1)",
              }}
            >
              <Meta
                title={
                  <div className="card-meta-title">
                    Master the Coding Interview: Data Structures + Algorithms
                  </div>
                }
                description={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                      style={{ marginRight: 8 }}
                    />
                    <span>In Back-end, Data Structure And Algorithm</span>
                  </div>
                }
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={5} style={{ marginBottom: 28 }}>
            <Card
              cover={
                <div style={{ position: "relative" }}>
                  <img
                    alt="example"
                    src={img15}
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      display: "block",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                  <div className="circle-icon">
                    <FlagOutlined style={{ fontSize: 16, color: "#fff" }} />
                  </div>
                </div>
              }
              style={{
                minHeight: 320, // hoặc số bạn muốn
                boxShadow: "0 4px 15px 4px rgba(39,57,101,.1)",
              }}
            >
              <Meta
                title={
                  <div className="card-meta-title">
                    Docker, From Zero To Hero: Become a DevOps Docker Master
                  </div>
                }
                description={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                      style={{ marginRight: 8 }}
                    />
                    <span>In Back-end, Data Structure And Algorithm</span>
                  </div>
                }
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={5} style={{ marginBottom: 28 }}>
            <Card
              cover={
                <div style={{ position: "relative" }}>
                  <img
                    alt="example"
                    src={img16}
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      display: "block",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                  <div className="circle-icon">
                    <FlagOutlined style={{ fontSize: 16, color: "#fff" }} />
                  </div>
                </div>
              }
              style={{
                minHeight: 320, // hoặc số bạn muốn
                boxShadow: "0 4px 15px 4px rgba(39,57,101,.1)",
              }}
            >
              <Meta
                title={
                  <div className="card-meta-title">
                    Docker & Kubernetes: The Practical Guide
                  </div>
                }
                description={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                      style={{ marginRight: 8 }}
                    />
                    <span>In Back-end, Data Structure And Algorithm</span>
                  </div>
                }
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={5} style={{ marginBottom: 28 }}>
            <Card
              cover={
                <div style={{ position: "relative" }}>
                  <img
                    alt="example"
                    src={img17}
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      display: "block",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                  <div className="circle-icon">
                    <FlagOutlined style={{ fontSize: 16, color: "#fff" }} />
                  </div>
                </div>
              }
              style={{
                minHeight: 320, // hoặc số bạn muốn
                boxShadow: "0 4px 15px 4px rgba(39,57,101,.1)",
              }}
            >
              <Meta
                title={
                  <div className="card-meta-title">
                    SQL for Beginners: Learn SQL using MySQL and Database Design
                  </div>
                }
                description={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                      style={{ marginRight: 8 }}
                    />
                    <span>In Back-end, Data Structure And Algorithm</span>
                  </div>
                }
              />
            </Card>
          </Col>
        </Row>
      </section>
    </Content>
  );
};
export default ContentClient;

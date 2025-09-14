import { FlagOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Layout,
  Row,
  theme,
} from "antd";
import Meta from "antd/es/card/Meta";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import img10 from "../../assets/db1.jpg";
import img11 from "../../assets/db2.jpg";
import img12 from "../../assets/db3.jpg";
import img13 from "../../assets/db4.jpg";
import img14 from "../../assets/db5.jpg";
import img17 from "../../assets/db8.jpg";

const CoursesPage = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Filter values:", values);
    // Gọi API hoặc set state filter
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div style={{ padding: "0 48px" }}>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
      />
      <Layout
        style={{
          padding: "24px 0",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Sider width={250} style={{ background: "#fff" }}>
          <Form
            className="filter-form"
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <div style={{ marginBottom: 24 }}>
              <Input
                placeholder="Search ..."
                suffix={<SearchOutlined style={{ color: "#999" }} />}
                onPressEnter
                allowClear
                style={{
                  marginTop: 8,
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 15,
                }}
              />
            </div>
            <Form.Item name="categories" label="Category">
              <Checkbox.Group
                options={[
                  { label: "Back-end", value: "backend" },
                  { label: "Front-end", value: "frontend" },
                  {
                    label: "Database (SQL, NoSQL)",
                    value: "Database (SQL, NoSQL)",
                  },
                  { label: "Fundamental", value: "Fundamental" },
                  {
                    label: "Data Structure And Algorithm",
                    value: "Data Structure And Algorithm",
                  },
                  {
                    label: "C& C++, GIT , Data Structure And Algorithm",
                    value: "C& C++, GIT , Data Structure And Algorithm",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item name="tags" label="Tag" style={{ marginTop: 20 }}>
              <Checkbox.Group
                options={[
                  { label: "React", value: "react" },
                  { label: "NodeJS", value: "nodejs" },
                  { label: "Python", value: "python" },
                ]}
              />
            </Form.Item>

            <Form.Item style={{ marginTop: 20 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: 8 }}
              >
                Lọc
              </Button>
              <Button htmlType="button">Clear All Filters</Button>
            </Form.Item>
          </Form>
        </Sider>
        <Content style={{ padding: "0 32px", minHeight: 280 }}>
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            style={{ justifyContent: "center", marginBottom: 24 }}
          >
            <Col className="gutter-row" span={8} style={{ marginBottom: 28 }}>
              <Card
                actions={[<Button>Enroll Course</Button>]}
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
                      SQL Database Administration: Advanced MySQL SQL Database
                      Administration: Advanced MySQL
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
            <Col className="gutter-row" span={8} style={{ marginBottom: 28 }}>
              <Card
                actions={[<Button>Enroll Course</Button>]}
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
                  minHeight: 320,
                  boxShadow: "0 4px 15px 4px rgba(39,57,101,.1)",
                }}
              >
                <Meta
                  title={
                    <div className="card-meta-title">
                      SQL Database Administration: Advanced MySQL SQL Database
                      Administration: Advanced MySQL
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
            <Col className="gutter-row" span={8} style={{ marginBottom: 28 }}>
              <Card
                actions={[<Button>Enroll Course</Button>]}
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
                      SQL Database Administration: Advanced MySQL SQL Database
                      Administration: Advanced MySQL
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
            <Col className="gutter-row" span={8} style={{ marginBottom: 28 }}>
              <Card
                actions={[<Button>Enroll Course</Button>]}
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
                      SQL Database Administration: Advanced MySQL SQL Database
                      Administration: Advanced MySQL
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
            <Col className="gutter-row" span={8} style={{ marginBottom: 28 }}>
              <Card
                actions={[<Button>Enroll Course</Button>]}
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
                  minHeight: 320,
                  boxShadow: "0 4px 15px 4px rgba(39,57,101,.1)",
                }}
              >
                <Meta
                  title={
                    <div className="card-meta-title">
                      SQL Database Administration: Advanced MySQL SQL Database
                      Administration: Advanced MySQL
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
            <Col className="gutter-row" span={8} style={{ marginBottom: 28 }}>
              <Card
                actions={[<Button>Enroll Course</Button>]}
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
                  minHeight: 320,
                  boxShadow: "0 4px 15px 4px rgba(39,57,101,.1)",
                }}
              >
                <Meta
                  title={
                    <div className="card-meta-title">
                      SQL Database Administration: Advanced MySQL SQL Database
                      Administration: Advanced MySQL
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
        </Content>
      </Layout>
    </div>
  );
};
export default CoursesPage;

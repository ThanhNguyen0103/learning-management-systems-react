import { FlagOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Layout,
  List,
  message,
  notification,
  Row,
  theme,
} from "antd";
import Meta from "antd/es/card/Meta";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import {
  callCreateEnroll,
  callGetCourse,
  callGetEnrollByUser,
} from "../../service/service-api";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/auth";

const CoursesPage = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState();
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 1,
    total: 0,
  });
  const [filters, setFilters] = useState({
    categories: [],
    tag: [],
    keyword: "",
  });
  useEffect(() => {
    fetchAllCourse();
    fetchEnroll();
  }, []);
  const fetchEnroll = async () => {
    const res = await callGetEnrollByUser(user?.id);
    setEnrolledIds(res?.data?.map((item) => item.id));
  };

  const fetchCreateEnroll = async (userId, courseId) => {
    try {
      const res = await callCreateEnroll({ userId, courseId });
      if (res) {
        message.success("Đăng ký khóa học thành công");
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res?.message || "Vui lòng thử lại",
        });
      }
    } catch (error) {
      message.error(error.message || "Có lỗi xảy ra");
    }
  };

  const fetchAllCourse = async (page, size, filters) => {
    const query = {
      categories: filters?.categories?.map((item) => item).join(","),
      tag: filters?.tag?.map((item) => item).join(","),
      keyword: filters?.keyword,
      page,
      size,
    };
    setLoading(true);
    try {
      const res = await callGetCourse(query);
      if (res.data) {
        setCourses(res.data.result);
        setPagination({
          current: res.data.meta.currentPage,
          pageSize: res.data.meta.pageSize,
          total: res.data.meta.total,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleResetFilters = () => {
    form.resetFields();
    setFilters({
      categories: [],
      tag: [],
      keyword: "",
    });
  };

  const handleFilterChange = (change) => {
    setFilters((prev) => ({ ...prev, ...change }));
  };
  const onFinish = async () => {
    const query = {
      categories: filters?.categories?.map((item) => item).join(","),
      tag: filters?.tag?.map((item) => item).join(","),
      keyword: filters?.keyword,
      page: 1,
      size: pagination.pageSize,
    };

    const res = await callGetCourse(query);
    if (res.data) {
      setCourses(res.data.result);
      setPagination({
        current: res.data.meta.currentPage,
        pageSize: res.data.meta.pageSize,
        total: res.data.meta.total,
      });
    }
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div style={{ padding: "0 56px" }}>
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
                suffix={
                  <SearchOutlined
                    style={{ color: "#999" }}
                    onClick={(e) => {
                      onFinish();
                    }}
                  />
                }
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, keyword: e.target.value }))
                }
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
                onChange={(value) => {
                  handleFilterChange({ categories: value });
                }}
                options={[
                  { label: "Back-end", value: "Back-end" },
                  { label: "Front-end", value: "fron-tend" },
                  {
                    label: "Database (SQL, NoSQL)",
                    value: "Database",
                  },
                  { label: "Fundamental", value: "Fundamental" },
                  {
                    label: "Data Structure And Algorithm",
                    value: "DataStructureAndAlgorithm",
                  },
                  {
                    label: "C& C++, GIT , Data Structure And Algorithm",
                    value: "C&C++GITDataStructurAndAlgorithm",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item name="tags" label="Tag" style={{ marginTop: 20 }}>
              <Checkbox.Group
                onChange={(value) => {
                  handleFilterChange({ tag: value });
                }}
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
              <Button onClick={handleResetFilters}>Clear All Filters</Button>
            </Form.Item>
          </Form>
        </Sider>
        <Content style={{ padding: "0 32px", minHeight: 280 }}>
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            style={{ justifyContent: "center", marginBottom: 24 }}
          >
            <List
              loading={loading}
              grid={{
                gutter: 24,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 3,
              }}
              itemLayout="vertical"
              size="large"
              pagination={{
                current: pagination.current,
                pageSize: 6,
                total: pagination.total,
                onChange: (page, size) => fetchAllCourse(page, size, filters),
                style: { justifyContent: "center" },
              }}
              dataSource={courses}
              renderItem={(item) => (
                <List.Item key={item.id} style={{ padding: 0 }}>
                  <Card
                    actions={[
                      enrolledIds.includes(item.id) ? (
                        <Button>Start Learning</Button>
                      ) : (
                        <Button
                          onClick={() => {
                            fetchCreateEnroll(user?.id, item.id);
                          }}
                        >
                          Enroll Course
                        </Button>
                      ),
                    ]}
                    cover={
                      <div style={{ position: "relative" }}>
                        <img
                          alt="example"
                          src={`http://localhost:8080/storage/thumnail/${item?.thumnail}`}
                          style={{
                            width: "100%",
                            height: 160,
                            objectFit: "cover",
                            display: "block",
                            borderRadius: "8px 8px 0 0",
                          }}
                        />
                        <div className="circle-icon">
                          <FlagOutlined
                            style={{ fontSize: 16, color: "#fff" }}
                          />
                        </div>
                      </div>
                    }
                    style={{
                      minHeight: 320,
                      boxShadow: "0 4px 15px 4px rgba(39,57,101,.1)",
                    }}
                  >
                    <Meta
                      title={<div className="card-meta-title">{item.name}</div>}
                      description={
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                            style={{ marginRight: 8 }}
                          />
                          <span>
                            In{" "}
                            {item?.categories
                              ?.map((name) => name.name)
                              .join(" , ")}
                          </span>
                        </div>
                      }
                    />
                  </Card>
                </List.Item>
              )}
            />
          </Row>
        </Content>
      </Layout>
    </div>
  );
};
export default CoursesPage;

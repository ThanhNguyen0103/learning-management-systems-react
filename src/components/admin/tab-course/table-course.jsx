import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ProTable from "@ant-design/pro-table";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Popconfirm,
  Row,
  Select,
  Space,
  Switch,
  Tag,
  Upload,
} from "antd";
import { useRef, useState } from "react";
import {
  callCreateCourse,
  callDeleteCourse,
  callGetCourse,
  callGetCourseByUser,
  callUpdateCourse,
  callUploadFile,
} from "../../../service/service-api";
import { Link, useOutletContext } from "react-router";
import dayjs from "dayjs";
import { useAuth } from "../../auth";

const CourseTable = ({ onChangeSelectedId }) => {
  const { user, permissions } = useAuth();
  const { handleOpenModal, instructors, categories } = useOutletContext();
  const actionRef = useRef();
  const [form] = Form.useForm();
  const [typeSubmit, setTypeSubmit] = useState("");
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
      hideInSearch: true,
    },
    {
      title: "Tên khóa học",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (_, record) => (
        <Link
          to={"#"}
          onClick={() => {
            onChangeSelectedId(record);
          }}
        >
          {record.name}
        </Link>
      ),
    },
    {
      title: "Tác giả",
      dataIndex: "instructor",
      key: "instructor",
      render: (_, record) => <span>{record.instructor.name}</span>,
    },

    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      sorter: true,
      align: "center",
      render: (value) =>
        value != null
          ? value.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })
          : "",
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (_, record) => (
        <Tag color={record.active ? "green" : "red"}>
          {record.active ? "Active" : "Inactive"}
        </Tag>
      ),
    },

    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      hideInSearch: true,
      sorter: true,
      render: (date) =>
        dayjs(date).isValid() ? dayjs(date).format("DD/MM/YYYY HH:mm") : "",
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      key: "updatedAt",
      hideInSearch: true,
      sorter: true,
      render: (date) =>
        dayjs(date).isValid() ? dayjs(date).format("DD/MM/YYYY HH:mm") : "",
    },
    {
      title: "Action",
      key: "action",
      width: 50,
      hideInSearch: true,
      render: (value) =>
        permissions.some(
          (item) => item.method === "PUT" && item.module == "COURSES"
        ) && (
          <Space size="middle">
            <EditOutlined
              style={{ fontSize: 20, color: "rgb(255, 165, 0)" }}
              onClick={() => {
                setOpen(true);
                handleOpenModal();
                form.setFieldsValue({
                  ...value,
                  categories: value.categories.map((c) => c.id),
                  upload: value.thumnail
                    ? [
                        {
                          uid: "-1", // id tạm, chỉ cần unique
                          name: value.thumnail, // tên file hiển thị
                          status: "done", // báo đã upload xong
                          url: `http://localhost:8080/storage/thumnail/${value.thumnail}`,
                        },
                      ]
                    : [],
                });
                setTypeSubmit("update");
              }}
            />

            <Popconfirm
              title="Delete user"
              description="Bạn có muốn xóa user ?"
              onConfirm={async () => {
                await callDeleteCourse(value.id);
                actionRef.current?.reload();
                message.success("Xóa course thành công");
              }}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined
                style={{ color: "rgb(255, 77, 79)", fontSize: 20 }}
              />
            </Popconfirm>
          </Space>
        ),
    },
  ];
  const handleSubmit = async (value) => {
    try {
      await form.validateFields();
      // Nếu có upload ảnh
      let thumnail;
      if (value.upload && value.upload.length > 0) {
        // Tạo FormData
        const file = value.upload[0];
        if (file.originFileObj) {
          const formData = new FormData();
          formData.append("folder", "thumnail");
          formData.append("file", file.originFileObj);
          thumnail = await callUploadFile(formData);
        }
      }
      const { upload, categories, ...payload } = value;
      const Listcategories = categories.map((item) => ({ id: item }));

      const res =
        typeSubmit === "create"
          ? await callCreateCourse({
              ...payload,
              thumnail,
              categories: Listcategories,
            })
          : await callUpdateCourse({
              ...payload,
              thumnail,
              categories: Listcategories,
            });

      if (res) {
        message.success(
          typeSubmit === "create"
            ? "Tạo course thành công"
            : "Cập nhật course thành công"
        );
        form.resetFields();
        setOpen(false);
        actionRef.current?.reload();
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

  const handleGetCourse = async (value) => {
    if (user.role.name === "ADMIN") {
      return await callGetCourse(value);
    } else {
      return await callGetCourseByUser(value);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        bordered
        request={async (params, sort, filter) => {
          const { current, pageSize, ...rest } = params;
          const query = {
            page: current,
            size: pageSize,
            ...rest,
            sort: sort
              ? Object.keys(sort)
                  .map(
                    (key) => `${key},${sort[key] === "ascend" ? "asc" : "desc"}`
                  )
                  .join("") // &
              : undefined,
          };
          // const res = await callGetCourse(query);
          const res = await handleGetCourse(query);

          return {
            data: res.data.result,
            success: true,
            total: res.data.meta.total,
          };
        }}
        editable={{
          type: "multiple",
        }}
        columnsState={{
          persistenceKey: "pro-table-singe-demos",
          persistenceType: "localStorage",
          defaultValue: {
            option: { fixed: "right", disable: true },
          },
        }}
        rowKey="id"
        search={{
          labelWidth: "auto",
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          syncToUrl: (values, type) => {
            if (type === "get") {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="Danh sách khóa học"
        toolBarRender={() => [
          permissions.some(
            (item) =>
              item.method?.toUpperCase() === "POST" && // quyền create
              item.module?.toUpperCase() === "COURSES"
          ) && (
            <Button
              key="button"
              icon={<PlusOutlined />}
              onClick={() => {
                setOpen(true);
                handleOpenModal();
                setTypeSubmit("create");
              }}
              type="primary"
            >
              Thêm mới
            </Button>
          ),
        ]}
      />

      <Modal
        title={
          typeSubmit == "create" ? "Tạo mới khóa học" : "Cập nhật  khóa học"
        }
        okText={typeSubmit == "create" ? "Tạo mới " : "Cập nhật "}
        open={open}
        onOk={() => {
          handleSubmit(form.getFieldsValue());
        }}
        onCancel={() => {
          form.resetFields();
          setOpen(false);
        }}
        centered
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <Form form={form} layout="vertical" initialValues={{ active: true }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên khóa học"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên khóa học" },
                ]}
              >
                <Input placeholder="Nhập tên khóa học" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Giá (VNĐ)"
                name="price"
                rules={[{ required: true, message: "Vui lòng nhập giá" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
              >
                <Input.TextArea rows={4} placeholder="Nhập mô tả khóa học" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Trạng thái"
                name="active"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Giảng viên"
                name={["instructor", "id"]}
                rules={[
                  { required: true, message: "Vui lòng chọn giảng viên" },
                ]}
              >
                <Select
                  placeholder="Chọn giảng viên"
                  showSearch
                  optionFilterProp="children"
                  disabled={typeSubmit === "update"}
                >
                  {instructors?.map((i) => (
                    <Select.Option key={i.id} value={i.id}>
                      {i.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item
                label="Danh mục"
                name="categories"
                rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Chọn danh mục"
                  showSearch
                  optionFilterProp="children"
                  allowClear
                >
                  {categories?.map((c) => (
                    <Select.Option key={c.id} value={c.id}>
                      {c.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Upload"
                name="upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload listType="picture-card" beforeUpload={() => false}>
                  <button
                    style={{
                      color: "inherit",
                      cursor: "inherit",
                      border: 0,
                      background: "none",
                    }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                </Upload>
              </Form.Item>
            </Col>
            {typeSubmit === "update" && (
              <Col>
                <Form.Item label="ID" name="id" hidden>
                  <Input disabled />
                </Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default CourseTable;

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
} from "antd";
import { useRef, useState } from "react";
import {
  callCreateUser,
  callDeleteUser,
  callGetUser,
  callUpdateUser,
} from "../../service/service-api";

const UserTable = () => {
  const actionRef = useRef();
  const [form] = Form.useForm();
  const [typeSubmit, setTypeSubmit] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (value) => {
    try {
      await form.validateFields();
      const res =
        typeSubmit === "create"
          ? await callCreateUser(value)
          : await callUpdateUser(value);

      if (res) {
        message.success(
          typeSubmit === "create"
            ? "Tạo user thành công"
            : "Cập nhật user thành công"
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
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
      hideInSearch: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Role",
      dataIndex: ["role", "name"],
      key: "role",
      hideInSearch: true,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      hideInSearch: true,
      sorter: true,
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      key: "updatedAt",
      hideInSearch: true,
      sorter: true,
    },
    {
      title: "Action",
      key: "action",
      width: 50,
      hideInSearch: true,
      render: (value) => (
        <Space size="middle">
          <EditOutlined
            style={{ fontSize: 20, color: "rgb(255, 165, 0)" }}
            onClick={() => {
              setOpen(true);
              form.setFieldsValue(value);
              setTypeSubmit("update");
            }}
          />

          <Popconfirm
            title="Delete user"
            description="Bạn có muốn xóa user ?"
            onConfirm={async () => {
              await callDeleteUser(value.id);
              actionRef.current?.reload();
              message.success("Xóa user thành công");
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
          const res = await callGetUser(query);
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
        headerTitle="User Table"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpen(true);
              setTypeSubmit("create");
            }}
            type="primary"
          >
            Thêm mới
          </Button>,
        ]}
      />

      <Modal
        title={typeSubmit == "create" ? "Tạo mới user" : "Cập nhật user"}
        okText={typeSubmit == "create" ? "Tạo mới " : "Cập nhật "}
        centered
        open={open}
        onOk={() => {
          handleSubmit(form.getFieldsValue());
        }}
        onCancel={() => {
          form.resetFields();
          setOpen(false);
        }}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
                label="Email"
                name="email"
              >
                <Input
                  disabled={typeSubmit == "update"}
                  placeholder="Nhập email  "
                />
              </Form.Item>
            </Col>
            {typeSubmit == "create" && (
              <Col lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  rules={[
                    { required: true, message: "Vui lòng nhập password" },
                  ]}
                  label="Mật khẩu"
                  name="password"
                >
                  <Input.Password placeholder="Nhập password " />
                </Form.Item>
              </Col>
            )}

            <Col lg={6} md={6} sm={12} xs={12}>
              <Form.Item
                rules={[
                  { required: true, message: "Vui lòng nhập tên" },
                  {
                    type: "string",
                    min: 6,
                    message: "Tên phải có ít nhất 6 ký tự",
                  },
                ]}
                label="Tên hiển thị"
                name="name"
              >
                <Input id="modal-name" placeholder="Nhập tên hiển thị" />
              </Form.Item>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Form.Item
                label="Tuổi"
                name="age"
                rules={[
                  { required: true, message: "Vui lòng nhập tuổi" },
                  {
                    type: "number",
                    min: 18,
                    max: 99,
                    message: "Tuổi từ 18 đến 99",
                  },
                ]}
              >
                <InputNumber
                  id="modal-age"
                  placeholder="Nhập tuổi"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Form.Item
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
                label="Giới tính"
                name="gender"
              >
                <Select placeholder="Chọn giới tính">
                  <Select.Option value="FEMALE">Female</Select.Option>
                  <Select.Option value="MALE">Male</Select.Option>
                  <Select.Option value="OTHER">Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col lg={6} md={6} sm={12} xs={12}>
              <Form.Item
                rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
                label="Vai trò"
                name={["role", "name"]}
              >
                <Select placeholder="Chọn vai trò">
                  <Select.Option value="ADMIN">Admin</Select.Option>
                  <Select.Option value="INTRUCTOR">Intructor</Select.Option>
                  <Select.Option value="USER">User</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                label="Địa chỉ"
                name="address"
              >
                <Input placeholder="Nhập địa chỉ" />
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
export default UserTable;

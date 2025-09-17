import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import ProTable from "@ant-design/pro-table";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  notification,
  Popconfirm,
  Row,
  Select,
  Space,
  Tag,
} from "antd";
import { useRef, useState } from "react";

import dayjs from "dayjs";
import {
  callCreatePermission,
  callDeletePermission,
  callGetPermission,
  callUpdatePermission,
} from "../../service/service-api";
const PermissionTable = () => {
  const actionRef = useRef();
  const [form] = Form.useForm();
  const [typeSubmit, setTypeSubmit] = useState("");
  const [open, setOpen] = useState(false);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      sorted: true,
    },
    {
      title: "API",
      dataIndex: "apiPath",
      align: "center",
      sorted: true,
    },
    {
      title: "Method",
      dataIndex: "method",
      align: "center",
      sorted: true,
      render: (_, record) => {
        let color;
        switch (record.method) {
          case "GET":
            color = "blue";
            break;
          case "POST":
            color = "green";
            break;
          case "PUT":
            color = "orange";
            break;
          case "DELETE":
            color = "red";
            break;
          default:
            color = "default";
        }
        return <Tag color={color}>{record.method}</Tag>;
      },
    },
    {
      title: "Module",
      dataIndex: "module",
      align: "center",
      sorted: true,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (date) => (date ? dayjs(date).format("DD/MM/YYYY HH:mm") : ""),
    },

    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      render: (date) => (date ? dayjs(date).format("DD/MM/YYYY HH:mm") : ""),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
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
            title="Delete Permission"
            description="Bạn có muốn xóa permission ?"
            onConfirm={async () => {
              await callDeletePermission(value.id);
              actionRef.current?.reload();
              message.success("Xóa permission thành công");
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
      const res =
        typeSubmit === "create"
          ? await callCreatePermission(value)
          : await callUpdatePermission(value);

      if (res) {
        message.success(
          typeSubmit === "create"
            ? "Tạo permission thành công"
            : "Cập nhật permission thành công"
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
                  .join(",") // &
              : undefined,
          };
          const res = await callGetPermission(query);
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
        headerTitle="Danh sách Permission (Quyền hạn)"
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
        title={
          typeSubmit == "create" ? "Tạo mới permission" : "Cập nhật permission"
        }
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
        <Form layout="vertical" form={form} initialValues={{ active: true }}>
          <Row gutter={16}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
                label="Name"
                name="name"
              >
                <Input placeholder="Nhập email  " />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
                label="API Path"
                name="apiPath"
              >
                <Input placeholder="Nhập path  " />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                rules={[{ required: true, message: "Vui lòng chọn method!" }]}
                label="Method"
                name="method"
              >
                <Select placeholder="Please select a method">
                  <Select.Option value="GET">GET</Select.Option>
                  <Select.Option value="POST">POST</Select.Option>
                  <Select.Option value="PUT">PUT</Select.Option>
                  <Select.Option value="DELETE">DELETE</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                rules={[{ required: true, message: "Vui lòng chọn module!" }]}
                label="Module"
                name="module"
              >
                <Select placeholder="Please select a module">
                  <Select.Option value="USERS">USERS</Select.Option>
                  <Select.Option value="COURESE">COURESE</Select.Option>
                  <Select.Option value="ASSIGNMENT">ASSIGNMENTS</Select.Option>
                  <Select.Option value="ENROLLMENTS">ENROLLMENTS</Select.Option>
                  <Select.Option value="SUBMISSIONS">SUBMISSIONS</Select.Option>
                  <Select.Option value="ROLES">ROLES</Select.Option>
                  <Select.Option value="PERMISSIONS">PERMISSIONS</Select.Option>
                  <Select.Option value="CATEGORIES COURSES">
                    CATEGORIES COURSES
                  </Select.Option>
                </Select>
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
export default PermissionTable;

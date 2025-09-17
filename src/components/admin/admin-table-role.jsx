import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ProTable from "@ant-design/pro-table";
import {
  Button,
  Card,
  Col,
  Collapse,
  Form,
  Input,
  message,
  Modal,
  notification,
  Popconfirm,
  Row,
  Space,
  Switch,
  Tag,
} from "antd";
import { useRef, useState } from "react";
import {
  callCreateRole,
  callDeleteRole,
  callGetPermission,
  callGetRole,
  callUpdateRole,
} from "../../service/service-api";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

const RoleTable = () => {
  const actionRef = useRef();
  const [form] = Form.useForm();
  const [typeSubmit, setTypeSubmit] = useState("");
  const [open, setOpen] = useState(false);
  const [permissions, setPermissions] = useState();
  const [permissionId, setPermissionId] = useState([]);
  const [activeKey, setActiveKey] = useState(["USERS"]);
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
              handleOpenModal(value);
              form.setFieldsValue(value);
              setTypeSubmit("update");
            }}
          />

          <Popconfirm
            title="Delete Permission"
            description="Bạn có muốn xóa permission ?"
            onConfirm={async () => {
              await callDeleteRole(value.id);
              actionRef.current?.reload();
              message.success("Xóa role thành công");
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

  const handleOpenModal = async (record) => {
    setPermissionId(record?.permissions ?? []);
    const permissions = await callGetPermission();
    setPermissions(permissions.data.result);
    setOpen(true);
  };
  const handleSubmit = async (value) => {
    try {
      await form.validateFields();
      const res =
        typeSubmit === "create"
          ? await callCreateRole({ ...value, permissions: permissionId })
          : await callUpdateRole({ ...value, permissions: permissionId });

      if (res) {
        message.success(
          typeSubmit === "create"
            ? "Tạo role thành công"
            : "Cập nhật role thành công"
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

  const module = permissions?.map((item) => item.module);

  const filterModule = module?.filter(
    (item, index) => module.indexOf(item) === index
  );

  const items = filterModule?.map((mod) => {
    const perms = permissions.filter((p) => p.module === mod);
    console.log(permissionId);

    return {
      key: mod,
      label: (
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <span>{mod}</span>
        </Space>
      ),
      extra: (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Switch
            size="large"
            checked={perms.some((p) =>
              permissionId.some((sel) => sel.id === p.id)
            )}
            onChange={(checked) => {
              if (checked) {
                // Bật ON -> thêm toàn bộ perm trong module (nếu chưa có)
                const idsInModule = perms
                  .filter((p) => !permissionId.some((sel) => sel.id === p.id))
                  .map((p) => ({ id: p.id }));
                setPermissionId([...permissionId, ...idsInModule]);
              } else {
                // Bật OFF -> bỏ toàn bộ perm trong module
                const next = permissionId.filter(
                  (sel) => !perms.some((p) => p.id === sel.id)
                );
                setPermissionId(next);
              }
            }}
          />
        </div>
      ),
      children: (
        <Row>
          {perms?.map((p) => (
            <Col lg={12} md={12} sm={24} xs={24} key={p.id}>
              <Space
                style={{
                  width: "95%",
                  border: "1px solid rgb(217 217 217)",
                  borderRadius: 6,
                  padding: 12,
                  margin: "8px 0",
                }}
              >
                <Switch
                  checked={permissionId?.some((item) => item.id === p.id)}
                  onChange={(key) => {
                    const next = key
                      ? [...permissionId, { id: p.id }]
                      : permissionId?.filter((item) => item.id !== p.id);
                    setPermissionId(next);
                  }}
                />
                <div>
                  <span>{p.name}</span>
                  <div>{p.method}</div>
                </div>
              </Space>
            </Col>
          ))}
        </Row>
      ),
    };
  });

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
          const res = await callGetRole(query);

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
              form.resetFields();
              handleOpenModal({ permissions: [] });
              setTypeSubmit("create");
            }}
            type="primary"
          >
            Thêm mới
          </Button>,
        ]}
      />
      <Modal
        title={typeSubmit == "create" ? "Tạo mới role" : "Cập nhật role"}
        okText={typeSubmit == "create" ? "Tạo mới " : "Cập nhật "}
        centered
        open={open}
        onOk={() => {
          handleSubmit(form.getFieldsValue());
        }}
        onCancel={() => {
          form.resetFields();
          setActiveKey(["USERS"]);
          setOpen(false);
        }}
        width={800}
        // width={{
        //   xs: "90%",
        //   sm: "80%",
        //   md: "70%",
        //   lg: "60%",
        //   xl: "50%",
        //   xxl: "40%",
        // }}
      >
        <Form layout="vertical" form={form} initialValues={{ active: true }}>
          <Row gutter={16}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
                label="Name"
                name="name"
              >
                <Input placeholder="Nhập role  " />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
                label="Trạng thái"
                name="active"
              >
                <Switch />
              </Form.Item>
            </Col>

            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="Miêu tả"
                name="description"
                rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
                placeholder="Nhập miêu tả role"
              >
                <TextArea size="large" />
              </Form.Item>
            </Col>
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item label="Quyền hạn" name="permissions">
                <Card style={{ padding: "8px 0" }}>
                  <Collapse
                    items={items}
                    activeKey={activeKey}
                    onChange={(key) => setActiveKey(key)}
                  />
                </Card>
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
export default RoleTable;

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ProTable from "@ant-design/pro-table";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Space,
  Switch,
} from "antd";
import { useRef, useState } from "react";
import {
  callCreateCourseCategory,
  callDeleteCourseCategory,
  callGetCourseCategory,
  callUpdateCourseCategory,
} from "../../../service/service-api";
const CourseCategory = () => {
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
      title: "Category Name",
      dataIndex: "name",
      key: "name",
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
              await callDeleteCourseCategory(value.id);
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
  const handleSubmit = async (value) => {
    try {
      await form.validateFields();
      const res =
        typeSubmit === "create"
          ? await callCreateCourseCategory(value)
          : await callUpdateCourseCategory(value);

      if (res) {
        message.success(
          typeSubmit === "create"
            ? "Tạo category name thành công"
            : "Cập nhật category name thành công"
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
                  .join("") // &
              : undefined,
          };
          const res = await callGetCourseCategory(query);
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
        title={typeSubmit == "create" ? "Tạo mới " : "Cập nhật "}
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
      >
        <Form layout="vertical" form={form} initialValues={{ active: true }}>
          <Row gutter={16}>
            <Col lg={16} md={16} sm={16} xs={16}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên name category course",
                  },
                  {
                    type: "string",
                    min: 6,
                    message: "Tên phải có ít nhất 6 ký tự",
                  },
                ]}
                label="Tên nhóm khóa học"
                name="name"
              >
                <Input id="modal-name" placeholder="Nhập tên hiển thị" />
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={8} xs={8}>
              <Form.Item
                label="Trạng thái"
                name="active"
                valuePropName="checked"
              >
                <Switch />
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
export default CourseCategory;

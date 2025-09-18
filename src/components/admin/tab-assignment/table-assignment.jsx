import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ProTable from "@ant-design/pro-table";
import {
  Button,
  Col,
  DatePicker,
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
import {
  callCreateAssignment,
  callGetAssignment,
  callUpdateAssignment,
} from "../../../service/service-api";
import dayjs from "dayjs";
import { Link, useOutletContext } from "react-router";

const AssignmentTable = ({ onSelectAssignment }) => {
  const actionRef = useRef();
  const [form] = Form.useForm();
  const [typeSubmit, setTypeSubmit] = useState("");
  const [open, setOpen] = useState(false);
  const { handleOpenModal, instructors, courses } = useOutletContext();
  const columns = [
    {
      title: "Tên bài tập",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (_, record) => (
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectAssignment(record);
          }}
        >
          {record.name}
        </Link>
      ),
    },
    {
      title: "Ngày giao",
      dataIndex: "assignedDate",
      key: "assignedDate",
      align: "center",
      render: (date) => (date ? dayjs(date).format("DD/MM/YYYY HH:mm") : ""),
    },
    {
      title: "Hạn nộp",
      dataIndex: "dueDate",
      align: "center",
      key: "dueDate",
      render: (date) => (date ? dayjs(date).format("DD/MM/YYYY HH:mm") : ""),
    },
    {
      title: "Người giao",
      dataIndex: ["course", "instructor", "name"],
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
      key: "status",
      render: (status) => {
        const colorMap = {
          DRAFT: "default",
          PUBLISHED: "green",
          CLOSED: "red",
        };
        const labelMap = {
          DRAFT: "Nháp",
          PUBLISHED: "Đã phát hành",
          CLOSED: "Đã đóng",
        };
        return (
          <Tag color={colorMap[status] || "blue"}>
            {labelMap[status] || status}
          </Tag>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      width: 80,
      hideInSearch: true,
      render: (value) => (
        <Space>
          <EditOutlined
            style={{ fontSize: 20, color: "rgb(255, 165, 0)" }}
            onClick={() => {
              setOpen(true);
              handleOpenModal();
              form.setFieldsValue({
                ...value,
                assignedDate: value.assignedDate
                  ? dayjs(value.assignedDate)
                  : null,
                dueDate: value.dueDate ? dayjs(value.dueDate) : null,
              });
              setTypeSubmit("update");
            }}
          />

          <Popconfirm
            title="Delete user"
            description="Bạn có muốn xóa user ?"
            onConfirm={async () => {
              //   await callDeleteUser(value.id);
              //   actionRef.current?.reload();
              //   message.success("Xóa user thành công");
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
          ? await callCreateAssignment(value)
          : await callUpdateAssignment(value);

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
          const res = await callGetAssignment(query);
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
        headerTitle="Danh sách Assignment "
        toolBarRender={() => [
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
          </Button>,
        ]}
      />
      <Modal
        title={
          typeSubmit === "create" ? "Tạo mới Assignment" : "Cập nhật Assignment"
        }
        okText={typeSubmit === "create" ? "Tạo mới" : "Cập nhật"}
        open={open}
        onOk={() => {
          handleSubmit(form.getFieldsValue());
        }}
        onCancel={() => {
          form.resetFields();
          setOpen(false);
        }}
        centered
        width={800}
        style={{ maxWidth: "90%" }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: "DRAFT",
            assignedDate: dayjs(),
          }}
        >
          <Row gutter={16}>
            {/* Tên bài tập */}
            <Col span={12}>
              <Form.Item
                label="Tên bài tập"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên bài tập" },
                ]}
              >
                <Input placeholder="Nhập tên bài tập" />
              </Form.Item>
            </Col>

            {/* Trạng thái */}
            <Col span={12}>
              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[
                  { required: true, message: "Vui lòng chọn trạng thái" },
                ]}
              >
                <Select placeholder="Chọn trạng thái">
                  <Select.Option value={"DRAFT"}>DRAFT</Select.Option>
                  <Select.Option value={"ASSIGNED"}>ASSIGNED</Select.Option>
                  <Select.Option value={"CLOSED"}>CLOSED</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            {/* Ngày giao */}
            <Col span={12}>
              <Form.Item
                label="Ngày giao"
                name="assignedDate"
                rules={[{ required: true, message: "Vui lòng chọn ngày giao" }]}
              >
                <DatePicker
                  showTime
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY HH:mm"
                />
              </Form.Item>
            </Col>

            {/* Hạn nộp */}
            <Col span={12}>
              <Form.Item
                label="Hạn nộp"
                name="dueDate"
                rules={[
                  { required: true, message: "Vui lòng chọn hạn nộp" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const assigned = getFieldValue("assignedDate");
                      if (!value || !assigned) {
                        return Promise.resolve();
                      }
                      if (value.isAfter(assigned)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Hạn nộp phải sau ngày giao")
                      );
                    },
                  }),
                ]}
              >
                <DatePicker
                  showTime
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY HH:mm"
                />
              </Form.Item>
            </Col>

            {/* Giảng viên */}
            <Col span={12}>
              <Form.Item
                label="Giảng viên"
                name={["course", "instructor", "name"]}
                rules={[
                  { required: true, message: "Vui lòng chọn giảng viên" },
                ]}
              >
                <Select
                  placeholder="Chọn giảng viên"
                  showSearch
                  optionFilterProp="children"
                  disabled={typeSubmit == "update"}
                >
                  {instructors?.map((i) => (
                    <Select.Option key={i.id} value={i.id}>
                      {i.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Khóa học */}
            <Col span={12}>
              <Form.Item
                label="Khóa học"
                name={["course", "id"]}
                rules={[{ required: true, message: "Vui lòng chọn khóa học" }]}
              >
                <Select
                  placeholder="Chọn khóa học"
                  showSearch
                  optionFilterProp="children"
                  disabled={typeSubmit == "update"}
                >
                  {courses?.map((c) => (
                    <Select.Option key={c.id} value={c.id}>
                      {c.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Mô tả */}
            <Col span={24}>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
              >
                <Input.TextArea rows={4} placeholder="Nhập mô tả" />
              </Form.Item>
            </Col>

            {typeSubmit === "update" && (
              <Form.Item name="id" hidden>
                <Input disabled />
              </Form.Item>
            )}
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default AssignmentTable;

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ProTable from "@ant-design/pro-table";
import { Button, Form, Popconfirm, Space, Tag } from "antd";
import { useRef } from "react";
import { callGetAssignmentById } from "../../../service/service-api";
import dayjs from "dayjs";

const SubmissionTable = ({ assignmentId }) => {
  const actionRef = useRef();
  const columns = [
    {
      title: "Người nộp bài",
      dataIndex: "user",
      align: "center",
    },

    {
      title: "Ngày nộp",
      dataIndex: "submitDate",
      key: "submitDate",
      align: "center",
      render: (date) =>
        dayjs(date).isValid() ? dayjs(date).format("DD/MM/YYYY HH:mm") : "",
    },
    {
      title: "Tên bài nộp",
      dataIndex: "url",
      key: "url",
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
            style={{ fontSize: 20, color: "rgba(131, 130, 129, 1)" }}
          />

          <DeleteOutlined
            style={{ color: "rgba(124, 123, 123, 1)", fontSize: 20 }}
          />
        </Space>
      ),
    },
  ];
  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      cardBordered
      bordered
      params={{ assignmentId }}
      request={async (params) => {
        if (!params.assignmentId) return { data: [], success: true };
        const res = await callGetAssignmentById(params.assignmentId);
        return {
          data: res.data.submissions,
          success: true,
          total: res.data.submissions.length,
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
      headerTitle="Danh sách bài nộp"
      toolBarRender={() => [
        <Button
          disabled
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
  );
};
export default SubmissionTable;

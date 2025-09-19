import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ProTable from "@ant-design/pro-table";
import { Button, Space, Tag } from "antd";
import { useRef } from "react";
import { callGetCourseById } from "../../../service/service-api";
import dayjs from "dayjs";

const EnrollmentTable = ({ courseId }) => {
  const actionRef = useRef();
  const columns = [
    {
      title: "Người đăng ký",
      dataIndex: "name",
      align: "center",
    },

    {
      title: "Ngày đăng ký",
      dataIndex: "enrollDate",
      key: "enrollDate",
      align: "center",
      render: (date) =>
        dayjs(date).isValid() ? dayjs(date).format("DD/MM/YYYY HH:mm") : "",
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
      params={{ courseId }}
      request={async (params) => {
        if (!params.courseId) return { data: [], success: true };
        const res = await callGetCourseById(params.courseId);
        return {
          data: res.data.enrollments,
          success: true,
          total: res.data.enrollments.length,
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
      headerTitle="User Enrollments"
      toolBarRender={() => [
        <Button
          disabled
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {}}
          type="primary"
        >
          Thêm mới
        </Button>,
      ]}
    />
  );
};
export default EnrollmentTable;

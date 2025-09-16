import { Tabs } from "antd";
import AssignmentTable from "./tab-assignment/table-assignment";
import SubmissionTable from "./tab-assignment/table-submission";
import { useState } from "react";

const AssigmnetTabs = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [selectedId, setSelectedId] = useState(null);
  const items = [
    {
      key: "1",
      label: "Assignment",
      children: (
        <AssignmentTable
          onSelectAssignment={(record) => {
            setSelectedId(record.id);
            setActiveKey("2");
          }}
        />
      ),
    },
    {
      key: "2",
      label: "Submission",
      children: <SubmissionTable assignmentId={selectedId} />,
    },
  ];
  return (
    <Tabs
      activeKey={activeKey}
      items={items}
      onChange={(key) => {
        setActiveKey(key);
        if (key === "1") {
          setSelectedId(null);
        }
      }}
    />
  );
};
export default AssigmnetTabs;

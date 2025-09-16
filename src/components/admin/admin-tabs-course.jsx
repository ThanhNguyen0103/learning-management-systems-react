import { Tabs } from "antd";
import CourseTable from "./tab-course/table-course";
import CourseCategory from "./tab-course/table-category-course";
import EnrollmentTable from "./tab-course/table-enroll";
import { useState } from "react";

const CourseTabs = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [selectedId, setSelectedId] = useState(null);
  const items = [
    {
      key: "1",
      label: "Course",
      children: (
        <CourseTable
          onChangeSelectedId={(value) => {
            setSelectedId(value.id);
            setActiveKey("2");
          }}
        />
      ),
    },
    {
      key: "2",
      label: "Enrollment",
      children: <EnrollmentTable courseId={selectedId} />,
    },
    {
      key: "3",
      label: "Category Course",
      children: <CourseCategory />,
    },
  ];
  return (
    <Tabs
      activeKey={activeKey}
      items={items}
      onChange={(key) => {
        setActiveKey(key);
        if (key === "1") setSelectedId(null);
      }}
    />
  );
};
export default CourseTabs;

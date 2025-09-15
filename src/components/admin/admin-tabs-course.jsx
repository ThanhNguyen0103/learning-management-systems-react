import { Tabs } from "antd";
import CourseTable from "./tab-course/table-course";
import CourseCategory from "./tab-course/tab-category-course";

const CourseTabs = () => {
  const items = [
    {
      key: "1",
      label: "Course",
      children: <CourseTable />,
    },
    {
      key: "2",
      label: "Category Course",
      children: <CourseCategory />,
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} />;
};
export default CourseTabs;

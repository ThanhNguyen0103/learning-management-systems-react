import { BrowserRouter, Route, Routes } from "react-router";
import LayoutClient from "./components/layout-client";
import ContentClient from "./components/client/client-content";
import CoursesPage from "./pages/client/page-courses";
import CourseDetailsPage from "./pages/client/page-course-details";
import LayoutAdmin from "./components/layout-admin";
import UserTable from "./components/admin/admin-table-user";
import viVN from "antd/es/locale/vi_VN";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import DashBoardPage from "./components/admin/admin-dashboard";
import CourseTabs from "./components/admin/admin-tabs-course";
import AssignmentTable from "./components/admin/admin-table-assignment";

const App = () => {
  return (
    <ConfigProvider locale={viVN}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutClient />}>
            <Route index element={<ContentClient />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="courses/:id" element={<CourseDetailsPage />} />
          </Route>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<DashBoardPage />} />
            <Route path="users" element={<UserTable />} />
            <Route path="courses" element={<CourseTabs />} />
            <Route path="assignments" element={<AssignmentTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};
export default App;

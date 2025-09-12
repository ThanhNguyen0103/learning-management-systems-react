import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "antd/dist/reset.css";
import ContentClient from "./components/client/client-content.jsx";
import LayoutClient from "./components/layout-client.jsx";
import CoursesPage from "./pages/page-courses.jsx";
import CourseDetailsPage from "./pages/page-course-details.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LayoutClient />}>
        <Route index element={<ContentClient />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:id" element={<CourseDetailsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

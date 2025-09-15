import instance from "./service-api-custom";
// module user
export const callCreateUser = (value) => {
  return instance.post("/api/v1/users", value);
};
export const callUpdateUser = (value) => {
  return instance.put("/api/v1/users", value);
};
export const callDeleteUser = (id) => {
  return instance.delete(`/api/v1/users/${id}`);
};
export const callGetUserById = (id) => {
  return instance.get(`/api/v1/users/${id}`);
};
export const callGetUser = (query) => {
  return instance.get(`/api/v1/users`, {
    params: query,
  });
};

// --- module course
export const callCreateCourse = (value) => {
  return instance.post("/api/v1/courses", value);
};
export const callUpdateCourse = (value) => {
  return instance.put("/api/v1/courses", value);
};
export const callDeleteCourse = (id) => {
  return instance.delete(`/api/v1/courses/${id}`);
};
export const callGetCourseById = (id) => {
  return instance.get(`/api/v1/courses/${id}`);
};
export const callGetCourse = (query) => {
  return instance.get(`/api/v1/courses`, {
    params: query,
  });
};
// --- module course catrgory

export const callCreateCourseCategory = (value) => {
  return instance.post("/api/v1/course-category", value);
};
export const callUpdateCourseCategory = (value) => {
  return instance.put("/api/v1/course-category", value);
};
export const callDeleteCourseCategory = (id) => {
  return instance.delete(`/api/v1/course-category/${id}`);
};
export const callGetCourseCategoryById = (id) => {
  return instance.get(`/api/v1/course-category/${id}`);
};
export const callGetCourseCategory = (query) => {
  return instance.get(`/api/v1/course-category`, {
    params: query,
  });
};
// --- module assignment

export const callCreateAssignment = (value) => {
  return instance.post("/api/v1/assignments", value);
};
export const callUpdateAssignment = (value) => {
  return instance.put("/api/v1/assignments", value);
};
export const callDeleteAssignment = (id) => {
  return instance.delete(`/api/v1/assignments/${id}`);
};
export const callGetAssignmentById = (id) => {
  return instance.get(`/api/v1/assignments/${id}`);
};
export const callGetAssignment = (query) => {
  return instance.get(`/api/v1/assignments`, {
    params: query,
  });
};

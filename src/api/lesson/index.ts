import request from "@/config/request";

export const createLesson = ({ name, timeYear, timeXueqi }: any) => {
  return request.post({
    url: "/teacher/stactCourse",
    data: { name, timeYear, timeXueqi }
  });
};

export const updateLesson = ({ newCourseName, newCourseTimeYear, newCourseTimeXueqi }: any) => {
  return request.post({
    url: "/teacher/updateCourse",
    data: { newCourseName, newCourseTimeYear, newCourseTimeXueqi }
  });
};

export const deleteLesson = ({ courseName }: any) => {
  return request.post({
    url: "/teacher/deleteCourse",
    data: { courseName }
  });
};
export const getLessonByTeacher = () => {
  return request.get({
    url: "/teacher/getCourse"
  });
};
export const joinLesson = ({ className, teacherName }: any) => {
  return request.post({
    url: "/teacher/updateCourse",
    data: { className, teacherName }
  });
};
export const getLessonByStudent = () => {
  return request.post({
    url: "/student/classInfo"
  });
};

export const quitLesson = ({ className }: any) => {
  return request.post({
    url: "/student/quitClass",
    data: { className }
  });
};

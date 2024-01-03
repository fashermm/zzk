import request from "@/config/request";

export const createLessonAPI = ({ name, timeYear, timeXueqi, teacherName }: any) => {
  return request.post({
    url: "/teacher/startcourse",
    data: { name, timeYear, timeXueqi, teacherName }
  });
};

export const updateLessonAPI = ({ newCourseName, newCourseTimeYear, newCourseTimeXueqi, teacherName }: any) => {
  return request.post({
    url: "/teacher/updatecourse",
    data: { newCourseName, newCourseTimeYear, newCourseTimeXueqi, teacherName }
  });
};

export const deleteLessonAPI = ({ className, teacherName }: any) => {
  return request.post({
    url: "/teacher/deletecourse",
    data: { className, teacherName }
  });
};

export const getLessonByTeacherAPI = (params: Record<string, any>) => {
  return request.get({
    url: "/teacher/getcourse",
    params
  });
};

export const joinLessonAPI = ({ className, teacherName }: any) => {
  return request.post({
    url: "/teacher/updatecourse",
    data: { className, teacherName }
  });
};

export const getLessonByStudentAPI = (params: Record<string, any>) => {
  return request.get({
    url: "/student/getclassInfo",
    params
  });
};

export const quitLessonAPI = ({ className }: any) => {
  return request.post({
    url: "/student/quitclass",
    data: { className }
  });
};

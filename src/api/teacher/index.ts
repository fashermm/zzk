import request from "@/config/request";

export function teacherLoginAPI({ teacherId, teacherPassword }: any) {
  return request.post({ url: "/teacher/login", data: { teacherId, teacherPassword } });
}

export function teacherRegisterAPI({ checkPassword, name, professional, sex, teacherId, teacherPassword }: any) {
  return request.post({
    url: "/teacher/register",
    data: { checkPassword, name, professional, sex, teacherId, teacherPassword }
  });
}

export function teacherUpdateAPI({ checkPassword, name, professional, sex, newPassword }: any) {
  return request.post({
    url: "/teacher/update",
    data: { checkPassword, name, professional, sex, newPassword }
  });
}

export function teacherLogoutAPI() {
  return request.post({ url: "/teacher/logout" });
}

export function teacherInfoAPI() {
  return request.get({ url: "/teacher/info" });
}

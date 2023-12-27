import request from "@/config/request";

export function teacherLoginAPI({ studentId, studenetPassword }: any) {
  return request.post({ url: "/teacher/login", data: { studentId, studenetPassword } });
}

export function teacherRegisterAPI({ checkPassword, name, professional, sex, studentId, studentPassword }: any) {
  return request.post({
    url: "/teacher/register",
    data: { checkPassword, name, professional, sex, studentId, studentPassword }
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

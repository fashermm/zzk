import request from "@/config/request";

export function studentLoginAPI({ studentId, studenetPassword }: any) {
  return request.post({ url: "/student/login", data: { studentId, studenetPassword } });
}

export function studentRegisterAPI({ checkPassword, name, professional, sex, studentId, studentPassword }: any) {
  return request.post({
    url: "/student/register",
    data: { checkPassword, name, professional, sex, studentId, studentPassword }
  });
}

export function studentUpdateAPI({ checkPassword, name, professional, sex, newPassword }: any) {
  return request.post({
    url: "/student/update",
    data: { checkPassword, name, professional, sex, newPassword }
  });
}

export function studentLogoutAPI() {
  return request.post({ url: "/student/logout" });
}

export function studentInfoAPI() {
  return request.get({ url: "/student/info" });
}

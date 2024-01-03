import request from "@/config/request";

export function publishCheckInAPI({ className, TeacherName, code }: any) {
  return request.post({
    url: "/teacher/addSign",
    data: { className, TeacherName, code }
  });
}

export function getCheckRecordAPI({ teacherName, className }: any) {
  return request.get({
    url: "/teacher/getsign",
    params: { teacherName, className }
  });
}

export function getStudentCheckRecordsAPI({ teacherName }: any) {
  return request.get({
    url: "/teacher/getstudentsign",
    params: { teacherName }
  });
}

export function getCheckInfoAPI({ studentName }: any) {
  return request.get({
    url: "/student/getsigninfo",
    params: { studentName }
  });
}

export function checkInAPI(data: any) {
  return request.post({
    url: "/student/sign",
    data
  });
}

import request from "@/config/request";

export function publishCheckInAPI({ className, teacherName, code }: any) {
  return request.post({
    url: "/teacher/addsign",
    data: { className, teacherName, code }
  });
}

export function getCheckRecordAPI({ teacherName, className }: any) {
  console.log(teacherName, className);
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
    params: { studentName, teacherName: 'zzb' }
  });
}

export function checkInAPI({ teacherName, className }: any) {
  return request.post({
    url: "/student/sign",
    data: { teacherName, className }
  });
}

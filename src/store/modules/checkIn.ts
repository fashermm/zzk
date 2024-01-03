import { checkInAPI, getCheckInfoAPI, getStudentCheckRecordsAPI, publishCheckInAPI } from "@/api/checkIn";
import { defineStore } from "pinia";
import { lessonData } from "@/constants/checkRecords";
import { ref } from "vue";

export const useCheckInStore = defineStore("checkIn", () => {
  const checkInRecords = ref(lessonData);
  const studentListRecords = ref<any>([]); /* teacher */
  const studentCheckInfo = ref<any>([]);

  const clearStudentListRecords = () => {
    studentListRecords.value = [];
  };

  const publishCheck = async (data: any) => {
    try {
      const res = await publishCheckInAPI(data);
      Promise.resolve(res.data);
    } catch (err) {
      console.log(err);
      Promise.reject(err);
    }
  };

  const deleteCheck = (idx: any) => {
    checkInRecords.value = checkInRecords.value.filter((item, index) => {
      return idx !== index;
    });
  };

  /* 老师查看某个课程班级签到情况 */
  const getCheckInfoByTeacher = (data: any) => {
    getStudentCheckRecordsAPI(data)
      .then((res) => {
        console.log(res);
      })
      .catch(() => {
        studentListRecords.value = lessonData;
        console.log("studentListRecords", studentListRecords);
      });
  };

  //#region student
  const checkIn = (data: any) => {
    checkInAPI(data)
      .then((res) => {
        console.log(res);
        Promise.resolve("success");
      })
      .catch((err) => {
        Promise.reject(err);
      });
  };
  /* 学生查看自己签到情况 */
  const getCheckInfoByStudent = (data: any) => {
    getCheckInfoAPI(data).then((res) => {
      console.log(res);
    });
  };
  //#endregion

  return {
    checkIn,
    publishCheck,
    deleteCheck,
    getCheckInfoByTeacher,
    getCheckInfoByStudent,
    clearStudentListRecords,

    checkInRecords,
    studentListRecords,
    studentCheckInfo
  };
});

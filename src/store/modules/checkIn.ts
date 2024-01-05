import { checkInAPI, getCheckInfoAPI, getCheckRecordAPI, getStudentCheckRecordsAPI, publishCheckInAPI } from "@/api/checkIn";
import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { lessonData } from "@/constants/checkRecords";
import { ref } from "vue";

export const useCheckInStore = defineStore("checkIn", () => {
  const checkInRecords = ref([]);
  const studentListRecords = ref<any>([]); /* teacher */
  const studentCheckInfo = ref<any>([]);
  const userStore = useUserStore();

  const clearStudentCheckInfo = () => {
    studentCheckInfo.value = [];
  }

  const clearStudentListRecords = () => {
    studentListRecords.value = [];
  };

  const clearCheckInRecords = () => {
    checkInRecords.value = [];
  }

  //#region student

  const publishCheck = async ({ className, code }: any) => {
    try {
      const res = await publishCheckInAPI({ className, code, teacherName: userStore.teacherInfo.name });
      return Promise.resolve(res.data);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };

  const deleteCheck = (idx: any) => {
    checkInRecords.value = checkInRecords.value.filter((item, index) => {
      return idx !== index;
    });
  };

  const getCheckInfoRecords = async ({ className }: any) => {
    try {
      // debugger;
      const res = await getCheckRecordAPI({ className, teacherName: userStore.teacherInfo.name });
      console.log(res, 'getCheckInfoRecords');
      checkInRecords.value = res.data;
      Promise.resolve(res.data);
    } catch (err) {
      Promise.reject(err);
    }
  }

  /* 老师查看某个课程班级签到情况 */
  const getCheckInfoByTeacher = () => {
    getStudentCheckRecordsAPI({ teacherName: userStore.teacherInfo.name })
      .then((res) => {
        console.log(res);
      })
      .catch(() => {
        studentListRecords.value = lessonData;
        console.log("studentListRecords", studentListRecords);
      });
  };

  //#endregion

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
  const getCheckInfoByStudent = async () => {
    try {
      getCheckInfoAPI({ studentName: userStore.studentInfo.name }).then((res) => {
        console.log(res);
        return Promise.resolve(res.data);
      });
    } catch (err) {
      return Promise.reject(err);
    }
  };
  //#endregion

  return {
    checkIn,
    publishCheck,
    deleteCheck,
    getCheckInfoByTeacher,
    getCheckInfoByStudent,
    clearStudentListRecords,
    getCheckInfoRecords,
    clearStudentCheckInfo,
    clearCheckInRecords,

    checkInRecords,
    studentListRecords,
    studentCheckInfo
  };
});

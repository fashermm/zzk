import { reactive, ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import { useUserStore } from "./user";
import {
  createLessonAPI,
  deleteLessonAPI,
  getLessonByStudentAPI,
  getLessonByTeacherAPI,
  joinLessonAPI,
  quitLessonAPI,
  updateLessonAPI
} from "@/api/lesson";
import { TEACHER } from "@/constants/state";

export const useLessonStore = defineStore("lesson", () => {
  const userStore = useUserStore();

  const lessonList = ref();

  const getLesson = async () => {
    console.log(userStore);
    if (userStore.roles === TEACHER) {
      getLessonByTeacherAPI({ teacherName: userStore.teacherInfo.name }).then((res) => {
        console.log(res);
        lessonList.value = res.data;
      });
    } else {
      getLessonByStudentAPI({ studentName: userStore.studentInfo.name }).then((res) => {
        console.log(res);
        lessonList.value = res.data;
      });
    }
  };

  //#region teacher
  const createLesson = async (data: any) => {
    createLessonAPI({ ...data, teacherName: userStore.teacherInfo.name }).then((res) => {
      console.log({ ...res });
    });
  };

  const deleteLesson = async (data: any) => {
    deleteLessonAPI({ ...data, teacherName: userStore.teacherInfo.name }).then((res) => {
      console.log(res);
    });
  };

  const editLesson = async (data: any) => {
    updateLessonAPI({ ...data, teacherName: userStore.teacherInfo.name }).then((res) => {
      console.log(res);
    });
  };
  //#endregion

  //#region student
  const joinLesson = async (data: any) => {
    joinLessonAPI(data).then((res) => {
      console.log(res);
    });
  };
  const quitLesson = async (data: any) => {
    quitLessonAPI(data).then((res) => {
      console.log(res);
    });
  };
  //#endregion

  return {
    lessonList,

    getLesson,
    createLesson,
    deleteLesson,
    editLesson,
    joinLesson,
    quitLesson
  };
});

/** 在 setup 外使用 */
export function useLessonStoreHook() {
  return useLessonStore(store);
}

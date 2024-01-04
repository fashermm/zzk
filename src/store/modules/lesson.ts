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

  const lessonList = ref([]);

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
  const clearLessonList = () => {
    lessonList.value = [];
  }

  //#region teacher
  const createLesson = async (data: any) => {
    try {
      console.log('userStore.teacherInfo.name', userStore.teacherInfo.name)
      const res = await createLessonAPI({ ...data, teacherName: userStore.teacherInfo.name })
      Promise.reject(res.data);
    } catch (err) {
      Promise.reject(err);
    }
  };

  const deleteLesson = async (data: any) => {
    deleteLessonAPI({ ...data, teacherName: userStore.teacherInfo.name }).then((res) => {
      console.log(res);
    });
  };

  const editLesson = async (data: any) => {
    try {
      const res = await updateLessonAPI({ ...data, teacherName: userStore.teacherInfo.name });
      Promise.resolve(res.data);
    } catch (err) {
      Promise.reject(err);
    }
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
    quitLesson,
    clearLessonList
  };
});

/** 在 setup 外使用 */
export function useLessonStoreHook() {
  return useLessonStore(store);
}

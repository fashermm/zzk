import { reactive, ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import { usePermissionStore } from "./permission";
import { useTagsViewStore } from "./tags-view";
import { useSettingsStore } from "./settings";
import { getToken, removeToken, setToken } from "@/utils/cache/cookies";
import router, { resetRouter } from "@/router";
import { loginApi, getUserInfoApi } from "@/api/login";
import { RegisterRequestData, type LoginRequestData } from "@/api/login/types/login";
import { type RouteRecordRaw } from "vue-router";
import routeSettings from "@/config/route";
import { studentInfoAPI, studentLoginAPI, studentRegisterAPI } from "@/api/student";
import { STUDENT } from "@/constants/state";
import { teacherInfoAPI, teacherLoginAPI, teacherRegisterAPI } from "@/api/teacher";

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "");
  const roles = ref(0);
  const username = ref<string>("");

  const studentInfo = ref({
    name: "",
    professional: "",
    role: "",
    sex: "",
    studentId: ""
  });
  const teacherInfo = ref({
    name: "",
    professional: "",
    role: "",
    sex: "",
    teacherId: ""
  });

  const permissionStore = usePermissionStore();
  const tagsViewStore = useTagsViewStore();
  const settingsStore = useSettingsStore();

  /** 设置角色数组 */
  const setRoles = (value: string[] | any) => {
    roles.value = value;
  };
  /** 登录 */
  const login = async ({ username, password }: LoginRequestData, role: number) => {
    if (role === STUDENT) {
      await studentLoginAPI({ studentId: username, studentPassword: password }).then((res) => {
        const cookieString = document.cookie;
        const cookies = cookieString.split("; ");
        const cookieMap: any = {};
        cookies.forEach((cookie) => {
          const [name, value] = cookie.split("=");
          cookieMap[name] = value;
        });
        console.log(cookieString, cookies, cookieMap);
        studentInfo.value = { ...res.data };
        setRoles(studentInfo.value.role);
        setToken("1");
      });
      return Promise.resolve("success");
    } else {
      await teacherLoginAPI({ teacherId: username, teacherPassword: password }).then((res) => {
        const cookieString = document.cookie;
        const cookies = cookieString.split("; ");
        const cookieMap: any = {};
        cookies.forEach((cookie) => {
          const [name, value] = cookie.split("=");
          cookieMap[name] = value;
        });
        console.log(cookieString, cookies, cookieMap);
        teacherInfo.value = { ...res.data };
        setRoles(studentInfo.value.role);
        setToken("1");
      });
      return Promise.resolve("success");
    }
  };
  /** 获取用户详情 */
  const getInfo = async () => {
    if (roles.value === STUDENT) {
      const { data } = await studentInfoAPI();
      studentInfo.value = { ...data };
    } else {
      const { data } = await teacherInfoAPI();
      teacherInfo.value = { ...data };
    }
  };
  /** 切换角色 */
  const changeRoles = async (role: string) => {
    const newToken = "token-" + role;
    token.value = newToken;
    setToken(newToken);
    await getInfo();
    permissionStore.setRoutes();
    resetRouter();
    permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
      router.addRoute(item);
    });
    _resetTagsView();
  };

  /* 注册 */
  const register = async (res: RegisterRequestData, role: number) => {
    console.log(res, role);
    if (role === STUDENT) {
      const data = await studentRegisterAPI({
        ...res,
        studentId: res.id,
        studentPassword: res.password
      });

      console.log(data);
    } else {
      const data = await teacherRegisterAPI({
        ...res,
        studentId: res.id,
        studentPassword: res.password
      });
      console.log(data);
    }
  };

  /** 登出 */
  const logout = () => {
    removeToken();
    token.value = "";
    roles.value = 0;
    resetRouter();
    _resetTagsView();
  };
  /** 重置 Token */
  const resetToken = () => {
    removeToken();
    token.value = "";
    roles.value = 0;
  };
  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews();
      tagsViewStore.delAllCachedViews();
    }
  };

  return {
    token,
    roles,
    username,
    setRoles,
    login,
    getInfo,
    changeRoles,
    logout,
    resetToken,
    register
  };
});

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store);
}

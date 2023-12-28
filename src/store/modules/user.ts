import { ref } from "vue";
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
import { studentLoginAPI, studentRegisterAPI } from "@/api/student";
import { STUDENT } from "@/constants/state";
import { teacherRegisterAPI } from "@/api/teacher";

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "");
  const roles = ref<string[]>([]);
  const username = ref<string>("");

  const permissionStore = usePermissionStore();
  const tagsViewStore = useTagsViewStore();
  const settingsStore = useSettingsStore();

  /** 设置角色数组 */
  const setRoles = (value: string[]) => {
    roles.value = value;
  };
  /** 登录 */
  const login = async ({ username, password, code }: LoginRequestData, role: number) => {
    // const { data } = await studentLoginAPI({ studentId: username, studenetPassword: password });
    const { data } = await loginApi({ username, password, code })
    setToken(data.token)
    token.value = data.token
  };
  /** 获取用户详情 */
  const getInfo = async () => {
    const { data } = await getUserInfoApi();
    username.value = data.username;
    // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
    roles.value = data.roles?.length > 0 ? data.roles : routeSettings.defaultRoles;
  };
  /** 切换角色 */
  const changeRoles = async (role: string) => {
    const newToken = "token-" + role;
    token.value = newToken;
    setToken(newToken);
    await getInfo();
    permissionStore.setRoutes(roles.value);
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
    roles.value = [];
    resetRouter();
    _resetTagsView();
  };
  /** 重置 Token */
  const resetToken = () => {
    removeToken();
    token.value = "";
    roles.value = [];
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

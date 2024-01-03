/** 统一处理 Cookie */

import CacheKey from "@/constants/cache-key";
import Cookies from "js-cookie";

export const getToken = () => {
  console.log('getToken', Cookies.get())
  return Cookies.get(CacheKey.TOKEN);
};
export const setToken = (token: string) => {
  console.log(Cookies.get(token), CacheKey.TOKEN, document.cookie);
  // Cookies.set(CacheKey.TOKEN, token);
};
export const removeToken = () => {
  Cookies.remove(CacheKey.TOKEN);
};

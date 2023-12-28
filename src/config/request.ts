import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import { get, merge } from "lodash-es";

import { useUserStoreHook } from "@/store/modules/user";
import { getToken } from "@/utils/cache/cookies";

const abortControllerMap: Map<string, AbortController> = new Map();

function logout() {
  useUserStoreHook().logout();
  location.reload();
}

/** 创建请求实例 */
function createService() {
  // 创建一个 axios 实例命名为 service
  const service = axios.create({
    // baseURL: import.meta.env.VITE_BASE_API,
    responseType: "json"
  });
  // 请求拦截
  service.interceptors.request.use(
    (config) => {
      const controller = new AbortController();
      const url = config.url || "";
      config.signal = config.signal;
      abortControllerMap.set(url, controller);
      return config;
    },
    // 发送失败
    (error) => Promise.reject(error)
  );
  // 响应拦截（可根据具体业务作出相应的调整）
  service.interceptors.response.use(
    (response) => {
      const url = response.config.url || "";
      abortControllerMap.delete(url);

      // apiData 是 api 返回的数据
      const apiData = response.data;
      // 二进制数据则直接返回
      const responseType = response.request?.responseType;
      if (responseType === "blob" || responseType === "arraybuffer") return apiData;
      // 这个 code 是和后端约定的业务 code
      // const code = apiData.code;
      // 如果没有 code, 代表这不是项目后端开发的 api
      // if (code === undefined) {
      //   ElMessage.error("非本系统的接口");
      //   return Promise.reject(new Error("非本系统的接口"));
      // }
      // switch (code) {
      //   case 0:
      //     // 本系统采用 code === 0 来表示没有业务错误
      //     return apiData;
      //   case 401:
      //     // Token 过期时
      //     return logout();
      //   default:
      //     // 不是正确的 code
      //     ElMessage.error(apiData.message || "Error");
      //     return Promise.reject(new Error("Error"));
      // }
    },
    (error) => {
      // status 是 HTTP 状态码
      // const url = error.config.url || "";
      // abortControllerMap.delete(url);
      const status = get(error, "response.status");
      switch (status) {
        case 400:
          error.message = "请求错误";
          break;
        case 401:
          // Token 过期时
          logout();
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求地址出错";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器内部错误";
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP 版本不受支持";
          break;
        default:
          break;
      }
      ElMessage.error(error.message);
      return Promise.reject(error);
    }
  );
  return service;
}

/** 创建请求方法 */
function createRequest(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const token = getToken();
    const defaultConfig = {
      headers: {
        // 携带 Token
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json"
      },
      timeout: 5000,
      baseURL: import.meta.env.VITE_BASE_API,
      data: {}
    };
    // 将默认配置 defaultConfig 和传入的自定义配置 config 进行合并成为 mergeConfig
    const mergeConfig = merge(defaultConfig, config);
    return service(mergeConfig);
  };
}

function cancelRequest(url: string | string[]) {
  const urlList = Array.isArray(url) ? url : [url];
  for (const _url of urlList) {
    abortControllerMap.get(_url)?.abort();
    abortControllerMap.delete(_url);
  }
}

function cancelAllRequest() {
  for (const [_, controller] of abortControllerMap) {
    controller.abort();
  }
  abortControllerMap.clear();
}

/** 用于网络请求的实例 */
const service = createService();
/** 用于网络请求的方法 */
export const request = createRequest(service);

export default {
  get: <T = any>(option: AxiosConfig) => {
    return request({ method: "get", ...option }) as Promise<ApiResponseData<T>>;
  },
  post: <T = any>(option: AxiosConfig) => {
    return request({ method: "post", ...option }) as Promise<ApiResponseData<T>>;
  },
  delete: <T = any>(option: AxiosConfig) => {
    return request({ method: "delete", ...option }) as Promise<ApiResponseData<T>>;
  },
  put: <T = any>(option: AxiosConfig) => {
    return request({ method: "put", ...option }) as Promise<ApiResponseData<T>>;
  },
  cancelRequest: (url: string | string[]) => {
    return cancelRequest(url);
  },
  cancelALlRequest: () => {
    return cancelAllRequest();
  }
};

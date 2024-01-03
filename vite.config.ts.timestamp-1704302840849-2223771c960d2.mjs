// vite.config.ts
import { loadEnv } from "file:///D:/code/%E8%BD%AF%E5%B7%A5/zzk/node_modules/.pnpm/vite@5.0.8_@types+node@20.10.4_sass@1.69.5/node_modules/vite/dist/node/index.js";
import path, { resolve } from "path";
import vue from "file:///D:/code/%E8%BD%AF%E5%B7%A5/zzk/node_modules/.pnpm/@vitejs+plugin-vue@4.5.2_vite@5.0.8_vue@3.3.11/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/code/%E8%BD%AF%E5%B7%A5/zzk/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.0.8_vue@3.3.11/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///D:/code/%E8%BD%AF%E5%B7%A5/zzk/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.0.8/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import svgLoader from "file:///D:/code/%E8%BD%AF%E5%B7%A5/zzk/node_modules/.pnpm/vite-svg-loader@5.1.0_vue@3.3.11/node_modules/vite-svg-loader/index.js";
import UnoCSS from "file:///D:/code/%E8%BD%AF%E5%B7%A5/zzk/node_modules/.pnpm/unocss@0.58.0_postcss@8.4.32_vite@5.0.8/node_modules/unocss/dist/vite.mjs";
var __vite_injected_original_dirname = "D:\\code\\\u8F6F\u5DE5\\zzk";
var vite_config_default = (configEnv) => {
  console.log("configEnv", configEnv);
  const viteEnv = loadEnv(configEnv.mode, process.cwd());
  const { VITE_PUBLIC_PATH } = viteEnv;
  return {
    /** 打包时根据实际情况修改 base */
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        "@": resolve(__vite_injected_original_dirname, "./src")
      }
    },
    server: {
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true,
      // host: "0.0.0.0"
      /** 端口号 */
      port: 3333,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      /** 接口代理 */
      proxy: {
        "/api": {
          target: "http://120.79.99.70:7777/api",
          ws: true,
          /** 是否允许跨域 */
          changeOrigin: true,
          rewrite(path2) {
            console.log(path2.replace(/^\/api/, ""));
            return path2.replace(/^\/api/, "");
          }
        }
      },
      /** 预热常用文件，提高初始页面加载速度 */
      warmup: {
        clientFiles: ["./src/layouts/**/*.vue"]
      }
    },
    build: {
      /** 单个 chunk 文件的大小超过 2048KB 时发出警告 */
      chunkSizeWarningLimit: 2048,
      /** 禁用 gzip 压缩大小报告 */
      reportCompressedSize: false,
      /** 打包后静态资源目录 */
      assetsDir: "static",
      rollupOptions: {
        output: {
          /**
           * 分块策略
           * 1. 注意这些包名必须存在，否则打包会报错
           * 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
           */
          manualChunks: {
            vue: ["vue", "vue-router", "pinia"],
            element: ["element-plus", "@element-plus/icons-vue"],
            vxe: ["vxe-table", "vxe-table-plugin-element", "xe-utils"]
          }
        }
      }
    },
    /** 混淆器 */
    esbuild: {
      /** 打包时移除 console.log */
      pure: ["console.log"],
      /** 打包时移除 debugger */
      drop: ["debugger"],
      /** 打包时移除所有注释 */
      legalComments: "none"
    },
    /** Vite 插件 */
    plugins: [
      vue(),
      vueJsx(),
      /** 将 SVG 静态图转化为 Vue 组件 */
      svgLoader({ defaultImport: "url" }),
      /** SVG */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
        symbolId: "icon-[dir]-[name]"
      }),
      /** UnoCSS */
      UnoCSS()
    ],
    /** Vitest 单元测试配置：https://cn.vitest.dev/config */
    test: {
      include: ["tests/**/*.test.ts"],
      environment: "jsdom"
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXFx1OEY2Rlx1NURFNVxcXFx6emtcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcXHU4RjZGXHU1REU1XFxcXHp6a1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZS8lRTglQkQlQUYlRTUlQjclQTUvenprL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxyXG5cclxuaW1wb3J0IHsgdHlwZSBDb25maWdFbnYsIHR5cGUgVXNlckNvbmZpZ0V4cG9ydCwgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCJcclxuaW1wb3J0IHBhdGgsIHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCJcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCJcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiXHJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLXN2Zy1pY29uc1wiXHJcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSBcInZpdGUtc3ZnLWxvYWRlclwiXHJcbmltcG9ydCBVbm9DU1MgZnJvbSBcInVub2Nzcy92aXRlXCJcclxuXHJcbi8qKiBcdTkxNERcdTdGNkVcdTk4NzlcdTY1ODdcdTY4NjNcdUZGMUFodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnICovXHJcbmV4cG9ydCBkZWZhdWx0IChjb25maWdFbnY6IENvbmZpZ0Vudik6IFVzZXJDb25maWdFeHBvcnQgPT4ge1xyXG4gIGNvbnNvbGUubG9nKCdjb25maWdFbnYnLCBjb25maWdFbnYpO1xyXG4gIGNvbnN0IHZpdGVFbnYgPSBsb2FkRW52KGNvbmZpZ0Vudi5tb2RlLCBwcm9jZXNzLmN3ZCgpKSBhcyBJbXBvcnRNZXRhRW52XHJcbiAgY29uc3QgeyBWSVRFX1BVQkxJQ19QQVRIIH0gPSB2aXRlRW52XHJcbiAgcmV0dXJuIHtcclxuICAgIC8qKiBcdTYyNTNcdTUzMDVcdTY1RjZcdTY4MzlcdTYzNkVcdTVCOUVcdTk2NDVcdTYwQzVcdTUxQjVcdTRGRUVcdTY1MzkgYmFzZSAqL1xyXG4gICAgYmFzZTogVklURV9QVUJMSUNfUEFUSCxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAvKiogQCBcdTdCMjZcdTUzRjdcdTYzMDdcdTU0MTEgc3JjIFx1NzZFRVx1NUY1NSAqL1xyXG4gICAgICAgIFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIC8qKiBcdThCQkVcdTdGNkUgaG9zdDogdHJ1ZSBcdTYyNERcdTUzRUZcdTRFRTVcdTRGN0ZcdTc1MjggTmV0d29yayBcdTc2ODRcdTVGNjJcdTVGMEZcdUZGMENcdTRFRTUgSVAgXHU4QkJGXHU5NUVFXHU5ODc5XHU3NkVFICovXHJcbiAgICAgIGhvc3Q6IHRydWUsIC8vIGhvc3Q6IFwiMC4wLjAuMFwiXHJcbiAgICAgIC8qKiBcdTdBRUZcdTUzRTNcdTUzRjcgKi9cclxuICAgICAgcG9ydDogMzMzMyxcclxuICAgICAgLyoqIFx1NjYyRlx1NTQyNlx1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1NkQ0Rlx1ODlDOFx1NTY2OCAqL1xyXG4gICAgICBvcGVuOiBmYWxzZSxcclxuICAgICAgLyoqIFx1OERFOFx1NTdERlx1OEJCRVx1N0Y2RVx1NTE0MVx1OEJCOCAqL1xyXG4gICAgICBjb3JzOiB0cnVlLFxyXG4gICAgICAvKiogXHU3QUVGXHU1M0UzXHU4OEFCXHU1MzYwXHU3NTI4XHU2NUY2XHVGRjBDXHU2NjJGXHU1NDI2XHU3NkY0XHU2M0E1XHU5MDAwXHU1MUZBICovXHJcbiAgICAgIHN0cmljdFBvcnQ6IGZhbHNlLFxyXG4gICAgICAvKiogXHU2M0E1XHU1M0UzXHU0RUUzXHU3NDA2ICovXHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgXCIvYXBpXCI6IHtcclxuICAgICAgICAgIHRhcmdldDogXCJodHRwOi8vMTIwLjc5Ljk5LjcwOjc3NzcvYXBpXCIsXHJcbiAgICAgICAgICB3czogdHJ1ZSxcclxuICAgICAgICAgIC8qKiBcdTY2MkZcdTU0MjZcdTUxNDFcdThCQjhcdThERThcdTU3REYgKi9cclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgIHJld3JpdGUocGF0aCkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sXCJcIikpXHJcbiAgICAgICAgICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sXCJcIilcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICAvKiogXHU5ODg0XHU3MEVEXHU1RTM4XHU3NTI4XHU2NTg3XHU0RUY2XHVGRjBDXHU2M0QwXHU5QUQ4XHU1MjFEXHU1OUNCXHU5ODc1XHU5NzYyXHU1MkEwXHU4RjdEXHU5MDFGXHU1RUE2ICovXHJcbiAgICAgIHdhcm11cDoge1xyXG4gICAgICAgIGNsaWVudEZpbGVzOiBbXCIuL3NyYy9sYXlvdXRzLyoqLyoudnVlXCJdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICAvKiogXHU1MzU1XHU0RTJBIGNodW5rIFx1NjU4N1x1NEVGNlx1NzY4NFx1NTkyN1x1NUMwRlx1OEQ4NVx1OEZDNyAyMDQ4S0IgXHU2NUY2XHU1M0QxXHU1MUZBXHU4QjY2XHU1NDRBICovXHJcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMjA0OCxcclxuICAgICAgLyoqIFx1Nzk4MVx1NzUyOCBnemlwIFx1NTM4Qlx1N0YyOVx1NTkyN1x1NUMwRlx1NjJBNVx1NTQ0QSAqL1xyXG4gICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXHJcbiAgICAgIC8qKiBcdTYyNTNcdTUzMDVcdTU0MEVcdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTc2RUVcdTVGNTUgKi9cclxuICAgICAgYXNzZXRzRGlyOiBcInN0YXRpY1wiLFxyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFx1NTIwNlx1NTc1N1x1N0I1Nlx1NzU2NVxyXG4gICAgICAgICAgICogMS4gXHU2Q0U4XHU2MTBGXHU4RkQ5XHU0RTlCXHU1MzA1XHU1NDBEXHU1RkM1XHU5ODdCXHU1QjU4XHU1NzI4XHVGRjBDXHU1NDI2XHU1MjE5XHU2MjUzXHU1MzA1XHU0RjFBXHU2MkE1XHU5NTE5XHJcbiAgICAgICAgICAgKiAyLiBcdTU5ODJcdTY3OUNcdTRGNjBcdTRFMERcdTYwRjNcdTgxRUFcdTVCOUFcdTRFNDkgY2h1bmsgXHU1MjA2XHU1MjcyXHU3QjU2XHU3NTY1XHVGRjBDXHU1M0VGXHU0RUU1XHU3NkY0XHU2M0E1XHU3OUZCXHU5NjY0XHU4RkQ5XHU2QkI1XHU5MTREXHU3RjZFXHJcbiAgICAgICAgICAgKi9cclxuICAgICAgICAgIG1hbnVhbENodW5rczoge1xyXG4gICAgICAgICAgICB2dWU6IFtcInZ1ZVwiLCBcInZ1ZS1yb3V0ZXJcIiwgXCJwaW5pYVwiXSxcclxuICAgICAgICAgICAgZWxlbWVudDogW1wiZWxlbWVudC1wbHVzXCIsIFwiQGVsZW1lbnQtcGx1cy9pY29ucy12dWVcIl0sXHJcbiAgICAgICAgICAgIHZ4ZTogW1widnhlLXRhYmxlXCIsIFwidnhlLXRhYmxlLXBsdWdpbi1lbGVtZW50XCIsIFwieGUtdXRpbHNcIl1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKiogXHU2REY3XHU2REM2XHU1NjY4ICovXHJcbiAgICBlc2J1aWxkOiB7XHJcbiAgICAgIC8qKiBcdTYyNTNcdTUzMDVcdTY1RjZcdTc5RkJcdTk2NjQgY29uc29sZS5sb2cgKi9cclxuICAgICAgcHVyZTogW1wiY29uc29sZS5sb2dcIl0sXHJcbiAgICAgIC8qKiBcdTYyNTNcdTUzMDVcdTY1RjZcdTc5RkJcdTk2NjQgZGVidWdnZXIgKi9cclxuICAgICAgZHJvcDogW1wiZGVidWdnZXJcIl0sXHJcbiAgICAgIC8qKiBcdTYyNTNcdTUzMDVcdTY1RjZcdTc5RkJcdTk2NjRcdTYyNDBcdTY3MDlcdTZDRThcdTkxQ0EgKi9cclxuICAgICAgbGVnYWxDb21tZW50czogXCJub25lXCJcclxuICAgIH0sXHJcbiAgICAvKiogVml0ZSBcdTYzRDJcdTRFRjYgKi9cclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgdnVlKCksXHJcbiAgICAgIHZ1ZUpzeCgpLFxyXG4gICAgICAvKiogXHU1QzA2IFNWRyBcdTk3NTlcdTYwMDFcdTU2RkVcdThGNkNcdTUzMTZcdTRFM0EgVnVlIFx1N0VDNFx1NEVGNiAqL1xyXG4gICAgICBzdmdMb2FkZXIoeyBkZWZhdWx0SW1wb3J0OiBcInVybFwiIH0pLFxyXG4gICAgICAvKiogU1ZHICovXHJcbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuICAgICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInNyYy9pY29ucy9zdmdcIildLFxyXG4gICAgICAgIHN5bWJvbElkOiBcImljb24tW2Rpcl0tW25hbWVdXCJcclxuICAgICAgfSksXHJcbiAgICAgIC8qKiBVbm9DU1MgKi9cclxuICAgICAgVW5vQ1NTKClcclxuICAgIF0sXHJcbiAgICAvKiogVml0ZXN0IFx1NTM1NVx1NTE0M1x1NkQ0Qlx1OEJENVx1OTE0RFx1N0Y2RVx1RkYxQWh0dHBzOi8vY24udml0ZXN0LmRldi9jb25maWcgKi9cclxuICAgIHRlc3Q6IHtcclxuICAgICAgaW5jbHVkZTogW1widGVzdHMvKiovKi50ZXN0LnRzXCJdLFxyXG4gICAgICBlbnZpcm9ubWVudDogXCJqc2RvbVwiXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxTQUFnRCxlQUFlO0FBQy9ELE9BQU8sUUFBUSxlQUFlO0FBQzlCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sWUFBWTtBQVJuQixJQUFNLG1DQUFtQztBQVd6QyxJQUFPLHNCQUFRLENBQUMsY0FBMkM7QUFDekQsVUFBUSxJQUFJLGFBQWEsU0FBUztBQUNsQyxRQUFNLFVBQVUsUUFBUSxVQUFVLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFDckQsUUFBTSxFQUFFLGlCQUFpQixJQUFJO0FBQzdCLFNBQU87QUFBQTtBQUFBLElBRUwsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBO0FBQUEsUUFFTCxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ2pDO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBO0FBQUEsTUFFTixNQUFNO0FBQUE7QUFBQTtBQUFBLE1BRU4sTUFBTTtBQUFBO0FBQUEsTUFFTixNQUFNO0FBQUE7QUFBQSxNQUVOLE1BQU07QUFBQTtBQUFBLE1BRU4sWUFBWTtBQUFBO0FBQUEsTUFFWixPQUFPO0FBQUEsUUFDTCxRQUFRO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixJQUFJO0FBQUE7QUFBQSxVQUVKLGNBQWM7QUFBQSxVQUNkLFFBQVFBLE9BQU07QUFDVixvQkFBUSxJQUFJQSxNQUFLLFFBQVEsVUFBUyxFQUFFLENBQUM7QUFDckMsbUJBQU9BLE1BQUssUUFBUSxVQUFTLEVBQUU7QUFBQSxVQUNuQztBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUE7QUFBQSxNQUVBLFFBQVE7QUFBQSxRQUNOLGFBQWEsQ0FBQyx3QkFBd0I7QUFBQSxNQUN4QztBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQU87QUFBQTtBQUFBLE1BRUwsdUJBQXVCO0FBQUE7QUFBQSxNQUV2QixzQkFBc0I7QUFBQTtBQUFBLE1BRXRCLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFNTixjQUFjO0FBQUEsWUFDWixLQUFLLENBQUMsT0FBTyxjQUFjLE9BQU87QUFBQSxZQUNsQyxTQUFTLENBQUMsZ0JBQWdCLHlCQUF5QjtBQUFBLFlBQ25ELEtBQUssQ0FBQyxhQUFhLDRCQUE0QixVQUFVO0FBQUEsVUFDM0Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsU0FBUztBQUFBO0FBQUEsTUFFUCxNQUFNLENBQUMsYUFBYTtBQUFBO0FBQUEsTUFFcEIsTUFBTSxDQUFDLFVBQVU7QUFBQTtBQUFBLE1BRWpCLGVBQWU7QUFBQSxJQUNqQjtBQUFBO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUE7QUFBQSxNQUVQLFVBQVUsRUFBRSxlQUFlLE1BQU0sQ0FBQztBQUFBO0FBQUEsTUFFbEMscUJBQXFCO0FBQUEsUUFDbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxlQUFlLENBQUM7QUFBQSxRQUN2RCxVQUFVO0FBQUEsTUFDWixDQUFDO0FBQUE7QUFBQSxNQUVELE9BQU87QUFBQSxJQUNUO0FBQUE7QUFBQSxJQUVBLE1BQU07QUFBQSxNQUNKLFNBQVMsQ0FBQyxvQkFBb0I7QUFBQSxNQUM5QixhQUFhO0FBQUEsSUFDZjtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K

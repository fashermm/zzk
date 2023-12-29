<!-- 登录组件 -->
<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { type FormInstance, type FormRules } from "element-plus";
import { User, Lock, Key, Picture, Loading } from "@element-plus/icons-vue";
import { getLoginCodeApi } from "@/api/login";
import { type LoginRequestData } from "@/api/login/types/login";
import { STUDENT } from "@/constants/state";

const userStore = useUserStore();

const props = defineProps({
  role: Number
});

const router = useRouter();

/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null);

/** 登录按钮 Loading */
const loading = ref(false);
/** 验证码图片 URL */
const codeUrl = ref("");
/** 登录表单数据 */
const loginFormData: LoginRequestData = reactive({
  username: "admin",
  password: "12345678",
});
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [{ message: "请输入账号", trigger: "blur" }],
  password: [
    { message: "请输入密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
};
/** 登录逻辑 */
const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      loading.value = true;
      userStore
        .login(loginFormData, props.role!)
        .then(() => {
          console.log('success')
          router.push({ path: "/" });
        })
        .catch(() => {
          // createCode();
          loginFormData.password = "";
        })
        .finally(() => {
          loading.value = false;
        });
    } else {
      console.error("表单校验不通过", fields);
    }
  });
};
/** 创建验证码 */
// const createCode = () => {
//   // 先清空验证码的输入
//   // loginFormData.code = "";
//   // 获取验证码
//   codeUrl.value = "";
//   getLoginCodeApi().then((res) => {
//     codeUrl.value = res.data;
//   });
// };

/** 初始化验证码 */
// createCode();

/* 暴露方法 */
defineExpose({
  handleLogin
});
</script>

<template>
  <div>
    <el-form
      ref="loginFormRef"
      :model="loginFormData"
      label-width="auto"
      :rules="loginFormRules"
      @keyup.enter="handleLogin"
    >
      <el-form-item prop="username" :label="props.role === STUDENT ? '学生学号' : '教师工号'">
        <el-input
          v-model.trim="loginFormData.username"
          placeholder="用户名"
          type="text"
          tabindex="1"
          :prefix-icon="User"
          size="large"
        />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          v-model.trim="loginFormData.password"
          placeholder="密码"
          type="password"
          tabindex="2"
          :prefix-icon="Lock"
          size="large"
          show-password
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<style></style>

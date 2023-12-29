<!-- 注册组件 -->

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { type FormInstance, type FormRules } from "element-plus";
import { Picture, Loading } from "@element-plus/icons-vue";
import { getLoginCodeApi } from "@/api/login";
import { type RegisterRequestData } from "@/api/login/types/login";
import { STUDENT } from "@/constants/state";

const props = defineProps({
  role: Number
});
const emits = defineEmits(["jumpToLogin"]);

const userStore = useUserStore();

/** 注册表单元素的引用 */
const registerFormRef = ref<FormInstance | null>(null);

/** 注册按钮 Loading */
const loading = ref(false);
/** 验证码图片 URL */
const codeUrl = ref("");
/** 注册表单数据 */
const registerFormDataDefault: RegisterRequestData = {
  id: "",
  name: "",
  sex: "",
  colleges: "",
  professional: "",
  password: "",
  checkPassword: "",
};
const registerFormData = reactive({ ...registerFormDataDefault });
/** 注册表单校验规则 */
const registerFormRules: FormRules = {
  id: [{ required: true, message: "请输入账号", trigger: "blur" }],
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  sex: [{ message: "请输入性别", trigger: "blur" }] /* student */,
  colleges: [{ message: "请输入所属学院", trigger: "blur" }] /* teacher */,
  professional: [{ required: true, message: "请输入专业", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  checkPassword: [{ required: true, message: "再次确认密码", trigger: "blur" }],
};
/** 注册逻辑 */
const handleRegister = () => {
  registerFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      loading.value = true;
      userStore
        .register(registerFormData, props.role!)
        .then(() => {
          /* 注册完成 */
          emits("jumpToLogin");
        })
        .catch(() => {
          // createCode();
          registerFormData.password = "";
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
//   registerFormData.code = "";
//   // 获取验证码
//   codeUrl.value = "";
//   getLoginCodeApi().then((res) => {
//     codeUrl.value = res.data;
//   });
// };

// /** 初始化验证码 */
// createCode();

/* 暴露方法 */
defineExpose({
  handleRegister
});
</script>

<template>
  <div>
    <el-form
      ref="registerFormRef"
      :model="registerFormData"
      label-width="auto"
      :rules="registerFormRules"
      @keyup.enter="handleRegister"
    >
      <el-form-item prop="id" :label="props.role === STUDENT ? '学生学号' : '教师工号'">
        <el-input v-model.trim="registerFormData.id" placeholder="学号/工号" type="text" tabindex="1" size="large" />
      </el-form-item>
      <el-form-item prop="name" label="姓名">
        <el-input v-model.trim="registerFormData.name" placeholder="姓名" type="text" tabindex="1" size="large" />
      </el-form-item>
      <el-form-item v-if="role === STUDENT" prop="sex" label="性别">
        <el-input v-model.trim="registerFormData.sex" placeholder="性别" type="text" tabindex="1" size="large" />
      </el-form-item>
      <el-form-item v-else prop="colleges" label="学院">
        <el-input v-model.trim="registerFormData.colleges" placeholder="学院" type="text" tabindex="1" size="large" />
      </el-form-item>
      <el-form-item prop="professional" label="专业">
        <el-input
          v-model.trim="registerFormData.professional"
          placeholder="专业"
          type="text"
          tabindex="1"
          size="large"
        />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          v-model.trim="registerFormData.password"
          placeholder="密码"
          type="password"
          tabindex="2"
          size="large"
          show-password
        />
      </el-form-item>
      <el-form-item prop="checkPassword" label="再次输入密码">
        <el-input
          v-model.trim="registerFormData.checkPassword"
          placeholder="确认密码"
          type="text"
          tabindex="1"
          size="large"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<style></style>

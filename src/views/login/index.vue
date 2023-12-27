<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { TEACHER, STUDENT } from "@/constants/state"
import Login from "./Login.vue"
import Register from "./Register.vue"

const router = useRouter()
/* 登录组件 */
const loginRef = ref<any>(null)
/* 组测组件 */
const registerRef = ref<any>(null)

/** 登录按钮 Loading */
const loading = ref(false)
const role = ref(STUDENT)
const isLogin = ref(true)

const changeRole = () => {
  role.value = role.value === STUDENT ? TEACHER : STUDENT
}

const changeModel = () => {
  isLogin.value = !isLogin.value
}

const jumpToLogin = () => {
  isLogin.value = true
}

const handleRegister = () => {
  registerRef.value.handleRegister()
}
const handleLogin = () => {
  loginRef.value.handleLogin()
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="title">校园签到系统</div>
      <div class="content">
        <template v-if="isLogin">
          <Login ref="loginRef" :role="role"></Login>
        </template>
        <template v-else>
          <Register ref="registerRef" :role="role" @jump-to-login="jumpToLogin"></Register>
        </template>
        <div class="content-login-config">
          <el-button type="primary" link @click="changeRole">切换身份</el-button>
          <el-button type="primary" link @click="changeModel">注册账号</el-button>
        </div>
        <el-button v-if="isLogin" :loading="loading" type="primary" size="large" @click.prevent="handleLogin">{{
          role === STUDENT ? "学生登录" : "教师登录"
        }}</el-button>
        <el-button v-else :loading="loading" type="primary" size="large" @click.prevent="handleRegister">{{
          role === STUDENT ? "学生注册" : "教师注册"
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }
  .login-card {
    width: 480px;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;
    overflow: hidden;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      font-size: 2rem;
      font-weight: 600;
      // img {
      //   height: 100%;
      // }
    }
    .content {
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
      .content-login-config {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { STUDENT, TEACHER } from "@/constants/state";
import { useUserStore } from "@/store/modules/user";
import { showMessage } from "@/utils/showMessage";
import { nextTick } from "vue";
import { reactive, ref, onMounted } from "vue";

const isActive = ref(true);
const userStore = useUserStore();

const role = userStore.roles;

const userForm = ref<any>({
  name: "",
  sex: "",
  professional: "",
  studentId: "",
  teacherId: ""
});

const pwdForm = ref({
  newPassword: "",
  checkPassword: ""
});

const btn = ref({
  userInfoLoading: false,
  pwdLoading: false
});

const handleUpdateUserInfo = () => {
  if (role === STUDENT) {
    /** STUDENT */
    userStore
      .updateInfo({
        name: userForm.value.name,
        studentId: userForm.value.studentId,
        professional: userForm.value.professional
      })
      .then(() => {
        userStore.getInfo();
      });
  } else {
    /** TEACHER */
    userStore
      .updateInfo({
        name: userForm.value.name,
        teacherId: userForm.value.teacherId,
        professional: userForm.value.professional
      })
      .then(() => {
        userStore.getInfo();
      });
  }
};
const handleUpdateUserPwd = () => {
  userStore
    .changePwd({
      newPassword: pwdForm.value.newPassword,
      checkPassword: pwdForm.value.checkPassword
    })
    .then(() => {
      showMessage("密码修改成功", "success");
    });
};

onMounted(async () => {
  if (role === STUDENT) {
    // userStore.getInfo()
    if (!userStore.studentInfo.studentId) {
      await userStore.getInfo();
    }
    userForm.value = userStore.studentInfo;
    console.log(userForm, userStore.studentInfo);
  } else {
    if (!userStore.teacherInfo.teacherId) {
      await userStore.getInfo();
    }
    userForm.value = userStore.teacherInfo;
  }
  await nextTick();
});
</script>

<template>
  <div style="width: 100%">
    <div class="user-wrap">
      <div class="user-tags-wrap">
        <div class="user-tags">
          <div :class="{ active: isActive }" @click="isActive = true">个人信息</div>
          <div :class="{ active: !isActive }" @click="isActive = false">密码修改</div>
        </div>
      </div>
      <div class="user-content mt-2 mb-2">
        <el-form v-if="isActive" :model="userForm" label-width="100px">
          <el-form-item label="姓名" prop="name">
            <el-input
              size="small"
              type="text"
              style="width: 12rem"
              placeholder="姓名"
              v-model="userForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="role === STUDENT" label="学号" prop="studentId">
            <el-input
              size="small"
              type="text"
              style="width: 12rem"
              placeholder="学号"
              disabled
              v-model="userForm.studentId"
            ></el-input>
          </el-form-item>
          <el-form-item v-else label="教师工号" prop="colleges">
            <el-input
              size="small"
              type="text"
              style="width: 12rem"
              placeholder="教师工号"
              disabled
              v-model="userForm.teacherId"
            ></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="professional">
            <el-input
              size="small"
              type="text"
              style="width: 12rem"
              placeholder="专业"
              v-model="userForm.professional"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" :loading="btn.userInfoLoading" @click="handleUpdateUserInfo"
              >保存
            </el-button>
          </el-form-item>
        </el-form>
        <el-form v-else :model="pwdForm" label-width="100px">
          <!-- <el-form-item label="旧密码" prop="old_pwd">
            <el-input
              size="small"
              type="password"
              autocomplete="off"
              style="width: 12rem"
              placeholder="旧密码"
              show-password
              v-model="pwdForm.old_pwd"
            ></el-input>
          </el-form-item> -->
          <el-form-item label="新密码" prop="new_pwd">
            <el-input
              size="small"
              type="password"
              autocomplete="off"
              style="width: 12rem"
              placeholder="新密码"
              show-password
              v-model="pwdForm.newPassword"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirm_new_pwd">
            <el-input
              size="small"
              type="password"
              autocomplete="off"
              style="width: 12rem"
              placeholder="确认新密码"
              show-password
              v-model="pwdForm.checkPassword"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" :loading="btn.pwdLoading" @click="handleUpdateUserPwd"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-wrap {
  width: 100%;
  // margin: 2rem;
  // margin: 1rem 1rem 0 0;
  background-color: white;
  .user-tags-wrap {
    width: 100%;
    height: 2.5rem;
    background-color: #f5f7fa;
    padding: 0;
    border: 1px #e4e7ed solid;
    .user-tags {
      display: flex;
      flex-direction: row;
      height: 100%;
      div {
        padding: 0.5rem 1rem 0.5rem 1rem;
      }
      .active {
        color: #409eff;
        background-color: #fff;
        border-bottom: #fff !important;
        border-left: #e4e7ed;
        border-right: #e4e7ed;
      }
    }
  }
  .user-content {
    background-color: white;
    // margin: 2rem;
  }
}
</style>

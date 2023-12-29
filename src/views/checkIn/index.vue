<script setup lang="ts">
import { ref } from "vue";
import { TEACHER, STUDENT } from "@/constants/state";
import { lessonData } from "../lesson/data";

const tableData = lessonData;
const checkInTypeList = [
  {
    type: "点击签到",
    key: 0
  },
  {
    type: "签到码签到",
    key: 1
  }
];

const role = ref(TEACHER);
const showPublishDialog = ref(false);
const showCheckInDetailDialog = ref(false);
const lesson = ref({});
const checkInTypeKey = ref();
const startCheckInTime = ref("");
const endCheckInTime = ref("");

const changeRole = () => {
  role.value = role.value === STUDENT ? TEACHER : STUDENT;
};

const openPublishCheckIn = () => {
  showPublishDialog.value = true;
};

const openCheckInDetail = () => {
  showCheckInDetailDialog.value = true;
};
const deleteCheckIn = () => {};
const cancelDelete = () => {};
</script>

<template>
  <div>
    <div>
      <div>
        <el-button @click="changeRole">TEST</el-button>
        <el-button v-if="role === TEACHER" @click="openPublishCheckIn">发布签到</el-button>
      </div>
      <div v-if="role === TEACHER" class="table1">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="className" label="签到标题" />
          <el-table-column prop="teacherName" label="老师名字" />
          <el-table-column prop="courseName" label="课程名称" />
          <el-table-column prop="" label="开设时间" />
          <el-table-column prop="" label="结束时间" />
          <el-table-column label="操作">
            <template #default>
              <el-button link size="small" @click="openCheckInDetail()" class="button1">详情</el-button>
              <el-popconfirm title="是否删除该签到记录？" @confirm="deleteCheckIn" @cancel="cancelDelete">
                <template #reference>
                  <el-button link type="danger" size="small" class="button2">删除 </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else class="table1">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="className" label="签到标题" />
          <el-table-column prop="teacherName" label="老师名字" />
          <el-table-column prop="courseName" label="课程名称" />
          <el-table-column prop="" label="开设时间" />
          <el-table-column prop="" label="结束时间" />
          <el-table-column prop="" label="签到状态" />
        </el-table>
      </div>
    </div>
    <el-dialog v-model="showPublishDialog" title="发布签到" style="width: 25rem">
      <el-form label-width="auto">
        <div class="flex flex-col items-center">
          <el-form-item label="课程名" prop="name">
            <el-select v-model="lesson" placeholder="请选择课程" style="width: 12rem">
              <!-- <el-option label="Options1" value="1" />
            <el-option label="Options2" value="2" /> -->
            </el-select>
          </el-form-item>
          <el-form-item label="签到方式">
            <el-select v-model="checkInTypeKey" placeholder="请选择签到方式" style="width: 12rem">
              <el-option
                v-for="checkInType in checkInTypeList"
                :label="checkInType.type"
                :value="checkInType.key"
                :key="checkInType.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间" prop="zone">
            <!-- <el-input style="width: 12rem"></el-input> -->
            <el-date-picker v-model="startCheckInTime" type="datetime" style="width: 12rem" placeholder="开始时间" />
          </el-form-item>
          <el-form-item label="结束时间" prop="time">
            <!-- <el-input style="width: 12rem"></el-input> -->
            <el-date-picker v-model="endCheckInTime" type="datetime" style="width: 12rem" placeholder="结束时间" />
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showPublishDialog = false">取消</el-button>
          <el-button type="primary" @click="showPublishDialog = false">发布</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="showCheckInDetailDialog" title="签到详情">
      <div>
        <div>
          <el-tag :style="{ marginRight: '6px' }" type="success">{{ "已签到: 0人" }}</el-tag>
          <el-tag :style="{ marginRight: '6px' }" type="danger">{{ "未签到: 0人" }}</el-tag>
        </div>
        <el-table>
          <el-table-column prop="" label="学生姓名" width="180" />
          <el-table-column prop="" label="签到时间" width="180" />
          <el-table-column prop="" label="签到状态" />
        </el-table>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showCheckInDetailDialog = false"> 取消 </el-button>
          <el-button type="primary" @click="showCheckInDetailDialog = false"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.body {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  .addCourse {
    margin-bottom: 10px;
  }
  .button1 {
    color: var(--v3-tagsview-tag-text-color);
  }
  .button2 {
    background-color: #f56c6c;
    color: white;
    :hover {
      background-color: #b25252;
    }
  }
}
.el-button.is-link {
  padding: 10px;
  margin-right: 10px;
  font-weight: 700;
}
.el-button.is-link:first-child {
  border: 1px solid var(--v3-tagsview-tag-border-color);
}

.el-table .cell:last-child {
  text-align: center;
}
.el-button.is-link:not(.is-disabled):focus,
.el-button.is-link:not(.is-disabled):hover {
  background-color: #b25252 !important;
  border: 1px solid #b25252;
  color: white;
}
.el-button.is-link:not(.is-disabled):first-child:focus,
.el-button.is-link:first-child:hover {
  border: 1px solid #409eff !important;
  background-color: white !important;
  color: #409eff;
}
</style>

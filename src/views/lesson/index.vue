<script setup lang="ts">
import { reactive, ref } from "vue";
import { lessonData } from "./data";
import { STUDENT, TEACHER } from "@/constants/state";

const tableData = lessonData;
const role = ref(TEACHER);

//开设课程弹窗
const showAddCourseDialog = ref(false);
const showEditCourseDialog = ref(false);
const showJoinCourseDialog = ref(false);
const formLabelWidth = "140px";

const form = reactive({
  classId: "",
  className: "",
  studentName: "",
  teacherName: "",
  courseName: "",
  timeYear: "",
  timeXuegi: ""
});
const editLessonForm = reactive({
  newCourseName: "",
  newCourseTimeYear: "",
  newCourseTimeXueqi: ""
});

const changeRole = () => {
  role.value = role.value === STUDENT ? TEACHER : STUDENT;
};

/**
 * @description teacher
 */

const confirmDelete = () => {
  alert("删除成功！！"); //还得写一个删除事件
};
const cancelDelete = () => {
  alert("取消删除");
};
const changeEditDialog = (flag: undefined | boolean = undefined) => {
  if (flag !== undefined) {
    showEditCourseDialog.value = flag;
  } else {
    showEditCourseDialog.value = !showEditCourseDialog.value;
  }
};
const addLesson = () => {};
const editLesson = () => {};

/**
 * @description student
 */
const openJoinDialog = () => {
  showJoinCourseDialog.value = true;
};
const JoinLesson = () => {
  showJoinCourseDialog.value = false;
};
</script>

<template>
  <div class="body">
    <div class="addCourse">
      <el-button v-if="role === TEACHER" @click="showAddCourseDialog = true" type="primary"> 开设课程 </el-button>
      <el-button v-else type="primary" @click="openJoinDialog">加入班级</el-button>
    </div>
    <el-button @click="changeRole">Test</el-button>
    <div v-if="role === TEACHER" class="table1">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="classId" label="班级编号" />
        <el-table-column prop="className" label="班级名字" />
        <el-table-column prop="studentName" label="学生名字" />
        <el-table-column prop="teacherName" label="老师名字" />
        <el-table-column prop="courseName" label="课程名称" />
        <el-table-column prop="timeYear" label="开设学年" />
        <el-table-column prop="timeXuegi" label="开设学期" />
        <el-table-column prop="" label="操作">
          <template #default>
            <el-button link size="small" @click="changeEditDialog()" class="button1">编辑</el-button>
            <el-popconfirm title="确认取消开设该课程？" @confirm="confirmDelete" @cancel="cancelDelete">
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
        <el-table-column fixed prop="classId" label="班级编号" />
        <el-table-column prop="className" label="班级名字" />
        <el-table-column prop="studentName" label="学生名字" />
        <el-table-column prop="teacherName" label="老师名字" />
        <el-table-column prop="courseName" label="课程名称" />
        <el-table-column prop="timeYear" label="开设学年" />
        <el-table-column prop="timeXuegi" label="开设学期" />
        <el-table-column label="操作">
          <template #default>
            <el-button link size="small" @click="changeEditDialog()" class="button1">编辑</el-button>
            <el-popconfirm title="确认取消开设该课程？" @confirm="confirmDelete" @cancel="cancelDelete">
              <template #reference>
                <el-button link type="danger" size="small" class="button2">删除 </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="showAddCourseDialog" title="新增课程" style="width: 30rem">
      <el-form :model="form">
        <el-form-item label="班级编号" :label-width="formLabelWidth">
          <el-input v-model="form.classId" style="width: 12rem" autocomplete="off" />
        </el-form-item>
        <el-form-item label="班级名字" :label-width="formLabelWidth">
          <el-input v-model="form.className" style="width: 12rem" autocomplete="off" />
        </el-form-item>
        <el-form-item label="教师名字" :label-width="formLabelWidth">
          <el-input v-model="form.teacherName" style="width: 12rem" autocomplete="off" />
        </el-form-item>
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="form.courseName" style="width: 12rem" autocomplete="off" />
        </el-form-item>
        <el-form-item label="开设学年" :label-width="formLabelWidth">
          <el-input v-model="form.timeYear" style="width: 12rem" autocomplete="off" />
        </el-form-item>
        <el-form-item label="开设学期" :label-width="formLabelWidth">
          <el-input v-model="form.timeXuegi" style="width: 12rem" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAddCourseDialog = false"> 取消 </el-button>
          <el-button type="primary" @click="addLesson"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="showEditCourseDialog" title="新增课程" style="width: 30rem">
      <el-form :model="editLessonForm">
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input
            v-model="editLessonForm.newCourseName"
            style="width: 12rem"
            placeholder="请输入课程名"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="开设学年" :label-width="formLabelWidth">
          <el-input
            v-model="editLessonForm.newCourseTimeYear"
            style="width: 12rem"
            placeholder="请输入开设学年"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="开设学期" :label-width="formLabelWidth">
          <el-input
            v-model="editLessonForm.newCourseTimeXueqi"
            style="width: 12rem"
            placeholder="请输入开设学期"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showEditCourseDialog = false"> 取消 </el-button>
          <el-button type="primary" @click="editLesson"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="showJoinCourseDialog" title="加入课程" style="width: 30rem">
      <el-form :model="editLessonForm">
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input
            v-model="editLessonForm.newCourseName"
            style="width: 12rem"
            placeholder="搜索课程名"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="任教老师" :label-width="formLabelWidth">
          <el-input
            v-model="editLessonForm.newCourseTimeYear"
            style="width: 12rem"
            disabled
            placeholder="任教老师"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="开设学年-学期" :label-width="formLabelWidth">
          <el-input v-model="editLessonForm.newCourseTimeXueqi" style="width: 12rem" disabled autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showJoinCourseDialog = false"> 取消 </el-button>
          <el-button type="primary" @click="JoinLesson"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style>
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

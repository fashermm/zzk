<script setup lang="ts">
import { reactive, ref } from "vue";
const tableData = [
  {
    classId: "123456",
    className: "物联网二班",
    studentName: "小明",
    teacherName: "张三",
    courseName: "软件工程",
    timeYear: "2020-12-25",
    timeXuegi: "6"
  },
  {
    classId: "123456",
    className: "物联网二班",
    studentName: "小明",
    teacherName: "张三",
    courseName: "软件工程",
    timeYear: "2020-12-25",
    timeXuegi: "6"
  },
  {
    classId: "123456",
    className: "物联网二班",
    studentName: "小明",
    teacherName: "张三",
    courseName: "软件工程",
    timeYear: "2020-12-25",
    timeXuegi: "6"
  },
  {
    classId: "123456",
    className: "物联网二班",
    studentName: "小明",
    teacherName: "张三",
    courseName: "软件工程",
    timeYear: "2020-12-25",
    timeXuegi: "6"
  },
  {
    classId: "123456",
    className: "物联网二班",
    studentName: "小明",
    teacherName: "张三",
    courseName: "软件工程",
    timeYear: "2020-12-25",
    timeXuegi: "6"
  },
  {
    classId: "123456",
    className: "物联网二班",
    studentName: "小明",
    teacherName: "张三",
    courseName: "软件工程",
    timeYear: "2020-12-25",
    timeXuegi: "6"
  },
  {
    classId: "123456",
    className: "物联网二班",
    studentName: "小明",
    teacherName: "张三",
    courseName: "软件工程",
    timeYear: "2020-12-25",
    timeXuegi: "6"
  },
  {
    classId: "123456",
    className: "物联网二班",
    studentName: "小明",
    teacherName: "张三",
    courseName: "软件工程",
    timeYear: "2020-12-25",
    timeXuegi: "6"
  },
  {
    classId: "123456",
    className: "物联网二班",
    studentName: "小明",
    teacherName: "张三",
    courseName: "软件工程",
    timeYear: "2020-12-25",
    timeXuegi: "6"
  },
  {
    classId: "123456",
    className: "物联网二班",
    studentName: "小明",
    teacherName: "张三",
    courseName: "软件工程",
    timeYear: "2020-12-25",
    timeXuegi: "6"
  },
  {
    classId: "123456",
    className: "物联网二班",
    studentName: "小明",
    teacherName: "张三",
    courseName: "软件工程",
    timeYear: "2020-12-25",
    timeXuegi: "6"
  },
  {
    classId: "123456",
    className: "物联网二班",
    studentName: "小明",
    teacherName: "张三",
    courseName: "软件工程",
    timeYear: "2020-12-25",
    timeXuegi: "6"
  },
  {
    classId: "123456",
    className: "物联网二班",
    studentName: "小明",
    teacherName: "张三",
    courseName: "软件工程",
    timeYear: "2020-12-25",
    timeXuegi: "6"
  },
  {
    classId: "123456",
    className: "物联网二班",
    studentName: "小明",
    teacherName: "张三",
    courseName: "软件工程",
    timeYear: "2020-12-25",
    timeXuegi: "6"
  }
];
// const handleClick=()=>{
//
// }
const confirmEvent = () => {
  alert("删除成功！！"); //还得写一个删除事件
};
const cancelEvent = () => {
  alert("取消删除");
};
//开设课程弹窗
const dialogFormVisible = ref(false);
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
</script>

<template>
  <div class="body">
    <div class="addCourse">
      <el-button text @click="dialogFormVisible = true">
        <h3>开设课程</h3>
      </el-button>
      <el-dialog v-model="dialogFormVisible" title="新增课程">
        <el-form :model="form">
          <el-form-item label="班级编号" :label-width="formLabelWidth">
            <el-input v-model="form.classId" autocomplete="off" />
          </el-form-item>
          <el-form-item label="班级名字" :label-width="formLabelWidth">
            <el-input v-model="form.className" autocomplete="off" />
          </el-form-item>
          <el-form-item label="教师名字" :label-width="formLabelWidth">
            <el-input v-model="form.teacherName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="课程名称" :label-width="formLabelWidth">
            <el-input v-model="form.courseName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="开设学年" :label-width="formLabelWidth">
            <el-input v-model="form.timeYear" autocomplete="off" />
          </el-form-item>
          <el-form-item label="开设学期" :label-width="formLabelWidth">
            <el-input v-model="form.timeXuegi" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogFormVisible = false"> Confirm </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div class="table1">
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
            <el-button link size="small" @click="handleClick" class="button1">编辑</el-button>
            <el-popconfirm title="Are you sure to delete this?" @confirm="confirmEvent" @cancel="cancelEvent">
              <template #reference>
                <el-button link type="danger" size="small" class="button2">删除 </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
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

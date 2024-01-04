<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { lessonData } from "./data";
import { STUDENT, TEACHER } from "@/constants/state";
import { useLessonStore } from "@/store/modules/lesson";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/modules/user";
import { showMessage } from "@/utils/showMessage";



// const tableData = lessonData;

const userStore = useUserStore();
const lessonStore = useLessonStore();
const { lessonList } = storeToRefs(lessonStore);
const role = userStore.roles;

//开设课程弹窗
const showAddCourseDialog = ref(false);
const showEditCourseDialog = ref(false);
const showJoinCourseDialog = ref(false);
const formLabelWidth = "140px";

const joinLessonForm = reactive({
  teacherName: "",
  className: "",
})
const lessonForm = reactive({
  name: "",
  timeYear: "",
  timeXueqi: "",
  // teacherName: "",
});
const editLessonForm = reactive({
  className: "",
  newCourseName: "",
  newCourseTimeYear: "",
  newCourseTimeXueqi: "",
});


const changeRole = () => {
  // role = role === STUDENT ? TEACHER : STUDENT;
};

/**
 * @description teacher
 */

const confirmDeleteLesson = (className: any) => {
  // alert("删除成功！！"); //还得写一个删除事件
  // console.log("confirm del", data);
  lessonStore.deleteLesson({ className }).then(() => {
    showMessage("移除成功", "success");
    getLesson();
  });
};

const cancelDelete = () => {
  console.log("取消删除");
};

const changeEditDialog = (flag: undefined | boolean = undefined, className: any) => {
  console.log(className)
  editLessonForm.className = className
  if (flag !== undefined) {
    showEditCourseDialog.value = flag;
  } else {
    showEditCourseDialog.value = !showEditCourseDialog.value;
  }
};
const getLesson = () => {
  lessonStore.clearLessonList();
  lessonStore.getLesson();
}
const addLesson = () => {
  console.log("addLesson", lessonForm);
  lessonStore.createLesson(lessonForm).then(() => {
    showMessage('开设成功', 'success');
    showAddCourseDialog.value = false;
    lessonForm.name = "";
    lessonForm.timeXueqi = "";
    lessonForm.timeYear = "";
    getLesson();
  })
};
// 测试用
const editLessonForm1 = ref({
  className: "abc",
  newCourseName: "软工1",
  newCourseTimeYear: "2025",
  newCourseTimeXueqi: "下"
});

const editLesson = () => {
  lessonStore.editLesson(editLessonForm).then(() => {
    showEditCourseDialog.value = false;
    showMessage('编辑成功', 'success');
    getLesson();
  });
  console.log(editLessonForm1.value)
};

/**
 * @description student
 */
const openJoinDialog = () => {
  showJoinCourseDialog.value = true;
};

const joinLesson = () => {
  showJoinCourseDialog.value = false;
  lessonStore.joinLesson({ ...joinLessonForm }).then(() => {
    showMessage("加入班级成功", "success");
    getLesson();
  });
};

const confirmQuit = (className: any) => {
  lessonStore.quitLesson({ className }).then(() => {
    showMessage("退出班级成功", "success");
    getLesson();
  });
};

const cancelExit = () => {
  // showEditCourseDialog.value = false;
};

onMounted(async () => {
  if (!lessonList.value || !lessonList.value.length) {
    // console.log("onMounted", role);
    lessonStore.clearLessonList();
    await lessonStore.getLesson();
    console.log('onMounted', lessonList);
  }
});
</script>

<template>
  <div class="body">
    <div class="addCourse">
      <el-button v-if="role === TEACHER" @click="showAddCourseDialog = true" type="primary"> 开设课程 </el-button>
      <el-button v-else type="primary" @click="openJoinDialog">加入班级</el-button>
    </div>
    <!-- <el-button @click="changeRole">Test</el-button> -->
    <div v-if="role === TEACHER" class="table1">
      <el-table :data="lessonList" style="width: 100%">
        <el-table-column fixed prop="classId" label="班级编号" />
        <el-table-column prop="name" label="课程名称" />
        <el-table-column prop="teacherName" label="老师名字" />
        <el-table-column prop="timeYear" label="开设学年" />
        <el-table-column prop="timeXueqi" label="开设学期" />
        <el-table-column prop="" label="操作">
          <template #default="scope">
            <el-button link size="small" @click="changeEditDialog(true, scope.row.name)" class="button1">编辑</el-button>
            <el-popconfirm title="确认取消该课程？" @confirm="confirmDeleteLesson(scope.row.name)" @cancel="cancelDelete">
              <template #reference>
                <el-button link type="danger" size="small" class="button2">删除 </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else class="table1">
      <el-table :data="lessonList" style="width: 100%">
        <el-table-column fixed prop="classId" label="班级编号" />
        <el-table-column prop="name" label="课程名称" />
        <el-table-column prop="teacherName" label="老师名字" />
        <el-table-column prop="timeYear" label="开设学年" />
        <el-table-column prop="timeXueqi" label="开设学期" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-popconfirm title="确认退出该课程？" @confirm="confirmQuit(scope.row.className)" @cancel="cancelExit">
              <template #reference>
                <el-button link type="danger" size="small" class="button2"> 退出 </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="showAddCourseDialog" title="新增课程" style="width: 30rem">
      <el-form :model="lessonForm">
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="lessonForm.name" style="width: 12rem" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item label="教师" :label-width="formLabelWidth">
          <el-input v-model="lessonForm.teacherName" style="width: 12rem" autocomplete="off" />
        </el-form-item> -->
        <el-form-item label="开设学年" :label-width="formLabelWidth">
          <el-input v-model="lessonForm.timeYear" style="width: 12rem" autocomplete="off" />
        </el-form-item>
        <el-form-item label="开设学期" :label-width="formLabelWidth">
          <el-input v-model="lessonForm.timeXueqi" style="width: 12rem" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAddCourseDialog = false"> 取消 </el-button>
          <el-button type="primary" @click="addLesson"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="showEditCourseDialog" title="编辑课程" style="width: 30rem">
      <el-form :model="editLessonForm">
        <el-form-item label="旧的课程名称" :label-width="formLabelWidth">
          <el-input v-model="editLessonForm.className" style="width: 12rem" disabled autocomplete="off" />
        </el-form-item>
        <el-form-item label="新的课程名称" :label-width="formLabelWidth">
          <el-input v-model="editLessonForm.newCourseName" style="width: 12rem" placeholder="请输入课程名" autocomplete="off" />
        </el-form-item>
        <el-form-item label="开设学年" :label-width="formLabelWidth">
          <el-input v-model="editLessonForm.newCourseTimeYear" style="width: 12rem" placeholder="请输入开设学年"
            autocomplete="off" />
        </el-form-item>
        <el-form-item label="开设学期" :label-width="formLabelWidth">
          <el-input v-model="editLessonForm.newCourseTimeXueqi" style="width: 12rem" placeholder="请输入开设学期"
            autocomplete="off" />
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
          <el-input v-model="joinLessonForm.className" style="width: 12rem" placeholder="请输入课程名" autocomplete="off" />
        </el-form-item>
        <el-form-item label="任教老师" :label-width="formLabelWidth">
          <el-input v-model="joinLessonForm.teacherName" style="width: 12rem" placeholder="任教老师" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showJoinCourseDialog = false"> 取消 </el-button>
          <el-button type="primary" @click="joinLesson"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
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

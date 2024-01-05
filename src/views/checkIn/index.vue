<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { TEACHER, STUDENT, TRIGGERCHECK, CODECHECK } from "@/constants/state";
// import { lessonData } from "../lesson/data";
import { useUserStore } from "@/store/modules/user";
import { useCheckInStore } from "@/store/modules/checkIn";
import { showMessage } from "@/utils/showMessage";
import { storeToRefs } from "pinia";
import { useLessonStore } from "@/store/modules/lesson";

const userStore = useUserStore();
const lessonStore = useLessonStore();
const checkInStore = useCheckInStore();

const checkInTypeList = [
  {
    type: "点击签到",
    key: TRIGGERCHECK
  },
  {
    type: "签到码签到",
    key: CODECHECK
  }
];

const role = userStore.roles;
const { checkInRecords, studentListRecords, studentCheckInfo } = storeToRefs(checkInStore);
const { lessonList } = storeToRefs(lessonStore)
const checkNum = computed(() => {
  return studentListRecords.value.filter((item: any) => {
    item?.status && item?.status === "已签到";
  }).length;
});

const checkCode = ref("");
const showCheckInDialog = ref(false); // 签到弹窗
const showPublishDialog = ref(false);
const showCheckInDetailDialog = ref(false);
const lesson = ref("");
const checkInTypeKey = ref();
const startCheckInTime = ref("");
const endCheckInTime = ref("");
const className = ref("");

const checkIn = (className: string, teacherName: string) => {
  try {
    checkInStore.checkIn({ className, teacherName })
      .then(() => {
        showCheckInDialog.value = false;
        checkCode.value = "";
        showMessage("签到成功", "success");
      }).then(() => {
        checkInStore.getCheckInfoByStudent();
      });
  } catch {
    showMessage("签到失败", "error");
  }
};

const publishCheckIn = () => {
  if (checkInTypeKey.value !== CODECHECK) {
    checkCode.value = '';
  }
  checkInStore.publishCheck({ className: className.value, code: checkCode.value }).then((res) => {
    console.log(res, 'checkInStore');
    showPublishDialog.value = false;
    checkInStore.getCheckInfoRecords({ className: className.value }).then(() => {
      showMessage('发布成功', 'success')
    })
  });
};

const openPublishCheckIn = () => {
  showPublishDialog.value = true;
};

const openCheckInDetail = () => {
  showCheckInDetailDialog.value = true;
  // 获取该次签到详细情况
  checkInStore.getCheckInfoByTeacher();
};

const deleteCheckIn = (idx: any) => {
  console.log(idx);
  checkInStore.deleteCheck(idx);
};

const openCheckIn = (className: string, teacherName: string) => {
  // if (type === TRIGGERCHECK) {
  //   checkCode.value = "";
  //   checkIn();
  // } else {
  //  
  // }
  showCheckInDialog.value = true;
  checkIn(className, teacherName);
};

const handleClassSelect = () => {
  // debugger;
  checkInStore.getCheckInfoRecords({ className: className.value }).then(() => {
    showMessage('查询成功', 'success')
  })
}

const cancelDelete = () => { };

onMounted(async () => {
  if (role === TEACHER) {
    if (!lessonList.value || !lessonList.value.length) {
      lessonStore.clearLessonList();
      await lessonStore.getLesson();
      console.log('onMounted', lessonList);
    }
  } else {
    if (!studentCheckInfo.value || !studentCheckInfo.value.length) {
      checkInStore.clearStudentCheckInfo();
      await checkInStore.getCheckInfoByStudent();
    }
  }
})
</script>

<template>
  <div>
    <div>
      <div>
        <el-button v-if="role === TEACHER" @click="openPublishCheckIn">发布签到</el-button>
        <el-select v-if="role === TEACHER" v-model="className" placeholder="请选择" @change="handleClassSelect">
          <el-option v-for="(lesson, index) in (lessonList as any)" :label="lesson.name" :value="lesson.name"
            :key="lesson.name">
          </el-option>
        </el-select>
      </div>
      <div v-if="role === TEACHER" class="table1">
        <el-table :data="checkInRecords" style="width: 100%">
          <el-table-column prop="className" label="课程名称" />
          <el-table-column prop="signTime" label="签到时间" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button link size="small" @click="openCheckInDetail()" class="button1">详情</el-button>
              <el-popconfirm title="是否删除该签到记录？" @confirm="deleteCheckIn(scope.$index)" @cancel="cancelDelete">
                <template #reference>
                  <el-button link type="danger" size="small" class="button2">删除 </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else class="table1">
        <el-table :data="studentCheckInfo" style="width: 100%">
          <el-table-column prop="className" label="课程名字" />
          <el-table-column prop="teacherName" label="老师名字" />
          <el-table-column prop="signTime" label="签到时间" />
          <el-table-column prop="signStatus" label="签到状态" />
          <el-table-column prop="" label="操作">
            <template #default="scope">
              <el-button size="small" type="primary" @click="openCheckIn(scope.row.className, scope.row.teacherName)"
                :disabled="scope.row.signStatus === '已签到'">签到
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog v-model="showPublishDialog" title="发布签到" style="width: 25rem">
      <el-form label-width="auto">
        <div class="flex flex-col items-center">
          <el-form-item label="课程名" prop="name">
            <el-input v-model="lesson" placeholder="课程名" style="width: 12rem"> </el-input>
          </el-form-item>
          <el-form-item label="签到方式">
            <el-select v-model="checkInTypeKey" placeholder="请选择签到方式" style="width: 12rem">
              <el-option v-for="checkInType in checkInTypeList" :label="checkInType.type" :value="checkInType.key"
                :key="checkInType.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="签到码" v-if="checkInTypeKey === CODECHECK">
            <el-input v-model="checkCode" placeholder="签到码" style="width: 12rem"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showPublishDialog = false">取消</el-button>
          <el-button type="primary" @click="publishCheckIn">发布</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="showCheckInDetailDialog" title="签到详情">
      <div>
        <div>
          <el-tag :style="{ marginRight: '6px' }" type="success">{{ `已签到: ${checkNum}人` }}</el-tag>
          <el-tag :style="{ marginRight: '6px' }" type="danger">{{
            `未签到: ${studentListRecords.length - checkNum}人`
          }}</el-tag>
        </div>
        <el-table :data="studentListRecords">
          <el-table-column prop="studentName" label="学生姓名" width="180" />
          <el-table-column prop="timeYear" label="签到时间" width="180" />
          <el-table-column prop="timeXuegi" label="签到状态" />
        </el-table>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showCheckInDetailDialog = false"> 取消 </el-button>
          <el-button type="primary" @click="showCheckInDetailDialog = false"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="showCheckInDialog" title="签到" style="width: 20rem">
      <div class="flex flex-row">
        <span>签到码：</span>
        <el-input v-model="checkCode" style="width: 12rem" placeholder="输入签到码"></el-input>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showCheckInDialog = false"> 取消 </el-button>
          <el-button type="primary" @click="checkIn"> 签到 </el-button>
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

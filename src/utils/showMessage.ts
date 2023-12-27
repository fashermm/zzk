import { ElMessage } from "element-plus"

export function showMessage(message: string, type: any) {
  ElMessage({
    showClose: true,
    message: message,
    type: type,
    duration: 3000
  })
}

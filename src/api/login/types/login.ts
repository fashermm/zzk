export interface LoginRequestData {
  /** admin 或 editor */
  username: string
  /** 密码 */
  password: string
}

export interface RegisterRequestData {
  checkPassword: string;
  name: string;
  professional: string;
  [property: string]: any;
}

export interface StudentRegisterRequest extends RegisterRequestData {
  studentId: number;
  studentPassword: string;
  sex: string;
}

export interface TeacherRegisterRequest extends RegisterRequestData {
  teacherId: number;
  teacherPassword: string;
  colleges: string;
}

export type LoginCodeResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<{ token: string }>

export type UserInfoResponseData = ApiResponseData<{ username: string; roles: string[] }>

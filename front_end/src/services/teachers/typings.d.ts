/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace TeacherUserAPI {

  // 单条用户信息
  type TeacherUserInfo = {
    id: number,
    username: string,
    role: string,
    avatar: string,
    nickname: string,
    ifAccept: number,
  }

  // teacher user list result
  type TeacherUserListResult = {
    code: string,
    message: string,
    data: teacherUserInfo[],
  }

  type TeacherAuditParam = {
    id: number,
    ifAccept: number,
  }

  type TeacherAuditResult={
    code:string,
    message:string
  }
}

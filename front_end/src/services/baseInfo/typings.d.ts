/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace BaseInfoAPI {

  // 单条教室信息
  type ClassroomInfo = {
    id: number,
    buildingId: string,
    floor: number,
    classroomName?: string,
  }

  // 获取目标教学楼教室列表返回值
  type ClassroomListResult = {
    code: string,
    message: string,
    data: ClassroomInfo[]
  }

  // 获取教室信息返回值
  type ClassroomInfoResult = {
    code: string,
    message: string,
    data: ClassroomInfo
  }

  // 获取目标教室可预约节次返回值
  type ClassroomTimeListResult = {
    code: string,
    message: string,
    data: {
      available: number[]
    }
  }
}

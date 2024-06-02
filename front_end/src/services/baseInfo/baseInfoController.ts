/* eslint-disable */
import { request } from '@umijs/max';

const infoUrl = 'http://localhost:8080/info'

// 获取目标教学楼教室列表 GET 方法 查询参数buildingId
export function getRoomListByBuildingId(buildingId: number, options?: { [key: string]: any }) {
  return request<BaseInfoAPI.ClassroomListResult>(infoUrl + '/rooms', {
    method: 'GET',
    params: buildingId,
    ...(options || {}),
  });
}

// 获取教室信息 GET 方法 查询参数classroomId
export function getRoomInfoByRoomId(classroomId: number, options?: { [key: string]: any }) {
  return request<BaseInfoAPI.ClassroomInfoResult>(infoUrl + '/classroom', {
    method: 'GET',
    params: classroomId,
    ...(options || {}),
  });
}

// 获取目标教室可预约节次 GET 方法 查询参数:classroomId, date
export function getRoomTimeListByRoomIdAndDate(classroomId: number, date: string, options?: { [key: string]: any }) {
  return request<BaseInfoAPI.ClassroomTimeListResult>(infoUrl + '/available', {
    method: 'GET',
    params: {
      classroomId,
      date,
    },
    ...(options || {}),
  });
}

// 获取所有教室列表 GET 方法
export function getClassroomList(options?: { [key: string]: any }) {
  return request<BaseInfoAPI.ClassroomListResult>(infoUrl + '/rooms', {
    method: 'GET',
    ...(options || {}),
  });
}
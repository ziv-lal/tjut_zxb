/* eslint-disable */
import { request } from '@umijs/max';

const adminUrl = 'http://localhost:8080/usr'

// 获取teacher user列表
export function teacherUserList(options?: { [key: string]: any }) {
  return request<TeacherUserAPI.TeacherUserListResult>(adminUrl + '/list', {
    method: 'GET',
    ...(options || {}),
  });
}

export function teacherAudit(body:TeacherUserAPI.TeacherAuditParam, options?: { [key: string]: any }) {
  return request<TeacherUserAPI.TeacherAuditResult>(adminUrl + '/audit', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
    ...(options || {}),
  });
}
/* eslint-disable */
import { request } from '@umijs/max';

const applyUrl = 'http://localhost:8080/apply'

// 获取预约列表
export function pageList(body: ApplyAPI.ApplyQueryParams, options?: { [key: string]: any }) {
  return request<ApplyAPI.ApplyListResult>(applyUrl + '/pageList', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
    ...(options || {}),
  });
}

// 处理预约请求
export function cope(body: ApplyAPI.ApplyCopeParams, options?: { [key: string]: any }) {
  return request<ApplyAPI.ApplyCopeResult>(applyUrl + '/cope', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
    ...(options || {}),
  });
}

// 增加预约
export function add(body: ApplyAPI.ApplyAddParams, options?: { [key: string]: any }) {
  return request<ApplyAPI.ApplyAddResult>(applyUrl + '/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
    ...(options || {}),
  });
}
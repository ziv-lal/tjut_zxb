/* eslint-disable */
import { request } from '@umijs/max';

const configUrl = 'http://localhost:8080/cfg'

export function getConfig(options?: { [key: string]: any }) {
  return request<ConfigAPI.configResult>(configUrl + '/info', {
    method: 'GET',
    ...(options || {}),
  });
}

export function update(body:ConfigAPI.Config, options?: { [key: string]: any }) {
  return request<ConfigAPI.result>(configUrl + '/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
    ...(options || {}),
  });
}
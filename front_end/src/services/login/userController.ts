/* eslint-disable */
import { request } from '@umijs/max';

const userUrl = 'http://localhost:8080/usr'

// 登录请求
export function login(body: UserAPI.LoginParams, options?: { [key: string]: any }) {
  return request<UserAPI.LoginResult>(userUrl + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
    data: body,
    ...(options || {}),
  });
}

// 查询当前用户的信息
export function currentUser(options?: { [key: string]: any }) {
  return request<UserAPI.LoginResult>(userUrl + '/check', {
    method: 'GET',
    ...(options || {}),
  });
}

// 登出请求
export function logout(options?: { [key: string]: any }) {
  return request<UserAPI.LogoutResult>(userUrl + '/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

// 注册请求
export function register(body: UserAPI.RegisterParams, options?: { [key: string]: any }) {
  return request<UserAPI.RegisterResult>(userUrl + '/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
    ...(options || {}),
  });
}

// 修改用户信息
export function updateUserInfo(body: UserAPI.UserInfo, options?: { [key: string]: any }) {
  return request<UserAPI.LoginResult>(userUrl + '/updateInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
    ...(options || {}),
  });
}
// 修改用户密码
export function updatePassword(body: UserAPI.updatePasswordParam, options?: { [key: string]: any }) {
  return request<UserAPI.LoginResult>(userUrl + '/updatePassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
    ...(options || {}),
  });
}
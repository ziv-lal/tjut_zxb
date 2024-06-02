/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace UserAPI {

  // 当前用户信息
  type NowUserInfo = {
    userId? : number;
    nickname?: string;
    username?: string;
    role?: string;
    avatar?: string;
  }

  //登录参数列表
  interface LoginParams {
    /** 
     * login
     * method: POST
    */
    username: string,
    password: string,
    ifRemember: string
  }

  type UserInfo = {
    id: number,
    nickname: string,
    username: string,
    role: string | undefined,
    avatar: string
  }

  // login result
  type LoginResult = {
    code: string,
    message: string,
    data: UserInfo
  }

  interface LogoutResult {
    /**
     * logout
     * method: GET
     */
    code?: string;
    message?: string;
  }

  //注册参数列表
  interface RegisterParams {
    /** 
     * register
     * method: POST
    */
    nickname: string,
    username: string,
    password: string
    role: string
  }
  // register result
  type RegisterResult = {
    code: string,
    message: string,
    data: String,
  }

  // 修改密码
  type updatePasswordParam= {
    oldPassword:string,
    newPassword:string
  }
}

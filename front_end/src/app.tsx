// 运行时配置
import { extend } from 'umi-request'
import { useModel, history, RunTimeLayoutConfig, RequestConfig } from "@umijs/max";
import { currentUser } from "./services/login/userController";
import { AvatarDropdown } from "./components/AvatarDropDown";
import { message } from "antd";

const loginPath = '/login';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ 
  currentUser?: UserAPI.NowUserInfo;
  avatar?: string;
  loading?: boolean;
  fetchUserInfo?: () => Promise<UserAPI.NowUserInfo | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      console.log("刷新");
      //先检查是否存在登陆状态
      const res = await currentUser({skipErrorHandler: true});
      if (res.code != "00000") {
        message.error(res.message)
        history.push(loginPath);
        return undefined;
      }
      return res.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  //如果不是登陆页面
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      avatar: '',
    };
  }

  return {
    fetchUserInfo,
    avatar: '',
  };
}

export const layout: RunTimeLayoutConfig = ({initialState}) => {
  return {
    title: 'TJUT自习吧-教室管理系统',
    layout: 'mix',
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',

    avatarProps: {
      src: initialState?.avatar || undefined, //右上角头像
      title: initialState?.currentUser?.nickname || '用户', //右上角名称
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    logout(initialState) {
      message.info("OK, 退出成功");
    },
    menu: {
      locale: false,
    },
  };
};

// export const request = extend({
//   credentials:'include',
//   headers: { 'Content-Type': 'multipart/form-data' },
//   // requestType: 'form'
// })

export const request: RequestConfig = {
  withCredentials:true
}
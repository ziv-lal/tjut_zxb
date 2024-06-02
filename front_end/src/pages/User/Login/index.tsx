import {
    LockOutlined,
    MailOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProFormText,
    ProFormCheckbox,
} from '@ant-design/pro-components';
import { Card, Divider, Tabs, message } from 'antd';
import './index.css'
import { Link, history, useModel } from '@umijs/max';
import loginService from '@/services/login';
import { useState } from 'react';
import { flushSync } from 'react-dom';
import logoPng from '@/assets/aigic-logo-black.png'

export default () => {

    const { initialState, setInitialState } = useModel('@@initialState');

    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.();
        if (userInfo) {
            flushSync(() => {
                setInitialState((s) => ({
                ...s,
                avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                currentUser: userInfo,
                }));
            });
        }
    };

    const setUserInfo=(user: UserAPI.UserInfo) => {
        const currentUser: UserAPI.NowUserInfo = {
            userId: user.id,
            nickname: user.nickname,
            username: user.username,
            role: user.role,
        }
        setInitialState((s) => ({
            ...s,
            avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
            currentUser: currentUser,
        }));
    }


    const handleSubmit = async (values: UserAPI.LoginParams) => {
        try {
          // 登录
            const res = await loginService.LoginController.login({ ...values });
            if (res.code === '00000') {
                const defaultLoginSuccessMessage = '登陆成功!'
                message.success(defaultLoginSuccessMessage);
                // await fetchUserInfo();
                setUserInfo(res.data)
                const urlParams = new URL(window.location.href).searchParams;
                history.push(urlParams.get('redirect') || '/dashboard');
                return;
            }
            message.error(res.message);
        } catch (error) {
            const defaultLoginFailureMessage = "系统错误，登陆失败";
            console.log(error);
            message.error(defaultLoginFailureMessage);
        }
    };

    return (
        <>
            <div className='login-box'>
                <Card>
                    <LoginForm
                        logo={'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg'}
                        title="TJUT教室管理系统"
                        subTitle="欢迎登录"
                        actions={
                            <div >
                                <Link to='/register' style={{ float: 'right', marginBottom: '16px', }} >
                                    注册
                                </Link>
                            </div>
                        }
                        onFinish={async (values) => {
                            await handleSubmit(values as UserAPI.LoginParams);
                        }}
                    >
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <MailOutlined className={'prefixIcon'} />,
                            }}
                            placeholder="请输入用户名"
                            rules={[
                            {
                                required: true,
                                message: "用户名不能为空",
                            }
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'} />,
                            }}
                            placeholder="请输入密码"
                            rules={[
                            {
                                required: true,
                                message: "密码不能为空",
                            },
                            {
                                min: 3,
                                message: "密码长度不能小于3位",
                            }
                            ]}
                        />
                        <ProFormCheckbox noStyle name="ifRemember" >
                            记住我
                        </ProFormCheckbox>
                        <Divider />
                    </LoginForm>
                </Card>
            </div>
        </>
    );
};
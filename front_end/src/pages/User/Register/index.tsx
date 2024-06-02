
import { Card, Divider, Form, Input, Space, Image, Button, message } from 'antd';
import './index.css'
import { Link, history } from '@umijs/max';
import { useState } from 'react';
import loginService from '@/services/login';
import logoPng from '@/assets/aigic-logo-black.png'

export default () => {

    const nickName = "昵称"
    const username = "邮箱"
    const password = "密码"
    const confirmPassword = "确认密码"
    
    const nickNamePlaceholder = "请输入昵称"
    const nickNameNull = "昵称不能为空"
    const mailPlaceholder = "请输入邮箱"
    const mailNull = "邮箱不能为空"
    const mailError = "邮箱格式不正确"

    const passwordPlaceholder = "请输入密码"
    const passwordNull = "密码不能为空"
    const passwordConfirmPasswordPlaceholder = "请再次输入密码"
    const passwordConfirmPasswordError = "两次输入的密码不一致"

    const registerError = "注册失败"

    const handleSubmit = async (values: UserAPI.RegisterParams) => {
        console.log(values);
        try {
            // 注册
            const res = await loginService.LoginController.register({ ...values });
            if (res.code === '00000') {
                const defaultLoginSuccessMessage = '注册成功!请联系管理员审核通过后，方可登陆！'
                message.warning(defaultLoginSuccessMessage);
                const urlParams = new URL(window.location.href).searchParams;
                history.push(urlParams.get('redirect') || '/login');
                return;
            }
            message.error('邮箱地址已被注册');
        } catch (error) {
            const defaultLoginFailureMessage = "系统错误，注册失败";
            console.log(error);
            message.error(defaultLoginFailureMessage);
        }
    }

    return (
        <>
            <div className='register-box'>
                <Card style={{padding: '32px 24px'}}>
                    <Form layout="vertical" size='small' style={{width: 300}} onFinish={async (values)=>{await handleSubmit(values as UserAPI.RegisterParams)}} >
                        <Form.Item style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Space align='center' size={'middle'}>
                                <Image height={44} width={44} src={'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg'} />
                                <span className='register-form-title'>TJUT教室管理系统-教师注册</span>
                            </Space>
                            <div className='register-form-desc' style={{textAlign: 'center'}}>
                                <span>欢迎注册TJUT教室管理系统</span>
                            </div>
                        </Form.Item>
                        <Divider />
                        <Form.Item 
                            name="nickname" 
                            label={nickName} 
                            rules={[{ 
                                required: true,
                                message: nickNameNull,
                            }]}>
                            <Input placeholder={nickNamePlaceholder} />
                        </Form.Item>
                        <Form.Item 
                            name="username" 
                            label={username}
                            rules={[
                                { 
                                required: true,
                                message: mailNull,
                                },
                                {
                                // mail address verification
                                pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
                                message: mailError,
                            }]}>
                            <Input placeholder={mailPlaceholder} />
                        </Form.Item>
                        <Form.Item label={password} name="password" rules={[{ required: true, message: passwordNull }]}>
                            <Input.Password placeholder={passwordPlaceholder} />
                        </Form.Item>

                        {/* Field */}
                        <Form.Item
                            label={confirmPassword}
                            name="password2"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(passwordConfirmPasswordError));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder={passwordConfirmPasswordPlaceholder} />
                        </Form.Item>
                        <Divider />
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Submit
                            </Button>
                        </Form.Item>
                        <div >
                            <Link to='/login' style={{ float: 'right', marginBottom: '16px', }} >
                                去登陆
                            </Link>
                        </div>
                    </Form>
                </Card>
            </div>
        </>
    );
};
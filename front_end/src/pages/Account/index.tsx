import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Divider, Typography, Row, Col, Form, Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import loginService from '@/services/login';
import { useModel } from '@umijs/max';

export default function Account() {

    return (
        <>
            <Typography.Title level={1} style={{ margin: 0 }}>
                <UserOutlined /> 个人中心
            </Typography.Title>
            <Divider />
            <Row gutter={[16, 16]} >
                <Col span={24}>
                    <ProCard title="账户信息" tooltip='可以编辑' headerBordered>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <ProCard layout='center'>
                                    <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="头像" style={{ width: 150, height: 150, borderRadius: 50 }} />
                                </ProCard>
                            </Col>
                            <Col span={24}>
                                    <ProDescriptions 
                                        title="详细信息" 
                                        tooltip="点击可以进行编辑"
                                        layout='vertical'
                                        bordered
                                        request={async () => {
                                            const res = await loginService.LoginController.currentUser();
                                            return {
                                                data: res.data,
                                                success: res.code === '00000',
                                            }
                                        }}
                                        editable={{
                                            // 可以发请求保存信息
                                            onSave: async (keypath, newInfo, oriInfo) => {
                                                console.log(newInfo);
                                                const userInfo: UserAPI.UserInfo={
                                                    id: newInfo.id,
                                                    nickname: newInfo.nickname,
                                                    role: 'a',
                                                    username: newInfo.username,
                                                    avatar: newInfo.avatar
                                                }
                                                const res = await loginService.LoginController.updateUserInfo(userInfo);
                                                if (res.code === '00000') {
                                                    message.success(res.message);
                                                    return true;
                                                } else {
                                                    message.success(res.message);
                                                    return false;
                                                }
                                            },
                                        }}
                                    >
                                        <ProDescriptions.Item 
                                            label="ID"
                                            dataIndex={['userId']}
                                            editable={false}
                                            span={1}
                                        />
                                        <ProDescriptions.Item 
                                            label="昵称"
                                            formItemProps={{
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '此项为必填项',
                                                    },
                                                ],
                                            }}
                                            dataIndex={['nickname']}
                                            span={2}
                                        />
                                        <ProDescriptions.Item 
                                            label="账号"
                                            dataIndex={['username']}
                                            formItemProps={{
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '此项为必填项',
                                                    },
                                                ],
                                            }}
                                            span={1}
                                        />
                                        <ProDescriptions.Item 
                                            label="权限"
                                            dataIndex={['role']}
                                            editable={false}
                                            span={2}
                                        />
                                        <ProDescriptions.Item 
                                            label="头像URL"
                                            dataIndex={['avatar']}
                                            formItemProps={{
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '此项为必填项',
                                                    },
                                                ],
                                            }}
                                            copyable={true}
                                            span={3}
                                        />
                                    </ProDescriptions>

                            </Col>
                        </Row>
                    </ProCard>
                </Col>
                <Col span={24}>
                    <ProCard
                        title="修改密码"
                        headerBordered
                    >
                        <Form
                            layout='vertical'
                            onFinish={async (values) => {
                                // 完成编辑后用于发请求
                                console.log(values);
                                const passwordParam: UserAPI.updatePasswordParam = {
                                    newPassword: values.newPassword,
                                    oldPassword: values.oldPassword
                                };
                                const res = await loginService.LoginController.updatePassword(passwordParam);
                                if (res.code === '00000') {
                                    message.success(res.message);

                                } else {
                                    message.error(res.message);
                                }
                            }}
                            wrapperCol={{ span: 10 }}
                        >
                            <Form.Item
                                label="旧密码"
                                name="oldPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入旧密码',
                                    },
                                ]}
                            >
                                <Input type="password"  placeholder='请输入旧密码'/>
                            </Form.Item>
                            <Form.Item
                                label="新密码"
                                name="newPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入新密码',
                                    },
                                ]}
                            >
                                <Input type="password" className='ant-input' placeholder='请输入新密码'/>
                            </Form.Item>
                            <Form.Item
                                label="确认新密码"
                                name="confirmNewPassword"
                                dependencies={['password']}
                                rules={[
                                    {
                                        required: true,
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('两次输入的密码不一致'));
                                        },
                                    }),
                                ]}
                            >
                                <Input type="password" placeholder='请确认新密码'/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    提交
                                </Button>
                            </Form.Item>
                        </Form>
                    </ProCard>
                </Col>
            </Row>
        </>
    )
}
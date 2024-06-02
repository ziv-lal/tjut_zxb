import { ProCard } from '@ant-design/pro-components'
import { Typography, Form, Switch, Input, DatePicker, Button, message } from 'antd'
import { useState,useEffect } from 'react';
import moment from 'moment';
import configService from '@/services/config'

export default function BaseConfigInfo() {

    const { TextArea } = Input;

    // 是否进行编辑
    const [isEdit, setIsEdit] = useState(true);
    // 表格数据
    const [form] = Form.useForm();
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await configService.ConfigController.getConfig();
                if (res.code === '00000') {
                    form.setFieldsValue({
                        isApply: res.data.isApply,
                        notification: res.data.notification,
                        termStartTime: res.data.termStartTime ? moment(res.data.termStartTime) : null,
                        termEndTime: res.data.termEndTime ? moment(res.data.termEndTime) : null,
                        lastUpdateTime: res.data.lastUpdateTime ? res.data.lastUpdateTime :''
                    });
                }
            } catch (error) {
                console.error('Error fetching config:', error);
            }
        }
        fetchConfig();
    }, [form])

    return (
        <ProCard
            title="基础配置信息"
            headerBordered
            extra={
                <Switch
                    checkedChildren="编辑"
                    checked={!isEdit}
                    unCheckedChildren="查看"
                    onChange={(checked) => setIsEdit(!checked)}
                />
            }
        >
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                layout='horizontal'
                disabled={isEdit}
                form={form}
                onFinish={async (values) =>{
                    const config:ConfigAPI.Config={
                        id:1,
                        isApply:values.isApply ? 1:0,
                        notification:values.notification,
                        termStartTime:values.termStartTime.format('YYYY-MM-DD'),
                        termEndTime:values.termEndTime.format('YYYY-MM-DD'),
                        lastUpdateTime:''
                    }
                    const res = await configService.ConfigController.update(config);
                    if(res.code === '00000') {
                        message.success(res.message)
                    } else {
                        message.error(res.message)
                    }
                }}
            >
                <Form.Item name='isApply' label="是否开启预约" tooltip='是否允许预约教室' valuePropName="checked">
                    <Switch
                        checkedChildren="允许"
                        unCheckedChildren="禁止"
                        defaultChecked
                    />
                </Form.Item>
                <Form.Item name='notification' label="通知">
                    <TextArea rows={3} />
                </Form.Item>
                <Form.Item name='termStartTime' label="开学日期" rules={[{ required: true, message: '请选择开学日期！' }]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item name='termEndTime' label="学期结束日期" rules={[{ required: true, message: '请选择结束日期！' }]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item name='lastUpdate' label="上次更新时间">
                    <Typography.Text type='secondary'>{form.getFieldValue('lastUpdateTime')}</Typography.Text>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </ProCard>
    )
}
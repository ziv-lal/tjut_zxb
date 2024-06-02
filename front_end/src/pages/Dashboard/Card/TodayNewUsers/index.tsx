import { ProCard } from '@ant-design/pro-components'
import { Divider, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export default function TodayNewUsers() {
    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString('zh-CN');
    return (
        <ProCard
            title="今日新增用户"
            tooltip="今日新增的用户数量"
            headerBordered
            style={{ height: 200 }}
        >
            <Typography.Title level={3}>
                <UserOutlined />
                <Divider type='vertical' />
                <span >478</span>
            </Typography.Title>
            <Typography>
                <Typography.Text type='secondary'>较昨日：</Typography.Text>
                <Typography.Text type='success'>+8.39%</Typography.Text>
            </Typography>
            <Typography>
                <Typography.Text type='secondary'>数据更新时间：{formattedDateTime}</Typography.Text>
            </Typography>
        </ProCard>
    )
}
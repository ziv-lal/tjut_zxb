import { ProCard } from '@ant-design/pro-components'
import { Divider, Typography } from 'antd'
import { BankOutlined } from '@ant-design/icons'
export default function TodayHotBuilding() {
    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString('zh-CN');
    return (
        <ProCard
            title="今日热门教学楼"
            tooltip="今日查看人数最多的教学楼"
            headerBordered
            style={{ height: 200 }}
        >
            <Typography.Title level={3}>
                <BankOutlined style={{color: '#BF1212'}} />
                <Divider type='vertical' />
                <span>28号教学楼</span>
            </Typography.Title>
            <Typography>
                <Typography.Text type='secondary'>昨日：</Typography.Text>
                <Typography.Text type='success'>1号教学楼</Typography.Text>
            </Typography>
            <Typography>
                <Typography.Text type='secondary'>数据更新时间：{formattedDateTime}</Typography.Text>
            </Typography>
        </ProCard>
    );
}
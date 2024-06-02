import { ProCard } from '@ant-design/pro-components'
import { Divider, Typography } from 'antd'
import { LineChartOutlined } from '@ant-design/icons'
import React from 'react';
import { TinyArea } from '@ant-design/charts';

export default function TodayOpenTimes() {
    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString('zh-CN');
    const DemoTinyArea = () => {
        const data = [
            264, 417, 438, 887, 309, 397, 550, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
        ];
        const config = {
            height: 60,
            autoFit: false,
            data,
            smooth: true,
        };
        return <TinyArea {...config} />;
        };
    return (
        <ProCard
            title="今日微信小程序访问次数"
            bordered
            hoverable
            tooltip="今日微信小程序访问次数"
            style={{ height: 230 }}
        >
            <Typography.Title level={3}>
                <LineChartOutlined />
                <Divider type='vertical' />
                634
            </Typography.Title>
            <Typography>
                <Typography.Text type='secondary'>较昨日：</Typography.Text>
                <Typography.Text type='danger'>-12.29%</Typography.Text>
            </Typography>
            <Typography>
                <Typography.Text type='secondary'>数据更新时间：{formattedDateTime}</Typography.Text>
            </Typography>
            <DemoTinyArea />
        </ProCard>
    )
}
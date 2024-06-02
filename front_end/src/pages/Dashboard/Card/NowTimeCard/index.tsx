import { ProCard } from '@ant-design/pro-components'
import { Divider, Typography } from 'antd'
import React, { useState, useEffect } from 'react';

export default function NowTimeCard() {

    const [currentDateStr, setCurrentDateStr] = useState('');
    const [currentTimeStr, setCurrentTimeStr] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
        
            const currentDate = new Date();
            // 获取当前日期
            const formattedDate = currentDate.toLocaleDateString('zh-CN');
            // 获取当前时间
            const formattedTime = currentDate.toLocaleTimeString('zh-CN');
            
            setCurrentDateStr(formattedDate);
            setCurrentTimeStr(formattedTime);
        }, 1000);
        return () => clearInterval(intervalId);
    },[])

    return (
        <ProCard
            title="当前时间"
            tooltip="当前系统时间"
            direction='column'
            style={{ height: 200 }}
            headerBordered
            gutter={8}
        >
            <Typography.Title level={5} type='secondary'>
                <span>周次</span>
                <Divider type='vertical' />
                <span>第 7 周</span>
            </Typography.Title>
            <Typography.Title level={5} type='secondary'>
                <span>日期</span>
                <Divider type='vertical' />
                <span>{currentDateStr}</span>
            </Typography.Title>
            <Typography.Title level={5} type='secondary'>
                <span>时间</span>
                <Divider type='vertical' />
                <span>{currentTimeStr}</span>
            </Typography.Title>
        </ProCard>
    )
}
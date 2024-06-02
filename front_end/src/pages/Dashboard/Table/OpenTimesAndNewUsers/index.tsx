import React from 'react'
import { DualAxes } from '@ant-design/charts';
import { ProCard } from '@ant-design/pro-components'

export default function OpenTimesAndNewUsers() {

    const data = [
        {
            time: '05-01',
            openTimes: 500,
            newUsers: 43,
        },{
            time: '05-02',
            openTimes: 342,
            newUsers: 23,
        },{
            time: '05-03',
            openTimes: 123,
            newUsers: 48,
        },{
            time: '05-04',
            openTimes: 563,
            newUsers: 99,
        },{
            time: '05-05',
            openTimes: 234,
            newUsers: 143,
        },{
            time: '05-06',
            openTimes: 75,
            newUsers: 22,
        },{
            time: '05-07',
            openTimes: 431,
            newUsers: 67,
        },{
            time: '05-08',
            openTimes: 258,
            newUsers: 45,
        },
    ];
    const config = {
        data: [data, data],
        xField: 'time',
        yField: ['openTimes', 'newUsers'],
        geometryOptions: [
            {
                geometry: 'column',
            },
            {
                geometry: 'line',
                lineStyle: {
                    lineWidth: 2,
                },
            },
        ],
    };

    return (
        <ProCard
            title="每日访问次数与新增用户"
            headerBordered
            bordered
            hoverable
        >
            <DualAxes {...config} />
        </ProCard>
    )
}

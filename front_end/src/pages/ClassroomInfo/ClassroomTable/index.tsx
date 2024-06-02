import React from 'react';
import { Form, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import baseInfo from '@/services/baseInfo';
import { ProCard } from '@ant-design/pro-components';

const columns: TableColumnsType<BaseInfoAPI.ClassroomInfo> = [
    {
        title: '教室ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: '教学楼编号',
        dataIndex: 'buildingId',
        showSorterTooltip: { target: 'full-header' },
        filters: [
            {
                text: '1号楼',
                value: 1,
            },
            {
                text: '2号楼',
                value: 2,
            },
            {
                text: '3号楼',
                value: 3,
            },
            {
                text: '4号楼',
                value: 4,
            },
            {
                text: '5号楼',
                value: 5,
            },
            {
                text: '6号楼',
                value: 6,
            },
            {
                text: '27号楼',
                value: 27,
            },
            {
                text: '28号楼',
                value: 28,
            }
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.buildingId === value,
        sorter: (a, b) => parseInt(a.buildingId, 10) - parseInt(b.buildingId, 10),
        sortDirections: ['descend'],
    },
    {
        title: '楼层',
        dataIndex: 'floor',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.floor - b.floor,
    },
    {
        title: '教室名称',
        dataIndex: 'classroomName',
    },
];


export default function ClassroomTable() {
    const [dataSource, setDataSource] = React.useState<BaseInfoAPI.ClassroomInfo[]>([]);

    React.useEffect(() => {
        baseInfo.BaseInfoController.getClassroomList().then((res) => {
            if (res && res.code === '00000') {
                setDataSource(res.data);
            }
        });
    }, []);

    return (
        <ProCard
            title="教室信息"
            headerBordered
        >
            <Table
                columns={columns}
                dataSource={dataSource}
                showSorterTooltip={{ target: 'sorter-icon' }}
                rowKey="id"
            />
        </ProCard>
    )
}
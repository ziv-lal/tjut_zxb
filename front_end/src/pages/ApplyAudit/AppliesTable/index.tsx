import { ProCard, ProTable, TableDropdown } from '@ant-design/pro-components'
import { Divider, Typography, Button, Dropdown, Space, Tag, Select, App, message } from 'antd'
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { useRef } from 'react';
import appliesService from '@/services/applies';
import { PlusOutlined } from '@ant-design/icons';
import ApplyAddForm from '../ApplyAddForm';
import { useState } from 'react';
import userAPI from 'mock/userAPI';

const columns: ProColumns<ApplyAPI.ApplyInfo>[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: '预约ID',
        dataIndex: 'id',
        ellipsis: true,
        editable: false,
        hideInSearch: true,
    },
    {
        title: '教室',
        dataIndex: 'classroom',
        ellipsis: true,
        hideInSearch: true,
        editable: false
    },
    {
        title: '教学楼',
        dataIndex: 'building',
        ellipsis: true,
        hideInSearch: true,
        editable: false
    },
    {
        title: '事件',
        dataIndex: 'event',
        ellipsis: true,
        editable: false
    },
    {
        title: '理由',
        dataIndex: 'reason',
        ellipsis: true,
        editable: false
    },
    {
        title: '预约人',
        dataIndex: 'applyUser',
        ellipsis: true,
        editable: false
    },
    {
        title: '联系方式',
        dataIndex: 'contact',
        ellipsis: true,
        editable: false
    },
    {
        title: '预约节次',
        dataIndex: 'sections',
        ellipsis: true,
        hideInSearch: true,
        editable: false
    },
    {
        title: '日期',
        dataIndex: 'date',
        ellipsis: true,
        hideInSearch: true,
        editable: false
    },
    {
        title: '提交时间',
        dataIndex: 'createTime',
        ellipsis: true,
        hideInSearch: true,
        editable: false
    },
    {
        title: '处理时间',
        dataIndex: 'copeTime',
        ellipsis: true,
        hideInSearch: true,
        editable: false
    },
    {
        title: '备注',
        dataIndex: 'tips',
        ellipsis: true,
        hideInSearch: true,
        editable: false
    },
    {
        disable: true,
        title: '状态',
        dataIndex: 'status',
        filters: true,
        onFilter: true,
        valueType: 'select',
        valueEnum: {
            0: { text: '待处理', status: 'Processing' },
            1: { text: '已批准且入库', status: 'Success' },
            2: { text: '已批准未入库', status: 'Processing' },
            '-1': { text: '已拒绝', status: 'Error' },
            3: { text: '系统载入', status: 'Success' },
        },
        renderFormItem: (item, { defaultRender, value, ...rest }) => {
            return (
                <Select defaultValue={value} {...rest}>
                    <Select.Option value={2}>通过</Select.Option>
                    <Select.Option value={-1}>拒绝</Select.Option>
                </Select>
            );
        }
    },
    {
        title: '操作',
        valueType: 'option',
        key: 'option',
        render: (text, record, _, action) => [
            <a
                key="editable"
                onClick={() => {
                    action?.startEditable?.(String(record.id));
                }}
            >
                处理
            </a>
        ],
    },
];

export default function AppliesTable() {
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

    return (
        <ProCard
            title="预约审核列表"
            headerBordered
        >
            <ProTable<ApplyAPI.ApplyInfo>
                columns={columns}
                cardBordered
                rowKey="id"
                editable={{
                    type: 'multiple',
                    editableKeys,
                    onSave: async (rowKey, data, row) => {
                        console.log(data);
                        const params: ApplyAPI.ApplyCopeParams = {
                            id: data.id,
                            status: data.status
                        }
                        const res = await appliesService.ApplyController.cope(params);
                        if (res.code === '00000') {
                            message.success(res.message);
                        } else {
                            message.error(res.message)
                        }
                    },
                    onChange: setEditableRowKeys,
                }}
                columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                    defaultValue: {
                        option: { fixed: 'right', disable: true },
                    },
                    onChange(value) {
                        console.log('value: ', value);
                    },
                }}
                request={async (params, sort, filter) => {
                    const applyListParams: ApplyAPI.ApplyQueryParams = {
                        start: params.current,
                        length: params.pageSize,
                        event: params.event,
                        reason: params.reason,
                        contact: params.contact,
                        applyUser: params.applyUser,
                        status: params.status,
                    };
                    try {
                        const response = await appliesService.ApplyController.pageList(applyListParams);
                
                        if (response && response.code === "00000") {
                            return {
                                data: response.data.applies,
                                success: true,
                                total: response.data.recordsTotal,
                            };
                        } else {
                            return {
                                data: [],
                                success: false,
                                total: 0,
                            };
                        }
                    } catch (error) {
                        console.error("Error fetching data:", error);
                        return {
                            data: [],
                            success: false,
                            total: 0,
                        };
                    }
                }}
                onSubmit={async (params) => {
                    console.log('params: ', params);
                }}
                toolBarRender={() => [
                    <ApplyAddForm />
                ]}
            >
            </ProTable>
        </ProCard>
    )
}
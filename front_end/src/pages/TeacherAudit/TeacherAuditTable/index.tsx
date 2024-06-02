import type {
    EditableFormInstance,
    ProColumns,
    ProFormInstance,
} from '@ant-design/pro-components';
import {
    EditableProTable,
    ProCard,
    ProForm,
    ProFormDependency,
    ProFormField,
    ProFormSegmented,
    ProFormSwitch,
} from '@ant-design/pro-components';
import { Button,message } from 'antd';
import React, { useRef, useState } from 'react';
import teacherUserService from '@/services/teachers';

const columns: ProColumns<TeacherUserAPI.TeacherUserInfo>[] = [
    {
        title: 'ID',
        dataIndex: 'id',
        editable: false,
        width: '5%',
    },
    {
        title: '用户名',
        dataIndex: 'username',
        editable: false,
    },
    {
        title: '昵称',
        dataIndex: 'nickname',
        editable: false,
    },
    {
        title: '角色',
        dataIndex: 'role',
        editable: false,
    },
    {
        title: '头像URL',
        dataIndex: 'avatar',
        editable: false,
        ellipsis: true,
        copyable: true,
    },
    {
        title: '状态',
        dataIndex: 'ifAccept',
        valueType: 'select',
        valueEnum: {
            0: {
                text: '不予批准',
                status: 'Error',
            },
            1: {
                text: '批准',
                status: 'Success',
            },
        },
        // filters: [
        //     { text: '不予批准', value: 0 },
        //     { text: '已批准', value: 1 },
        // ],
    },
    {
        title: '操作',
        valueType: 'option',
        width: 100,
        render: (text, record, _, action) => [
            <a
                key="editable"
                onClick={() => {
                    action?.startEditable?.(record.id);
                }}
            >
                操作
            </a>
        ],
    },
    ];


export default function TeacherAuditTable() {
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    return(
        <ProCard
            title="管理员注册表"
            headerBordered
        >
            <EditableProTable
                columns={columns}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    onSave: async (rowKey, data, row) => {
                        console.log(data);
                        const params: TeacherUserAPI.TeacherAuditParam = {
                            id: data.id,
                            ifAccept: data.ifAccept
                        }
                        const res = await teacherUserService.TeacherAuditController.teacherAudit(params);
                        if (res.code === '00000') {
                            message.success(res.message);
                        } else {
                            message.error(res.message)
                        }
                    },
                    onChange: setEditableRowKeys,
                }}
                rowKey="id"
                request={async () => {
                    const res = await teacherUserService.TeacherAuditController.teacherUserList();
                    return {
                        data: res.data,
                        total: res.data.length,
                        success: res.code === '00000',
                    };
                }}
                // onChange={async (values) => {}} 修改后发送请求修改数据库
                controlled
                recordCreatorProps={false}
            />
        </ProCard>
    )
}
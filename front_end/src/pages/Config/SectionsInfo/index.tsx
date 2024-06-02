import { ProCard } from '@ant-design/pro-components'
import { Form, Input, InputNumber, Popconfirm, Table, Typography, message, Switch, TimePicker } from 'antd';
import type { TableProps } from 'antd';
import { useState } from 'react';

interface SectionInfo {
    key: string;
    id: number;
    section: number;
    start: string;
    end: string;
}

const originData: SectionInfo[] = [
    {
        key: '0',
        id: 1,
        section: 1,
        start: '08:00:00',
        end: '08:45:00',
    },
    {
        key: '1',
        id: 2,
        section: 2,
        start: '08:55:00',
        end: '09:40:00',
    },
    {
        key: '2',
        id: 3,
        section: 3,
        start: '10:10:00',
        end: '10:55:00',
    },
    {
        key: '3',
        id: 4,
        section: 4,
        start: '11:05:00',
        end: '11:50:00',
    },
    {
        key: '4',
        id: 5,
        section: 5,
        start: '14:00:00',
        end: '14:45:00',
    },
    {
        key: '5',
        id: 6,
        section: 6,
        start: '14:55:00',
        end: '15:40:00',
    },
    {
        key: '6',
        id: 7,
        section: 7,
        start: '16:10:00',
        end: '16:55:00',
    },
    {
        key: '7',
        id: 8,
        section: 8,
        start: '17:05:00',
        end: '17:50:00',
    },
    {
        key: '8',
        id: 9,
        section: 9,
        start: '18:30:00',
        end: '19:15:00',
    },
    {
        key: '9',
        id: 10,
        section: 10,
        start: '19:25:00',
        end: '20:10:00',
    },
    {
        key: '10',
        id: 11,
        section: 11,
        start: '20:20:00',
        end: '21:05:00',
    }
];
// 设置可编辑属性
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'string';
    record: SectionInfo;
    index: number;
    children: React.ReactNode;
}
const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = <Input />;

    return (
        <td {...restProps}>
        {editing ? (
            <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
                {
                required: true,
                message: `请输入 ${title}!`,
                },
            ]}
            >
            {inputNode}
            </Form.Item>
        ) : (
            children
        )}
        </td>
    );
};

export default function SectionsInfo() {

    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record: SectionInfo) => record.key === editingKey;

    const edit = (record: Partial<SectionInfo> & { key: React.Key }) => {
        form.setFieldsValue({ start: '', end: '', ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as SectionInfo;

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            message.error('保存失败');
        }
    };

    const columns = [
        {
            title: '节次',
            dataIndex: 'section',
            width: '15%',
            editable: false,
        },
        {
            title: '开始时间',
            dataIndex: 'start',
            width: '35%',
            editable: true,
        },
        {
            title: '结束时间',
            dataIndex: 'end',
            width: '35%',
            editable: true,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_: any, record: SectionInfo) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                            保存
                        </Typography.Link>
                        <Popconfirm title="确定取消？" onConfirm={cancel}>
                            <a>取消</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        编辑
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns: TableProps['columns'] = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: SectionInfo) => ({
                record,
                inputType: 'string',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    
    return (
        <>
            <ProCard
                title="上课节次信息配置"
                headerBordered
            >
                <Form form={form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        dataSource={data}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: cancel,
                        }}
                    />
                </Form>
            </ProCard>
        </>
    )
}
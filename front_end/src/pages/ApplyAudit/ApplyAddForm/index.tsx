import { PlusOutlined } from '@ant-design/icons';
import {
    ModalForm,
    ProForm,
    ProFormDatePicker,
    ProFormSelect,
    ProFormText,
} from '@ant-design/pro-components';
import { Button, Form, message, Input } from 'antd';
import baseInfo from '@/services/baseInfo';
import appliesService from '@/services/applies';
import React, { useState, useEffect } from 'react';

export default function ApplyAddForm() {

    return (
        <ModalForm
            title="添加教室预约信息"
            trigger={
                <Button type="primary">
                    <PlusOutlined />
                    添加
                </Button>
            }
            onFinish={async (values) => {
                console.log("values: " + values.sections);
                const apply: ApplyAPI.ApplyAddParams= {
                    classroomId: values.classroomId,
                    sections: String(values.sections),
                    reason: values.reason,
                    dateString: values.dateString,
                    status: 3,
                    applyUser: values.applyUser,
                    contact: values.contact,
                    tips:values.tips,
                    event: values.event
                }
                const res = await appliesService.ApplyController.add(apply);
                if (res.code === '00000'){
                    message.success(res.message);
                    return true;
                } else {
                    message.success(res.message);
                    return false;
                }
            }}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
                onCancel: () => console.log('run'),
            }}
        >
            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="classroomId"
                    label="教室id"
                    placeholder="请输入教室id"
                />
                <ProFormDatePicker
                    width="md"
                    name="dateString"
                    label="预约日期"
                    placeholder="请选择需要预约的日期"
                />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormSelect
                    width="md"
                    name="sections"
                    label="预约节次"
                    mode="multiple"
                    allowClear
                    placeholder="请选择需要预约的节次"
                    dependencies={['classroomId', 'dateString']}
                    request={async (params) => {
                        const { classroomId, dateString } = params;
                        if (!classroomId || !dateString) {
                            return [];
                        }
                        // 获取节次信息
                        try {
                            const res = await baseInfo.BaseInfoController.getRoomTimeListByRoomIdAndDate(classroomId, dateString.slice(0, 10));

                            if (res && res.code === '00000') {
                                if (res.data && res.data.available) {
                                    return res.data.available.map((item: any) => {
                                        return {
                                            label: item,
                                            value: item,
                                        };
                                    }, []);
                                }
                                return [];
                            } else {
                                return [];
                            }
                        } catch (error) {
                            console.error('Error fetching data:', error);
                            return [];
                        }
                    }}
                />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="event"
                    label="事件"
                    placeholder="请输入预约事件"
                />
                <ProFormText
                    width="md"
                    name="reason"
                    label="理由"
                    placeholder="请输入预约理由"
                />
                <ProFormText
                    width="md"
                    name="applyUser"
                    label="预约人"
                    placeholder="请输入预约人姓名"
                />
                <ProFormText
                    width="md"
                    name="contact"
                    label="联系方式"
                    placeholder="请输入联系方式"
                />
            </ProForm.Group>
            <ProFormText
                name="tips"
                label="备注"
                width="lg"
                placeholder="请输入备注"
            />
        </ModalForm>
    )
}
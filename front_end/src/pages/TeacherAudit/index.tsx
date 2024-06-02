import React from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import { AuditOutlined } from '@ant-design/icons';
import TeacherAuditTable from './TeacherAuditTable';

export default function TeacherAudit() {
    return (
        <>
            <Typography.Title level={1} style={{ margin: 0 }}>
                <AuditOutlined /> 管理员注册审核
            </Typography.Title>
            <Divider />
            <Row gutter={[16, 16]} >
                <Col span={24}>
                    <TeacherAuditTable />
                </Col>
            </Row>
        </>
    )
}
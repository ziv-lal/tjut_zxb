import { Typography, Row, Divider, Col } from 'antd'
import { AuditOutlined } from '@ant-design/icons'
import AppliesTable from './AppliesTable'

export default function ApplyAudit() {
    return (
        <>
            <Typography.Title level={1} style={{ margin: 0 }}>
                <AuditOutlined /> 预约审核
            </Typography.Title>
            <Divider />
            <Row gutter={[16, 16]} >
                <Col span={24}>
                    <AppliesTable />
                </Col>
            </Row>
        </>
    )
}
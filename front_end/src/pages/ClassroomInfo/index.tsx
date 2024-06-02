import { Typography, Row, Divider, Col } from 'antd'
import { BankOutlined } from '@ant-design/icons'
import ClassroomTable from './ClassroomTable'

export default function ClassroomInfo() {
    return (
        <>
            <Typography.Title level={1} style={{ margin: 0 }}>
                <BankOutlined /> 教室信息
            </Typography.Title>
            <Divider />
            <Row gutter={[16, 16]} >
                <Col span={24}>
                    <ClassroomTable />
                </Col>
            </Row>
        </>
    )
}
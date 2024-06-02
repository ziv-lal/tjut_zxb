import { Typography, Row, Divider, Col } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import BaseConfigInfo from './BaseConfigInfo'
import SectionsInfo from './SectionsInfo'
export default function Config() {
    return (
        <>
            <Typography.Title level={1} style={{ margin: 0 }}>
                <SettingOutlined /> 系统设置
            </Typography.Title>
            <Divider />
            <Row gutter={[16, 16]} >
                <Col span={24}>
                    <BaseConfigInfo />
                </Col>
                <Col span={24}>
                    <SectionsInfo />
                </Col>
            </Row>
        </>
    )
}
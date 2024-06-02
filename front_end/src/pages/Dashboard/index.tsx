import { Typography, Row, Divider, Col } from 'antd'
import { DashboardOutlined } from '@ant-design/icons'
import CurrentAvailableRooms from './Card/CurrentAvailableRooms';
import NowTimeCard from './Card/NowTimeCard';
import TodayHotBuilding from './Card/TodayHotBuilding';
import TodayNewUsers from './Card/TodayNewUsers';
import OpenTimesAndNewUsers from './Table/OpenTimesAndNewUsers';
import TodayOpenTimes from './Card/TodayOpenTiems';

export default function Dashboard() {
    return (
        <>
            <Typography.Title level={1} style={{ margin: 0 }}>
                <DashboardOutlined /> 数据统计
            </Typography.Title>
            <Divider />
            <Row gutter={[16, 16]} >
                <Col sm={24} md={12} xxl={6}>
                    <NowTimeCard />
                </Col>
                <Col sm={24} md={12} xxl={6}>
                    <CurrentAvailableRooms />
                </Col>
                <Col sm={24} md={12} xxl={6}>
                    <TodayHotBuilding />
                </Col>
                <Col sm={24} md={12} xxl={6}>
                    <TodayNewUsers />
                </Col>
                <Col span={24}>
                    <TodayOpenTimes />
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{marginTop:16}}>
                <Col span={24}>
                    <OpenTimesAndNewUsers />
                </Col>
            </Row>
        </>
    );
}
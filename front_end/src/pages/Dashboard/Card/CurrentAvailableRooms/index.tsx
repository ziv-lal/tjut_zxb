import { ProCard } from '@ant-design/pro-components'
import { Divider, Typography } from 'antd'
import { DeploymentUnitOutlined } from '@ant-design/icons'

export default function CurrentAvailableRooms() {
    return (
        <ProCard
            title="当前空闲教室"
            tooltip="当前处于空闲状态的教室"
            headerBordered
            layout='center'
            style={{ height: 200 }}
        >
            <Typography.Title level={3}>
                <DeploymentUnitOutlined style={{color: '#29bf12'}} />
                <Divider type='vertical' />
                <span style={{color:'#29bf12'}}>13</span> / 179
            </Typography.Title>
        </ProCard>
    )
}
import React,{ useCallback } from 'react'
import { logout } from '@/services/login/userController';
import { history, useModel } from '@umijs/max';
import { Spin } from 'antd';
import { flushSync } from 'react-dom';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { LogoutOutlined } from '@ant-design/icons';
import HeaderDropdown from '../HeaderDropdown'

export type GlobalHeaderRightProps = {
    menu?: boolean;
    children?: React.ReactNode;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {

    /**
    * 退出登录，并且将当前的 url 保存
    */
    const loginOut = async () => {
        await logout();
        // Note: There may be security issues, please note
        if (window.location.pathname !== '/login') {
        history.replace({
            pathname: '/login',
        });
        }
    };

    const { initialState, setInitialState } = useModel('@@initialState');

    const onMenuClick = useCallback(
        (event: MenuInfo) => {
        const { key } = event;
        if (key === 'logout') {
            flushSync(() => {
                setInitialState((s) => ({ ...s, currentUser: undefined, avatar: '' }));
            });
            loginOut();
            return;
        }
        history.push(`/${key}`);
        },
        [setInitialState],
    );
    const loading = (
        <span>
            <Spin
                size="small"
                style={{
                marginLeft: 8,
                marginRight: 8,
                }}
            />
        </span>
    );

    if (!initialState) {
        return loading;
    }

    const { currentUser } = initialState;

    if (!currentUser || !currentUser.nickname) {
    return loading;
    }
    const menuItems = [
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
        },
    ]
    
    return (
        <HeaderDropdown
            menu={{
                selectedKeys: [],
                onClick: onMenuClick,
                items: menuItems,
            }}
        >
        {children}
        </HeaderDropdown>
    );
}

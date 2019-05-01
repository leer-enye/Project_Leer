import React from 'react';
import Link from 'next/link';
import { Menu, Layout, Typography, Avatar, Icon } from 'antd';

import * as constants from '../constants';

const { Sider } = Layout;
const { Title, Text } = Typography;

const CustomSider = ({ selectedMenuItem, user }) => (
    <Sider
        className={constants.CLASS_NAMES.sider}
        breakpoint={constants.BREAKPOINT_MD}
        collapsedWidth={0}
        onBreakpoint={broken => {
            console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
        }}  
    >
        <Title level={2} className={constants.CLASS_NAMES.siderLogo}>
            {constants.LOGO_TEXT}
        </Title>
        <div className={constants.CLASS_NAMES.siderProfile}>
            <Avatar size={80} icon={constants.USER_ICON} />
            <Text
                className={`${constants.CLASS_NAMES.siderLogo} ${
                    constants.CLASS_NAMES.textWhite
                }`}
            >
                {`Hello ${user} || ''`}
            </Text>
        </div>

        <nav className={constants.CLASS_NAMES.siderMenu}>
            <Menu
                theme={constants.MENU_DARK_THEME}
                mode={constants.MENU_MODE_INLINE}
                defaultSelectedKeys={[selectedMenuItem]}
            >
                {constants.SIDER_LINKS.map(item => (
                    <Menu.Item key={item.key}>
                        <Link href={item.path}>
                            <span>
                                <Icon type={item.icon} />
                                <span className={constants.CLASS_NAMES.navText}>
                                    {item.name}
                                </span>
                            </span>
                        </Link>
                    </Menu.Item>
                ))}
            </Menu>
        </nav>
    </Sider>
);

export default CustomSider;

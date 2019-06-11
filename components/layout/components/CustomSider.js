import { Menu, Layout, Typography, Avatar, Icon } from 'antd';
import Link from 'next/link';
import React from 'react';

import * as constants from '../constants';

const { Sider } = Layout;
const { Title, Text } = Typography;
const {
    BREAKPOINT_MD,
    CLASS_NAMES: {
        navText,
        sider,
        siderLogo,
        siderMenu,
        siderProfile,
        siderProfileText,
        textWhite,
    },
    LOGO_TEXT,
    MENU_THEME,
    MENU_MODE,
    SIDER_LINKS,
    USER_ICON,
} = constants;

const CustomSider = ({ selectedMenuItem, user }) => (
    <Sider
        className={sider}
        breakpoint={BREAKPOINT_MD}
        collapsedWidth={0}
    >
        <Title level={2} className={siderLogo}>
            {LOGO_TEXT}
        </Title>
        <div className={siderProfile}>
            <Avatar size={80} icon={USER_ICON} />
            <Text
                className={`${siderProfileText} ${textWhite}`}
            >
                {`Hello ${user || ''}`}
            </Text>
        </div>

        <nav className={siderMenu}>
            <Menu
                theme={MENU_THEME}
                mode={MENU_MODE}
                defaultSelectedKeys={[selectedMenuItem]}
            >
                {SIDER_LINKS.map(({ icon, key, name, path }) => (
                    <Menu.Item key={key}>
                        <Link href={path}>
                            <span>
                                <Icon type={icon} />
                                <span className={navText}>
                                    {name}
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

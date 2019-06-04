import React from 'react';
import Link from 'next/link';
import { Menu, Layout, Typography, Avatar, Icon } from 'antd';

import * as constants from '../constants';

const { Sider } = Layout;
const { Title, Text } = Typography;
const {
    BREAKPOINT_MD,
    CLASS_NAMES,
    LOGO_TEXT,
    MENU_THEME,
    MENU_MODE,
    SIDER_LINKS,
    USER_ICON,
} = constants;

const {
    navText,
    sider,
    siderLogo,
    siderMenu,
    siderProfile,
    siderProfileText,
    textWhite,
} = CLASS_NAMES;

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
                            <a>
                                <Icon type={icon} />
                                <span className={navText}>
                                    {name}
                                </span>
                            </a>
                        </Link>
                    </Menu.Item>
                ))}
            </Menu>
        </nav>
    </Sider>
);

export default CustomSider;

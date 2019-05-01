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
    MENU_DARK_THEME,
    MENU_MODE_INLINE,
    SIDER_LINKS,
    USER_ICON,
} = constants;

const CustomSider = ({ selectedMenuItem, user }) => (
    <Sider
        className={CLASS_NAMES.sider}
        breakpoint={BREAKPOINT_MD}
        collapsedWidth={0}
    >
        <Title level={2} className={CLASS_NAMES.siderLogo}>
            {LOGO_TEXT}
        </Title>
        <div className={CLASS_NAMES.siderProfile}>
            <Avatar size={80} icon={USER_ICON} />
            <Text
                className={`${CLASS_NAMES.siderProfileText} ${
                    CLASS_NAMES.textWhite
                }`}
            >
                {`Hello ${user || ''}`}
            </Text>
        </div>

        <nav className={CLASS_NAMES.siderMenu}>
            <Menu
                theme={MENU_DARK_THEME}
                mode={MENU_MODE_INLINE}
                defaultSelectedKeys={[selectedMenuItem]}
            >
                {SIDER_LINKS.map(({ icon, key, name, path }) => (
                    <Menu.Item key={key}>
                        <Link href={path}>
                            <span>
                                <Icon type={icon} />
                                <span className={CLASS_NAMES.navText}>
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

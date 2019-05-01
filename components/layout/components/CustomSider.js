import React from 'react';
import Link from 'next/link';
import { Menu, Layout, Typography, Avatar, Icon } from 'antd';

import * as constants from '../constants';

const { Sider } = Layout;
const { Title, Text } = Typography;
const { CLASS_NAMES, LOGO_TEXT, SIDER_LINKS } = constants;

const CustomSider = ({ selectedMenuItem, user }) => (
    <Sider
        className={CLASS_NAMES.sider}
        breakpoint="md"
        collapsedWidth={0}
        onBreakpoint={broken => {
            console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
        }}  
    >
        <Title level={2} className={CLASS_NAMES.siderLogo}>
            {LOGO_TEXT}
        </Title>
        <div className={CLASS_NAMES.siderProfile}>
            <Avatar size={80} icon="user" />
            <Text
                className={`${CLASS_NAMES.siderLogo} ${
                    CLASS_NAMES.textWhite
                }`}
            >
                {`Hello ${user} || ''`}
            </Text>
        </div>

        <nav className={CLASS_NAMES.siderMenu}>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[selectedMenuItem]}
            >
                {SIDER_LINKS.map(item => (
                    <Menu.Item key={item.key}>
                        <Link href={item.path}>
                            <span>
                                <Icon type={item.icon} />
                                <span className="nav-text">
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

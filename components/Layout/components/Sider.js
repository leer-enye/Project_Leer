import React from 'react';
import Link from 'next/link';
import { Menu, Layout, Typography, Avatar, Icon } from 'antd';

import { SIDER_LINKS, LOGO_TEXT, greetUser } from '../constants';

const { Sider } = Layout;
const { Title, Text } = Typography;

const CustomSider = ({ selectedMenuItem, user }) => {
	return (
		<Sider
			className="sider"
			breakpoint="md"
			collapsedWidth={0}
			onBreakpoint={broken => {
				console.log(broken);
			}}
			onCollapse={(collapsed, type) => {
				console.log(collapsed, type);
			}}
		>
			<Title level={2} className="sider__logo">
				{LOGO_TEXT}
			</Title>
			<div className="sider__profile">
				<Avatar size={80} icon="user" />
				<Text className="sider__profile-text text-white">
					{greetUser(user)}
				</Text>
			</div>

			<nav className="sider__menu">
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={[selectedMenuItem]}
				>
					{SIDER_LINKS.map(item => {
						return (
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
						);
					})}
				</Menu>
			</nav>
		</Sider>
	);
};

export default CustomSider;

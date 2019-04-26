/* eslint-disable react/destructuring-assignment */
import React from 'react';

import { Layout, Menu, Icon, Typography, Avatar, Breadcrumb } from 'antd';
import './index.scss';



const { Header, Sider, Content, Footer } = Layout;
const { Title, Text } = Typography

const CustomLayout = props => (
	<React.Fragment>
		<Layout className="layout">
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
					{' '}
					Leer{' '}
				</Title>
				<div className="sider__profile">
					<Avatar size={80} icon="user" />
					<Text className="sider__profile-text text-white">
						Hello Jude!
					</Text>
				</div>

				<nav className="sider__menu">
					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={['1']}
					>
						<Menu.Item key="1">
							<Icon type="dashboard" />
							<span className="nav-text">Home</span>
						</Menu.Item>
						<Menu.Item key="2">
							<Icon type="appstore" />
							<span className="nav-text">Learning Resources</span>
						</Menu.Item>
						<Menu.Item key="3">
							<Icon type="edit" />
							<span className="nav-text">Practice</span>
						</Menu.Item>
						<Menu.Item key="4">
							<Icon type="thunderbolt" />
							<span className="nav-text">Challenge Friends</span>
						</Menu.Item>
						<Menu.Item key="5">
							<Icon type="user" />
							<span className="nav-text">Profile</span>
						</Menu.Item>
					</Menu>
				</nav>
			</Sider>
			<Layout>
				<Header className="header">
					<Title className="header__logo" level={2}>
						Leer
					</Title>
				</Header>
				<Breadcrumb style={{ margin: '16px 24px' }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>1</Breadcrumb.Item>
					<Breadcrumb.Item>2</Breadcrumb.Item>
				</Breadcrumb>
				<Content className="content">{props.children}</Content>
				<Footer className="custom-footer" />
			</Layout>
		</Layout>
	</React.Fragment>
);

export default CustomLayout;

/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Icon, Typography, Avatar, Breadcrumb } from 'antd';
import './index.scss';

const { Header, Sider, Content, Footer } = Layout;
const { Title, Text } = Typography;

const CustomLayout = props => (
	<React.Fragment>
		<Layout className="layout" hasSider>
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
						defaultSelectedKeys={[props.selectedMenuItem]}
					>
						<Menu.Item key="home">
							<Link href="/admin">
								<span>
									<Icon type="dashboard" />
									<span className="nav-text">Home</span>
								</span>
							</Link>
						</Menu.Item>

						<Menu.Item key="resources">
							<Link href="/admin/resources">
								<span>
									<Icon type="appstore" />
									<span className="nav-text">
										Learning Resources
									</span>
								</span>
							</Link>
						</Menu.Item>

						<Menu.Item key="practice">
							<Link href="/admin/practice">
								<span>
									<Icon type="edit" />
									<span className="nav-text">Practice</span>
								</span>
							</Link>
						</Menu.Item>

						<Menu.Item key="challenge">
							<Link href="/admin/challenge">
								<span>
									<Icon type="thunderbolt" />
									<span className="nav-text">
										Challenge Friends
									</span>
								</span>
							</Link>
						</Menu.Item>

						<Menu.Item key="profile">
							<Link href="/admin/profile">
								<span>
									<Icon type="user" />
									<span className="nav-text">Profile</span>
								</span>
							</Link>
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

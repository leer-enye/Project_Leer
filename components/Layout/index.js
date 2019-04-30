/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Layout, Typography, Breadcrumb } from 'antd';
import { CustomSider } from "./components";
import './index.scss';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const CustomLayout = props => (
	<React.Fragment>
		<Layout className="layout" hasSider>
			<CustomSider selectedMenuItem={props.selectedMenuItem} />
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

/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Layout, Typography } from 'antd';
import { CustomSider } from "./components";
import { LOGO_TEXT } from './constants';
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
						{ LOGO_TEXT }
					</Title>
				</Header>
				<Content className="content">{props.children}</Content>
				<Footer className="custom-footer" />
			</Layout>
		</Layout>
	</React.Fragment>
);

export default CustomLayout;

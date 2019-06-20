/* eslint-disable react/destructuring-assignment */
import { Layout, Typography } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { selectors } from '../auth';
import { CustomSider } from "./components";
import { LOGO_TEXT } from './constants';
import './index.scss';

const { Header, Content } = Layout;
const { Title } = Typography;
const { getUser } = selectors;

const CustomLayout = ({ children, user ,selectedMenuItem }) => (
    <React.Fragment>
        <Layout className="layout" hasSider>
            <CustomSider user={user} selectedMenuItem={selectedMenuItem} />
            <Layout>
                <Header className="header">
                    <Title className="header__logo" level={2}>
                        { LOGO_TEXT }
                    </Title>
                </Header>
                <Content className="content">
                    <div>
                        { children }
                    </div>
                </Content>
            </Layout>
        </Layout>
    </React.Fragment>
);

const mapStateToProps = state => ({
    user: getUser(state),
});

export default connect(mapStateToProps, null)(CustomLayout);

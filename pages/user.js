import React, { Component } from 'react';
import { Row, Col } from 'antd';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/layout';
import './admin/profile/index.scss';

class User extends Component {
    static async getInitialProps({ req }) {
        let isLoggedIn = false;
        let userData = {};

        try {
            const { cookie } = req.headers;
            const headers = req ? { cookie } : undefined;
            const res = await fetch('/api/users/users', {
                headers,
            });

            const userRes = await res.json();
            const { data } = userRes;
            const { user } = data;
            isLoggedIn = true;
            userData = user;
        } catch (err) {
            console.log(err);
        }
        return { isLoggedIn, userData };
    }

    render() {
        const { userData: user, isLoggedIn } = this.props;
        const { name, email, picture } = user;
        return (
            <Layout selectedMenuItem="profile">
                <Row>
                    <Col span={24} className="mb-1">
                        <h1>Name: {isLoggedIn ? name : ''} </h1>
                        <h1>Email: {isLoggedIn ? email : ''}</h1>
                        <div>
                            <img
                                alt="Profile"
                                src={isLoggedIn ? picture : ''}
                            />
                        </div>
                    </Col>
                </Row>
            </Layout>
        );
    }
}

export default User;

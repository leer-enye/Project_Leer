/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import fetch from 'isomorphic-unfetch';
import io from 'socket.io-client';
import Layout from '../components/layout';
import './admin/profile/index.scss';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hello: '',
        };
    }

    static async getInitialProps({ req }) {
        let isLoggedIn = false;
        let userData = {};

        try {
            const protocol =
				process.env.NODE_ENV === 'production' ? 'https' : 'http';

            const apiUrl = process.browser
                ? `${protocol}://${window.location.host}/api/users/users`
                : `${protocol}://${req.headers.host}/api/users/users`;

            const { cookie } = req.headers;
            const headers = req ? { cookie } : undefined;
            const res = await fetch(apiUrl, {
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

    componentDidMount() {
        let connected = false;
        const username = 'Faizan';
        let room = '';

        this.socket = io();
        this.socket.on('now', data => {
            this.setState({
                hello: data.message,
            });
        });
        this.socket.on('connect', data => {
            // we are connected, should send our name
            connected = true;
            if (username) this.socket.emit('login', { username });
        });
        this.socket.on('chat start', data => {
            // eslint-disable-next-line prefer-destructuring
            room = data.room;
            // showChatWindow(data.name);
        });
        this.socket.on('chat end', data => {
            // hideChatWindow();
            this.socket.leave(room);
            room = '';
        });
        this.socket.on('disconnect', data => {
            // handle server/connection falling
            console.log('Connection fell or your browser is closing.');
        });
        const sendMessage = text => {
            // method, which you will call when user hits enter in input field
            if (connected) this.socket.emit('message', { text });
        };
        const leaveChat = () => {
            // call this when user want to end current chat
            if (connected) {
                this.socket.emit('leave room');
                this.socket.leave(room);
                room = '';
            }
        };
    }

    render() {
        const { userData: user, isLoggedIn } = this.props;
        const { name, email, picture } = user;
        const { hello } = this.state;
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
                        <h1>{hello}</h1>
                    </Col>
                </Row>
            </Layout>
        );
    }
}

export default User;

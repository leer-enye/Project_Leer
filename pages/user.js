/* eslint-disable no-unused-vars */
import { Row, Col } from 'antd';
import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import io from 'socket.io-client';
import Layout from '../components/layout';
import {
    CLIENT_SYSTEM_EVENTS,
    CUSTOM_EVENTS,
    SERVER_SYSTEM_EVENTS
} from '../server/lib/config/socketio/constant';
import './admin/profile/index.scss';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onlineUsers: {},
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
        this.handleSocket();
    }

    handleSocket() {
        let connected = false;
        const {
            challengeEnd,
            challengeStart,
            leaveRoom,
            login,
            users,
        } = CUSTOM_EVENTS;
        const { connect } = CLIENT_SYSTEM_EVENTS;
        const { message, disconnet } = SERVER_SYSTEM_EVENTS;
        const { userData: user, isLoggedIn } = this.props;
        console.log(user);
        const { _id, name, picture } = user;
        let room = '';
        this.socket = io();

        this.socket.on(connect, data => {
            connected = true;

            if (isLoggedIn) this.socket.emit(login, { _id, name, picture });
        });

        this.socket.on(users, data => {
            this.setState({ onlineUsers: data.names });
            const { onlineUsers } = this.state;
            console.log(onlineUsers);
        });

        this.socket.on(challengeStart, data => {
            // eslint-disable-next-line prefer-destructuring
            room = data.room;
            // TODO show notification to user; challengeStartNotification(data.name);
        });

        this.socket.on(challengeEnd, data => {
            // TODO show notification to user; challengeEndNotification();
            this.socket.leave(room);
            room = '';
        });

        this.socket.on(disconnet, data => {
            console.log('Connection fell or your browser is closing.');
        });

        const sendMessage = text => {
            // method, which you will call when user hits enter in input field
            if (connected) this.socket.emit(message, { text });
        };

        const leaveChat = () => {
            // call this when user want to end current chat
            if (connected) {
                this.socket.emit(leaveRoom);
                this.socket.leave(room);
                room = '';
            }
        };
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

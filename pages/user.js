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

const {
    acceptChallenge,
    challengeEnd,
    challengeRequest,
    challengeStart,
    getUser,
    leaveRoom,
    login,
    rejectChallenge,
    selectUser,
    users,
} = CUSTOM_EVENTS;

const { message, disconnet } = SERVER_SYSTEM_EVENTS;

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connected: false,
            onlineUsers: {},
            room: '',
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

    getUserList() {
        this.socket.emit(getUser, {});
    }

    rejectChallengeRequest() {
        this.socket.emit(rejectChallenge, {});
    }

    acceptChallengeRequest() {
        this.socket.emit(acceptChallenge, {});
    }

    // call this when user want to end current challenge
    leaveChat() {
        const { connected, room } = this.state;
        if (connected) {
            this.socket.emit(leaveRoom);
            this.socket.leave(room);
            this.setState({ room: '' });
        }
    }

    handleSocket() {
        const { connect } = CLIENT_SYSTEM_EVENTS;
        const { userData: user, isLoggedIn } = this.props;
        const { onlineUsers, room } = this.state;
        console.log(user);
        const { _id, name, picture } = user;
        this.socket = io();

        this.socket.on(connect, data => {
            this.setState({ connected: true });
            if (isLoggedIn) {
                this.socket.emit(login, { _id, name, picture });
                this.getUser();
            }
        });

        this.socket.on(users, data => {
            this.setState({ onlineUsers: data.users });
            console.log(onlineUsers);
        });

        this.socket.on(challengeStart, data => {
            this.setState({ room: data.room });
            // TODO show notification to user; challengeStartNotification(data.user.name);
        });

        this.socket.on(challengeRequest, data => {
            this.setState({ room: data.room });
            // TODO show notification to user; challengeRequestNotification(data.user);
        });

        this.socket.on(challengeEnd, data => {
            // TODO show notification to user; challengeEndNotification();
            this.socket.leave(room);
            this.setState({ room: '' });
        });

        this.socket.on(disconnet, data => {
            console.log('Connection fell or your browser is closing.');
        });
    }

    selectUser(selectedUser) {
        if (
            selectedUser &&
			selectUser.id &&
			selectedUser.name &&
			selectUser.picture
        ) {
            this.socket.emit(selectUser, selectedUser);
        }
    }

    sendMessage(text) {
        const { connected } = this.state;

        if (connected) this.socket.emit(message, { text });
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

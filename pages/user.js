import { Row, Col, notification, Button } from 'antd';
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
    ackChallengeRequest,
    challengeEnd,
    challengeRequest,
    challengeStart,
    getNextQuestion,
    getUser,
    leaveRoom,
    login,
    onRejectedChallenge,
    receiveQuestion,
    rejectChallenge,
    selectUser,
    users,
} = CUSTOM_EVENTS;

const { message } = SERVER_SYSTEM_EVENTS;

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connected: false,
            notificationKey: '',
            onlineUsers: [],
            room: '',
        };
        this.socket = io();

        this.getUserList = this.getUserList.bind(this);
        this.acceptChallengeRequest = this.acceptChallengeRequest.bind(this);
        this.rejectChallengeRequest = this.rejectChallengeRequest.bind(this);
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

    onCloseNotification() {
        const { notificationKey: key } = this.state;
        this.acceptChallengeRequest();
        notification.close(key);
    }

    getNextQuestion() {
        const { room } = this.state;
        this.socket.emit(getNextQuestion, { roomId: room });
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

    // TODO show notification to user
    handleSocket() {
        const { connect } = CLIENT_SYSTEM_EVENTS;
        const { userData: user, isLoggedIn } = this.props;
        const { room } = this.state;
        const { _id, name, picture } = user;

        this.socket.on(connect, () => {
            this.setState({ connected: true });

            if (isLoggedIn) {
                this.socket.emit(login, { _id, name, picture });
            }
        });

        this.socket.on(users, data => {
            this.setState({ onlineUsers: data.users });
        });

        this.socket.on(challengeStart, data => {
            this.setState({ room: data.room });
            this.getNextQuestion();
        });

        this.socket.on(ackChallengeRequest, data => {
            const { room: roomId } = data;
            this.setState({ room: roomId });
        });

        this.socket.on(challengeRequest, data => {
            const { room: roomId, user: sender } = data;
            this.setState({ room: roomId });
            this.openNotification(sender);
        });

        this.socket.on(challengeEnd, () => {
            this.socket.leave(room);
            this.setState({ room: '' });
        });

        this.socket.on(receiveQuestion, data => {
            console.log(data);
        });

        this.socket.on(onRejectedChallenge, () => {
            this.socket.leave(room);
            this.setState({ room: '' });
        });
    }

    openNotification(user) {
        const key = `open${Date.now()}`;
        this.setState({ notificationKey: key });
        const btn = (
            <Button
                type="primary"
                size="small"
                onClick={this.onCloseNotification}
            >
				Accept
            </Button>
        );
        notification.open({
            btn,
            description: `${user.name} has challenged you`,
            duration: 0,
            key,
            message: 'Challenge Notification',
            onClose: this.rejectChallengeRequest,
        });
    }

    challengeUser(selectedUser) {
        const { id, name, picture } = selectedUser;
        if (selectedUser && id && name && picture) {
            this.socket.emit(selectUser, {
                subject: '5d03ade5f721544844347cce',
                user: selectedUser,
            });
        }
    }

    sendMessage(text) {
        const { connected } = this.state;

        if (connected) this.socket.emit(message, { text });
    }

    render() {
        const { userData: user, isLoggedIn } = this.props;
        const { name, email, picture } = user;
        const { onlineUsers } = this.state;

        const displayOnlineUser = value => (
            <li key={value.id}>
                <p>{value.name}</p>
                <Button
                    type="Primary"
                    onClick={() => this.challengeUser(value)}
                >
					Challenge
                </Button>
            </li>
        );

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
                        <div>
                            <p>Online Users</p>
                            {onlineUsers.map(value => displayOnlineUser(value))}
                        </div>
                    </Col>
                </Row>
            </Layout>
        );
    }
}

export default User;

import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import io from 'socket.io-client';
import { message } from 'antd';

import { saveSessionRequest } from '../components/auth/actions';
import { actions as challengeActions } from '../components/challenge';
import Layout from '../components/layout';
import {
    CLIENT_SYSTEM_EVENTS,
    CUSTOM_EVENTS,
    SERVER_SYSTEM_EVENTS
} from '../server/lib/config/socketio/constant';
import createStore from "../store";

const {
    acceptChallenge,
    ackChallengeRequest,
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
const {
    setOnlineUsersRequest,
} = challengeActions;

class MyApp extends App {
    
    constructor(props){
        super(props);

        this.state = {
            connected: false,
            notificationKey: '',
            onlineUsers: [],
            room: '',
        };

        this.socket = io();
    }

    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        const { req, store, isServer } = ctx;

        //  if in server, get cookie and fetch user
        if (isServer) {
            const { cookie } = req.headers;
            if (cookie) {
                store.dispatch(saveSessionRequest({ cookie }));
            }
        }

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    componentDidMount() {
        const { store } = this.props;
        const { user } = store.getState().auth;
        // console.log(store.getState())
        if (user){
            
            console.log('handlesocket just ran');
            this.handleSocket(user);
        }
    }

    componentWillUnmount(){
        this.socket.off(challengeStart);
        this.socket.off(challengeRequest);
        this.socket.off(users);
        this.socket.off(ackChallengeRequest);
        this.socket.off(challengeEnd);
    }

    getUserList = () => {
        this.socket.emit(getUser, {});
    }

    rejectChallengeRequest = () => {
        this.socket.emit(rejectChallenge, {});
    }

    acceptChallengeRequest() {
        this.socket.emit(acceptChallenge, {});
    }

    // call this when user want to end current challenge
    leaveChat = () => {
        const { connected, room } = this.state;
        if (connected) {
            this.socket.emit(leaveRoom);
            this.socket.leave(room);
            this.setState({ room: '' });
        }
    }

    // TODO show notification to user
    handleSocket = user => {
        // if no instance of user return
        if (user == null){
            return;
        }

        const { store } = this.props;

        const { connect } = CLIENT_SYSTEM_EVENTS;

        const { room } = this.state;
        const { _id, name, picture } = user;

        this.socket.on(connect, () => {
            this.setState({ connected: true });

            this.socket.emit(login, { _id, name, picture });
            // message.info('User connected');               
        
        });

        this.socket.on(users, data => {
            console.log('before dispatch, data is ==> ', data);
            store.dispatch(setOnlineUsersRequest(data.users));
            this.setState({ onlineUsers: data.users });
        });

        this.socket.on(challengeStart, data => {
            this.setState({ room: data.room });
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
    }

    challengeUser = selectedUser => {
        const { id, name, picture } = selectedUser;
        if (selectedUser && id && name && picture) {
            this.socket.emit(selectUser, selectedUser);
        }
    }

    // sendMessage = text => {
    //     const { connected } = this.state;

    //     if (connected) this.socket.emit(message, { text });
    // }

    render(){
        const { Component, pageProps, router, store } = this.props;
        
        if (router.pathname.includes('/admin')){
            let page = router.pathname.split('/admin/')[1];
            if (!page){
                page = 'home';
            }

            return (
                <Container>
                    <Provider store={store}>
                        <Layout selectedMenuItem={page}>
                            <Component {...pageProps} socket={this.socket} />
                        </Layout>
                    </Provider>
                </Container>
            );
        }

        return (
            <Container>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }
};

export default withRedux(createStore)(withReduxSaga(MyApp));

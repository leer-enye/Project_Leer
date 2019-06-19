import { Modal } from 'antd';
import App, { Container } from 'next/app';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import React from 'react';
import { Provider } from 'react-redux';
import io from 'socket.io-client';

import { saveSessionRequest } from '../components/auth/actions';
import { getUser as getUserSelector } from '../components/auth/selectors';
import { 
    actions as challengeActions, 
    selectors as challengeSelectors 
} from '../components/challenge';
import Layout from '../components/layout';
import {
    CLIENT_SYSTEM_EVENTS,
    CUSTOM_EVENTS
} from '../server/lib/config/socketio/constant';
import createStore from "../store";
import { constants as commonConstants } from '../components/common';

const { confirm } = Modal;
const {
    NEXT_LINKS: { challengeInfoLink },
} = commonConstants;
const {
    acceptChallenge,
    ackChallengeRequest,
    challengeEnd,
    challengeRequest,
    challengeStart,
    getQuestions,
    getNextQuestion,
    getUser,
    leaveRoom,
    login,
    onRejectedChallenge,
    receiveQuestion,
    receiveQuestions,
    rejectChallenge,
    selectUser,
    users,
} = CUSTOM_EVENTS;
const {
    setOnlineUsersRequest,
    setChallengeReqStatusRequest,
    setChallengeRoomRequest,
    setCurrentQuestionRequest,
    setQuestionsRequest,
    updateChallengeStoreRequest,
} = challengeActions;
const {
    getChallengeStore,
    getChallengeRoom,
} = challengeSelectors;

class MyApp extends App {

    constructor(props) {
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
        if (user) {
            this.handleSocket(user);
        }
    }

    componentWillUnmount() {
        // this.socket.off(challengeStart);
        // this.socket.off(challengeRequest);
        // this.socket.off(users);
        // this.socket.off(ackChallengeRequest);
        // this.socket.off(challengeEnd);
    }

    getNextQuestion() {
        // TODO
        // might remove this, used it when we were
        // getting the questions one at a time

        const { store } = this.props;
        // get room from redux store
        const room = getChallengeRoom(store.getState());
        // emit getNextQuestion event with room id
        this.socket.emit(getNextQuestion, { roomId: room });
    }

    // get all questions
    getQuestions() {
        const { store } = this.props;
        // get room from redux store
        const room = getChallengeRoom(store.getState());
        // emit getNextQuestion event with room id
        this.socket.emit(getQuestions, { roomId: room });
    }

    getUserList = () => {
        this.socket.emit(getUser, {});
    }

    rejectChallengeRequest = () => {
        this.socket.emit(rejectChallenge, {});
    }

    acceptChallengeRequest(challengeStore) {
        const { store } = this.props;
        // once user accepts challenge, save challenge info from challenger to redux store.
        store.dispatch(updateChallengeStoreRequest(challengeStore)); 
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

    //  for displaying notifications once user is challenged
    displayChallengeNotif = ({ challengeStore, sender, subject }) => {
        console.log('notif => ', subject);
        confirm({
            content: `${sender.name} just challenged you to a quiz on ${subject.name}`,
            onCancel: () => {
                this.rejectChallengeRequest();
            },
            onOk: () => {
                this.acceptChallengeRequest(challengeStore);
                // if user accepts challenge, redirect to 
                // challenge info page
                Router.replace(challengeInfoLink);
            },
            title: 'Challenge Notification',
        });
    }

    // TODO show notification to user
    handleSocket = user => {
        // if no instance of user return
        if (user == null) {
            return;
        }

        const { store } = this.props;

        const { connect } = CLIENT_SYSTEM_EVENTS;

        const { room } = this.state;
        const { _id, name, picture } = user;

        this.socket.on(connect, () => {
            // this.setState({ connected: true });
            this.socket.emit(login, { _id, name, picture });

        });

        this.socket.on(users, data => {
            store.dispatch(setOnlineUsersRequest(data.availableUsers));
            // this.setState({ onlineUsers: data.users });
        });

        // challengeStart is sent to both users when challengee
        // accepts challenge;
        this.socket.on(challengeStart, data => {
            store.dispatch(setChallengeReqStatusRequest('approved'));
            store.dispatch(setChallengeRoomRequest(data.room));
            // once challenge starts, emit getQuestions event
            this.getQuestions();
        });
        
        // TODO
        // used this when we were receiving a question at a time
        // receive question event is sent from server after getNextQuestion event
        // has been emitted from client
        this.socket.on(receiveQuestion, data => {
            console.log('this question was received ==> ', data);
            store.dispatch(setCurrentQuestionRequest(data.question));
        });

        // event is received when getQuestions is emmited
        // returns all questions for client
        this.socket.on(receiveQuestions, data => {
            console.log('this question was received ==> ', data);
            store.dispatch(setQuestionsRequest(data.questions));
        });
        
        // sender receives this after emitting `challengeUser` 
        this.socket.on(ackChallengeRequest, () => {
            // TODO: check if anything needs to be done here
        });

        this.socket.on(onRejectedChallenge, () => {
            store.dispatch(setChallengeReqStatusRequest('rejected'));
        });

        this.socket.on(challengeRequest, data => {
            const { challengeStore , user: sender, subject } = data;
            this.displayChallengeNotif({ challengeStore, sender, subject });
        });

        this.socket.on(challengeEnd, () => {
            this.socket.leave(room);
            store.dispatch(setChallengeReqStatusRequest('rejected'));
            this.setState({ room: '' });
        });
    }

    challengeUser = selectedUser => {
        if (!selectedUser){
            return;
        }

        const { store } = this.props;
        const { selectedCourse }  = store.getState().challenge;
        // get current details in challenge store and send to challengee
        const challengeStore = {
            ...getChallengeStore(store.getState()),
            selectedOpponent: getUserSelector(store.getState()),
        };

        store.dispatch(setChallengeReqStatusRequest('pending'));
        this.socket.emit(selectUser, 
            { challengeStore, subject: selectedCourse, user: selectedUser  }
        );
        
    }

    // sendMessage = text => {
    //     const { connected } = this.state;

    //     if (connected) this.socket.emit(message, { text });
    // }

    render() {
        const { Component, pageProps, router, store } = this.props;

        if (router.pathname.includes('/admin')) {
            let page = router.pathname.split('/admin/')[1];
            if (!page) {
                page = 'home';
            }

            return (
                <Container>
                    <Provider store={store}>
                        <Layout selectedMenuItem={page}>
                            <Component
                                {...pageProps}
                                socket={this.socket}
                                getUserList={this.getUserList}
                                challengeUserRequest={this.challengeUser}
                            />
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

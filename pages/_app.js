import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { saveSessionRequest } from '../components/auth/actions';
import createStore from "../store";
import Layout from '../components/layout';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }){
        let pageProps = {};
        const { req, store, isServer } = ctx;
        
        //  if in server, get cookie and fetch user
        if (isServer){
            const { cookie } = req.headers;
            if (cookie){
                store.dispatch(saveSessionRequest({ cookie }));
            }
        }

        if (Component.getInitialProps){
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

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
                            <Component {...pageProps} />
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

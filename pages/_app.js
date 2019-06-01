import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { auth } from '../utils/auth';
import createStore from "../store";
import Layout from '../components/layout';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }){
        let pageProps = {};

        // if user tries to access admin route, redirect to
        // login page
        
        if (Component.getInitialProps){
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render(){
        const { Component, pageProps, router, store } = this.props;
        console.log(router.pathname)
        
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

/* eslint-disable consistent-return */
import React, { Component } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import axios from 'axios';
import jsCookie from 'js-cookie';

export const getSession = ctx => {
    let cookie;

    if (process.browser){
        cookie = jsCookie.get('cookie');
    }
    else{
        cookie = ctx.req.headers.cookie;
    }
    
    return { cookie };
};

export const getUser = async (ctx, sessionInfo) => {
    const { req } = ctx;
    let userData = null;
    
    try {
        const protocol =
            process.env.NODE_ENV === 'production' ? 'https' : 'http';

        const apiUrl = process.browser
            ? `${protocol}://${window.location.host}/api/users/users`
            : `${protocol}://${req.headers.host}/api/users/users`;
        
        const headers = req ? sessionInfo : undefined;
        const response = await axios.get(apiUrl, {
            headers,
        });

        const { data } = response.data;
        userData =  data.user;
        return userData;

    } catch (err) {
        return userData;
    }
}; 

const getDisplayName = WrappedComponent => {
    const { displayName, name } = WrappedComponent;
    return displayName || name || 'Component';
};

export const withAuthSync = WrappedComponent => (
    class extends Component {
        static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

        static async getInitialProps (ctx) {
            const { req, res } = ctx;
            const sessionInfo = getSession(ctx);
            const user = await getUser(ctx, sessionInfo);

            // if user isn't return, redirect to be logged in
            if (!user) {
                res.writeHead(302, { Location: '/api/users/login' });
                res.end();
                return;
            };

            console.log('user ==>', user);

            const componentProps = 
                WrappedComponent.getInitialProps &&
                (await WrappedComponent.getInitialProps(ctx, sessionInfo));
            
            return { ...componentProps, user, sessionInfo };
        }

        render(){
            return <WrappedComponent {...this.props} />;
        }
    }
);

import React, { Component } from 'react';
import Router from 'next/router';

const getDisplayName = WrappedComponent => {
    const { displayName, name } = WrappedComponent;
    return displayName || name || 'Component';
};

const withAuthSync = WrappedComponent => (
    class extends Component {
        static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

        static async getInitialProps(ctx) {
            const { res, store } = ctx;

            const { auth } = store.getState();
            const { session } = auth;

            // if session isn't available, redirect to be logged in
            if (!session) {
                if (process.browser) {
                    return Router.push('/api/users/login');
                }
                res.writeHead(302, { Location: '/api/users/login' });
                return res.end();
            };

            const componentProps =
                WrappedComponent.getInitialProps &&
                (await WrappedComponent.getInitialProps(ctx));

            return { ...componentProps };
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
);

export default withAuthSync;

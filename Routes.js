import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/hoc/Layout';
import Home from './components/Home';

const Routes = () => (
    <div>
        <Layout>
            <Switch>
                <Route exact component={Home} path="/" />
            </Switch>
        </Layout>
    </div>
);

export default Routes;

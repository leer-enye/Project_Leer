import React from 'react';
import { components } from '../../../components/challenge';
import Layout from '../../../components/layout';

const { OpponentSelect } = components;

const ChooseOpponentPage = () => (
    <Layout selectedMenuItem="challenge">
        <OpponentSelect next='/admin/challenge/challenge-info' />
    </Layout>
);

export default ChooseOpponentPage;

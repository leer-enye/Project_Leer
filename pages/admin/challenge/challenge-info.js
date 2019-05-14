import React from 'react';
import { components } from '../../../components/challenge';
import Layout from '../../../components/layout';

const { ChallengeInfo } = components;

const ChallengeInfoPage = () => (
    <Layout selectedMenuItem="challenge">
        <ChallengeInfo next='/admin/challenge/challenge-info' />
    </Layout>
);

export default ChallengeInfoPage;

import React from 'react';
import Layout from '../../../components/layout';
import { components } from '../../../components/challenge';

const { CourseSelect } = components;

const ChallengeHome = () => (
    <Layout selectedMenuItem="challenge">
        <CourseSelect next='/admin/challenge/select-mode' />
    </Layout>
);
    
export default ChallengeHome;

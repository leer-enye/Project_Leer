import React from 'react';
import { components } from '../../../components/challenge';
import Layout from '../../../components/layout';

const { ModeSelect } = components;

const SelectModePage = () => (
    <Layout selectedMenuItem="challenge">
        <ModeSelect next='/admin/challenge/choose-opponent' />
    </Layout>
);

export default SelectModePage;

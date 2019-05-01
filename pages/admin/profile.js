import React from 'react';
import Layout from '../../components/layout';
import { components } from '../../components/profile';

const { ViewProfile } = components;

const Profile = () => (
    <Layout selectedMenuItem="profile">
        <ViewProfile />
    </Layout>
);

export default Profile;

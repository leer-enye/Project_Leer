import React from 'react';
import Layout from '../../components/Layout';
import { ViewProfile } from "../../components/profile";

const Profile = () => (
    <Layout selectedMenuItem="profile">
        <ViewProfile />
    </Layout>
);

export default Profile;

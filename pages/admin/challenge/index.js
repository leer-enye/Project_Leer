import React from 'react';
import Layout from '../../../components/layout';
import { components } from '../../../components/challenge';
import { constants } from '../../../components/common';

const { SELECTED_MENU_ITEM, NEXT_LINKS } = constants;
const { challenge } = SELECTED_MENU_ITEM;
const { modeSelectLink } = NEXT_LINKS;
const { CourseSelect } = components;

const ChallengeHome = () => (
    <Layout selectedMenuItem={challenge}>
        <CourseSelect next={modeSelectLink} />
    </Layout>
);
    
export default ChallengeHome;
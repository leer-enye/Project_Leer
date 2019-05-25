import React from 'react';
import { components } from '../../../components/challenge';
import Layout from '../../../components/layout';
import { constants } from '../../../components/common';

const { SELECTED_MENU_ITEM, NEXT_LINKS } = constants;
const { challenge } = SELECTED_MENU_ITEM;
const { quizLink } = NEXT_LINKS;

const { ChallengeInfo } = components;

const ChallengeInfoPage = () => (
    <Layout selectedMenuItem={challenge}>
        <ChallengeInfo next={quizLink} />
    </Layout>
);

export default ChallengeInfoPage;

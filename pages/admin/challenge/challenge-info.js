import React from 'react';
import { components } from '../../../components/challenge';
import Layout from '../../../components/layout';
import { constants } from '../../../components/common';
import { auth, withAuthSync } from '../../../utils/auth';

const { SELECTED_MENU_ITEM, NEXT_LINKS } = constants;
const { challenge } = SELECTED_MENU_ITEM;
const { quizLink } = NEXT_LINKS;

const { ChallengeInfo } = components;

const ChallengeInfoPage = () => (
    <ChallengeInfo next={quizLink} />
);

export default withAuthSync(ChallengeInfoPage);

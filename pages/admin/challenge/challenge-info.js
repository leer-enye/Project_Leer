import React from 'react';
import { components } from '../../../components/challenge';
import { constants } from '../../../components/common';
import withAuthSync from '../../../hocs/withAuthSync';

const { NEXT_LINKS } = constants;
const { quizLink } = NEXT_LINKS;

const { ChallengeInfo } = components;

const ChallengeInfoPage = () => (
    <ChallengeInfo next={quizLink} />
);

export default withAuthSync(ChallengeInfoPage);

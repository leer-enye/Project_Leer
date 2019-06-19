import React from 'react';
import { connect } from 'react-redux';

import { components, selectors as challengeSelectors } from '../../../components/challenge';
import { selectors as authSelectors } from '../../../components/auth';
import { constants } from '../../../components/common';
import withAuthSync from '../../../hocs/withAuthSync';

const { NEXT_LINKS } = constants;
const { quizLink } = NEXT_LINKS;
const { ChallengeInfo } = components;
const {
    getUser,
} = authSelectors;
const {
    getSelectedOpponent,
} = challengeSelectors;

const ChallengeInfoPage = ({ challengers }) => (
    <ChallengeInfo challengers={challengers} next={quizLink} />
);

const mapStateToProps = state => ({
    challengers: [getUser(state), getSelectedOpponent(state)],
    
});

export default withAuthSync(connect(mapStateToProps, null)(ChallengeInfoPage));

import { Row, Col } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { selectors as authSelectors } from '../../../components/auth';
import { components, selectors as challengeSelectors } from '../../../components/challenge';
import { constants } from '../../../components/common';
import withAuthSync from '../../../hocs/withAuthSync';

const { getUser } = authSelectors;
const { getChallengeScores, getSelectedOpponent } = challengeSelectors;

const { 
    FLEX_ROW_TYPE,
    FLEX_ROW_JUSTIFY_CENTER,
} = constants;
const { ChallengeResult } = components;

const ChallengeResultPage = ({ challengeScores, challengers }) => (
    <Row type={FLEX_ROW_TYPE} justify={FLEX_ROW_JUSTIFY_CENTER}>
        <Col span={18} md={18} xs={24}>
            <ChallengeResult 
                challengeScores={challengeScores}
                challengers={challengers}
            />
        </Col>
    </Row>
);

const mapStateToProps = state => ({
    challengeScores: getChallengeScores(state),
    challenger: [getUser(state), getSelectedOpponent(state)],
});

export default withAuthSync(connect(mapStateToProps, null)(ChallengeResultPage));

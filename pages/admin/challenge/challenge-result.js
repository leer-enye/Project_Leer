import React from 'react';
import { Row, Col } from 'antd';
import { components } from '../../../components/challenge';
import Layout from '../../../components/layout';
import { constants } from '../../../components/common';
import { auth, withAuthSync } from '../../../utils/auth';

const { 
    FLEX_ROW_TYPE,
    FLEX_ROW_JUSTIFY_CENTER,
    SELECTED_MENU_ITEM,
} = constants;
const { challenge } = SELECTED_MENU_ITEM;
const { ChallengeResult } = components;

const ChallengeResultPage = () => (
    <Row type={FLEX_ROW_TYPE} justify={FLEX_ROW_JUSTIFY_CENTER}>
        <Col span={18} md={18} xs={24}>
            <ChallengeResult />
        </Col>
    </Row>
);

export default withAuthSync(ChallengeResultPage);

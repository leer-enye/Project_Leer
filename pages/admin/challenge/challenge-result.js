import React from 'react';
import { Row, Col } from 'antd';
import { components } from '../../../components/challenge';
import Layout from '../../../components/layout';
import { constants } from '../../../components/common';

const { SELECTED_MENU_ITEM } = constants;
const { challenge } = SELECTED_MENU_ITEM;
// const { quizLink } = NEXT_LINKS;
const { ChallengeResult } = components;

const ChallengeResultPage = () => (
    <Layout selectedMenuItem={challenge}>
        <Row type='flex' justify='center'>
            <Col span={18} md={18} xs={24}>
                <ChallengeResult />
            </Col>
        </Row>
    </Layout>
);

export default ChallengeResultPage;

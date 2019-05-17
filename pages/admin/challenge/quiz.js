import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Layout from '../../../components/layout';
import { components } from '../../../components/challenge';
import { constants } from '../../../components/common';

const { Quiz } = components;
const {
    FLEX_ROW_JUSTIFY_CENTER,
    FLEX_ROW_TYPE,
    SELECTED_MENU_ITEM,
    NEXT_LINKS,
} = constants;
const { challenge } = SELECTED_MENU_ITEM;
const { challengeResultLink } = NEXT_LINKS;

class QuizPage extends Component {
    state = {}

    render(){
        return ( 
            <Layout selectedMenuItem={challenge}> 
                <Row type={FLEX_ROW_TYPE} justify={FLEX_ROW_JUSTIFY_CENTER}>
                    <Col span={18} md={18} xs={22}>
                        <Quiz next={challengeResultLink} />
                    </Col>
                </Row>
            </Layout>
        );
    }
}

export default QuizPage;

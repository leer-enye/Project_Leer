import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Layout from '../../../components/layout';
import { components } from '../../../components/challenge';
import { constants } from '../../../components/common';

const { Quiz } = components;
const { SELECTED_MENU_ITEM } = constants;
const { challenge } = SELECTED_MENU_ITEM;

class QuizPage extends Component {
    state = {}

    render(){
        return ( 
            <Layout selectedMenuItem={challenge}> 
                <Row type='flex' justify='center'>
                    <Col span={18} md={18} xs={22}>
                        <Quiz />
                    </Col>
                </Row>
            </Layout>
        );
    }
}

export default QuizPage;

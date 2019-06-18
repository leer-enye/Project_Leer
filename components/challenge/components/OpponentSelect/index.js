/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import Router from 'next/router';
import { Typography, Row, Card, Col, Button } from 'antd';

import {
    BUTTON_SIZE_LG,
    BUTTON_TYPE_PRIMARY,
    CHALLENGE_PAGES_HEADERS,
    CLASS_NAMES,
    DEFAULT_PROPS,
    SELECT_RANDOMLY
} from '../../constants';
import './index.scss';

const { Title } = Typography;
const { chooseOpponentLabel } = CHALLENGE_PAGES_HEADERS;
const { opponentSelect } = DEFAULT_PROPS;
const {
    mb0,
    mb1,
    mb4,
    mt4,
    onlineIcon,
    opponentCard,
    opponentCardImg,
    opponentCardTextContent,
} = CLASS_NAMES;

class OpponentSelect extends Component{
    state  = {}

    handleSelect = opponent => {
        const { challengeUserRequest, selectOpponent, next } = this.props;
        selectOpponent(opponent);
        challengeUserRequest(opponent);
        Router.push(next);
    };

    render(){
        const { onlineUsers } = this.props;
        return (
            <section>
                <Title level={3}> {chooseOpponentLabel}</Title>

                <Row gutter={8} className={mt4}>

                    <Col span={24} className={mb4}>
                        <Button
                            size={BUTTON_SIZE_LG}
                            type={BUTTON_TYPE_PRIMARY}
                        >
                            {SELECT_RANDOMLY}
                        </Button>
                    </Col>

                    {onlineUsers.map(({ id, name, picture }) => (
                        <Col key={id} span={8} md={8} xs={24} className={mb1}>
                            <div onClick={() => this.handleSelect({ id, name, picture })}>
                                <Card className={opponentCard} hoverable>
                                    <img
                                        className={opponentCardImg}
                                        src={picture}
                                        alt={`${name}`}
                                    />
                                    <div className={opponentCardTextContent}>
                                        <Title level={4} className={mb0}>{name}</Title>
                                        <div className={onlineIcon} />
                                    </div>

                                </Card>
                            </div>
                        </Col>
                    ))}
                </Row>
            </section>
        );
    }

}

OpponentSelect.defaultProps = {
    opponents: opponentSelect.opponents,
};

export default OpponentSelect;

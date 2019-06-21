/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import Router from 'next/router';
import { Typography, Row, Card, Col, Button, Icon, notification } from 'antd';

import {
    BUTTON_SIZE_LG,
    BUTTON_TYPE_PRIMARY,
    CHALLENGE_PAGES_HEADERS,
    CLASS_NAMES,
    DEFAULT_PROPS,
    REFRESH_LIST,
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

const NOTIFICATION_KEY = 'updatable';

class OpponentSelect extends Component{
    state  = {}

    componentDidMount(){
        const { next } = this.props;
        // prefetch next page on time
        Router.prefetch(next);
    }

    componentDidUpdate(prevProps){
        const { challengeReqStatus, next } = this.props;
        // if there is no change in challenge request status, return
        if (prevProps.challengeReqStatus === challengeReqStatus){
            return;
        }
        
        if (challengeReqStatus === 'approved'){
            notification.open({
                description: `Opponent accepted request`,
                icon: <Icon style={{ color: '#52C41A' }} type="check-circle" />,
                key: NOTIFICATION_KEY,
                message: 'Challenge Request Info',

            });
            notification.close({
                key: NOTIFICATION_KEY,
            });
            Router.replace(next);
        }

        if (challengeReqStatus === 'rejected'){
            notification.open({
                description: `Opponent rejected your challenge request`,
                icon: <Icon style={{ color: '#F5212D' }} type="close-circle" />,
                key: NOTIFICATION_KEY,
                message: 'Challenge Request Info',

            });
            notification.close({
                key: NOTIFICATION_KEY,
            });
        }

    };

    handleSelect = opponent => {
        const { challengeUserRequest, selectOpponent } = this.props;
        selectOpponent(opponent);
        challengeUserRequest(opponent);
        notification.open({
            description: `Waiting for ${opponent.name}'s response`,
            duration: 0,
            icon: <Icon type="loading" />,
            key: NOTIFICATION_KEY,
            message: 'Challenge Request Info',
            
        });
        // Router.push(next);
    };

    render(){
        const { onlineUsers, refreshUserList } = this.props;
        // if challenge request has been approved redirect to challenge info page
        
        return (
            <section>
                <Title level={3}> {chooseOpponentLabel}</Title>
                <Row gutter={8} className={mt4}>

                    <Col span={24} className={mb4}>
                        <Button
                            type={BUTTON_TYPE_PRIMARY}
                            size={BUTTON_SIZE_LG}
                        >
                            {SELECT_RANDOMLY}
                        </Button>
                    </Col>

                    <Col span={24} className={mb1}>
                        <Button
                            onClick={refreshUserList}
                        >
                            {REFRESH_LIST}
                            
                        </Button>
                    </Col>
                    {/* TODO */}
                    {/* There should  be consisitency in backend between id and _id */}
                    {onlineUsers.map(({ id, name, picture }) => (
                        <Col key={id} span={8} md={8} xs={12} className={mb1}>
                            <Card className={opponentCard} hoverable>
                                <div onClick={() => this.handleSelect({ _id: id, id, name, picture })}>
                                    <img
                                        className={opponentCardImg}
                                        src={picture}
                                        alt={`${name}`}
                                    />
                                    <div className={opponentCardTextContent}>
                                        <div className={onlineIcon} />
                                        <Title level={4} className={mb0}>{name}</Title>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
                {/* {
                    challengeReqStatus === 'pending' ?
                        message.loading('Waiting for response from opponent', 0)
                        :  null
                } */}
            </section>
        );
    }

}

OpponentSelect.defaultProps = {
    opponents: opponentSelect.opponents,
};

export default OpponentSelect;

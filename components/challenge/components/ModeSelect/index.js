/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import Link from 'next/link';
import { Row, Col, Typography, Card, Icon } from 'antd';
import Router from 'next/router';

import {
    CHALLENGE_PAGES_HEADERS,
    CHALLENGE_MODES,
    CLASS_NAMES,
    FLEX_ROW_TYPE,
    FLEX_ROW_JUSTIFY_CENTER
} from '../../constants';
import './index.scss';

const { Title } = Typography;
const { modeCard, modeCardIcon, mt1, mt4 } = CLASS_NAMES;
const { modeSelectLabel } = CHALLENGE_PAGES_HEADERS;

const SelectMode = ({ selectMode }) => {
    
    const handleSelect = (mode, next) => {
        selectMode(mode);
        Router.push(next);
    };

    return (
        <section>
            <Title level={3}> {modeSelectLabel}</Title>
            <Row
                gutter={16}
                type={FLEX_ROW_TYPE}
                justify={FLEX_ROW_JUSTIFY_CENTER}
                className={mt4}
            >
                {
                    CHALLENGE_MODES.map(({ icon, name, next }) => (
                        <Col key={name} span={8} md={6} xs={24} className={mt1}>
                            <div onClick={() => handleSelect(name, next)}>
                                <Card className={modeCard} hoverable>
                                    <Icon className={modeCardIcon} type={icon} />
                                    <Title level={3}>{name}</Title>
                                </Card>
                            </div>
                        </Col>
                    ))
                }
            </Row>
        </section>
    );
};

export default SelectMode;

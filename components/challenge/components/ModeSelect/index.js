import React, { Component } from 'react';
import Link from 'next/link';
import { Row, Col, Typography, Card, Icon } from 'antd';
import { 
    CHALLENGE_PAGES_HEADERS,
    CHALLENGE_MODES, 
    CLASSNAMES, 
    FLEX_ROW_TYPE, 
    FLEX_ROW_JUSTIFY_CENTER
} from '../../constants';
import './index.scss';

const { Title } = Typography;
const { modeCard, modeCardIcon, mt1, mt4 } = CLASSNAMES;
const { modeSelectLabel } = CHALLENGE_PAGES_HEADERS;

class SelectMode extends Component {
    state = {}

    render() {
        return (
            <section>
                <Title level={3}> { modeSelectLabel }</Title>
                <Row 
                    gutter={16} 
                    type={FLEX_ROW_TYPE} 
                    justify={FLEX_ROW_JUSTIFY_CENTER} 
                    className={mt4}
                >
                    {
                        CHALLENGE_MODES.map(({ icon, name, next }) => (
                            <Col key={name} span={8} md={8} xs={24}  className={mt1}>
                                <Link href={next}>
                                    <Card className={modeCard} hoverable>
                                        <Icon className={modeCardIcon} type={icon} />
                                        <Title level={3}>{name}</Title>
                                    </Card>
                                </Link>
                            </Col>
                        ))
                    }
                </Row>
            </section>
        );
    }
}

export default SelectMode;

import React from 'react';
import Link from 'next/link';
import { Row, Col, Typography, Button } from 'antd';

import {
    BUTTON_SIZE_LG,
    BUTTON_TYPE_PRIMARY,
    CHALLENGE_PAGES_HEADERS,
    CLASS_NAMES,
    DEFAULT_PROPS,
    EXTRA_TEXTS,
    FLEX_ROW_JUSTIFY_CENTER,
    FLEX_ROW_TYPE
} from "../../constants";
import { DUMMY_PARAGRAPH } from '../../../common/constants';
import './index.scss';

const { Title, Paragraph } = Typography;
const { challengeInfoLabel } = CHALLENGE_PAGES_HEADERS;
const {
    challengerInfo,
    challengersBox,
    details,
    mb0,
    mb1,
    mb2,
    mt4,
    textCenter,
    vsDivider,
} = CLASS_NAMES;
const { challengeInfo } = DEFAULT_PROPS;
const { startNow, vs } = EXTRA_TEXTS;

const ChallengeInfo = ({ challengers, next }) => (
    <section>
        <Title level={3}> {challengeInfoLabel} </Title>
        <Row
            gutter={16}
            type={FLEX_ROW_TYPE}
            justify={FLEX_ROW_JUSTIFY_CENTER}
            className={`${mt4} ${mb2}`}
        >
            <Col span={16} md={16} xs={24} className={mb1}>
                <div className={challengersBox}>
                    {
                        challengers.map(({ id, picture, level, name }, index) => (
                            <React.Fragment key={id}>
                                <div className={challengerInfo}>
                                    <img src={picture} alt={name} />
                                    <h3 className={mb0}>{name}</h3>
                                    <p>{level}</p>
                                </div>
                                {
                                    (index === 0) ? 
                                        <Title 
                                            className={vsDivider} 
                                            level={1}
                                        > 
                                            {vs} 
                                        </Title> : null
                                }
                            </React.Fragment>
                        ))
                    }
                </div>
            </Col>
            <Col span={16}>
                <Title level={3}> {details} </Title>
                <Paragraph className={mb2}>
                    {DUMMY_PARAGRAPH}
                </Paragraph>
                <div className={textCenter}>
                    <Link href={next}>
                        <Button
                            size={BUTTON_SIZE_LG}
                            type={BUTTON_TYPE_PRIMARY}
                        >
                            {startNow}
                        </Button>
                    </Link>
                </div>
            </Col>
        </Row>
    </section>
);

ChallengeInfo.defaultProps = {
    challengers: challengeInfo.challengers,
};

export default ChallengeInfo;

import React from 'react';
import { Typography, Button } from 'antd';
import * as constants from '../../constants';
import './index.scss';

const { Title } = Typography;
const { 
    BUTTON_TYPE_PRIMARY,
    DEFAULT_PROPS,
    CLASS_NAMES,
    EXTRA_TEXTS,
} = constants;

const {
    challengerInfo,
    challengerInfoName,
    challengerInfoScore,
    challengersBox,
    loser,
    mb1,
    mr1,
    resultCard,
    textCenter,
    vsDivider,
    winner,
} = CLASS_NAMES;
const { greatGame, viewResults, backToHome, vs } = EXTRA_TEXTS;
const { challengeResult } = DEFAULT_PROPS;
const { defaultChallengers, defaultResultInfo } = challengeResult;

const ChallengeResult = ({ challengers, resultInfo }) => (
    <div className={resultCard}>
        <Title className={textCenter} level={2}> {resultInfo} </Title>
        <div className={challengersBox}>
            {
                challengers.map(({ id, image, score, status, username }, index) => (
                    <React.Fragment key={id}>
                        <div className={`${challengerInfo} ${(status === 'win') ? winner: loser}`}>
                            <img src={image} alt={username} />
                            <div className=''>
                                <h3 className={challengerInfoName}>{username}</h3>
                                <p className={challengerInfoScore}>{score}</p>
                            </div>
                        </div>
                        {
                            (index === 0) ? 
                                <Title className={vsDivider} level={1}> 
                                    {vs}
                                </Title> 
                                : null
                        }
                    </React.Fragment>
                ))
            }
        </div>
        <Title level={4}> {greatGame} </Title>
        <div>
            <Button type={BUTTON_TYPE_PRIMARY} className={`${mr1} ${mb1}`}>{viewResults}</Button>
            <Button >{backToHome}</Button>
        </div>
    </div>
);

ChallengeResult.defaultProps = {
    challengers: defaultChallengers,
    resultInfo: defaultResultInfo,
};

export default ChallengeResult;

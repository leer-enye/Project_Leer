import React from 'react';
import { Typography, Button } from 'antd';
import Link from 'next/link';

import * as constants from '../../constants';
import './index.scss';

const { Title } = Typography;
const { 
    BUTTON_TYPE_PRIMARY,
    DEFAULT_PROPS: { 
        challengeResult: {
            defaultChallengeScores,
            defaultChallengers,
        },
    },
    CLASS_NAMES: {
        challengerInfo,
        challengerInfoName,
        challengerInfoScore,
        challengersBox,
        resultCard,
        textCenter,
        vsDivider,
    },
    EXTRA_TEXTS: { 
        greatGame, 
        backToHome, 
        vs, 
    }, 
} = constants;

const ChallengeResult = ({ challengers, challengeScores  }) => {
    const userScore = challengeScores[challengers[0]._id];
    const opponentScore = challengeScores[challengers[1]._id || challengers[1].id];

    // oppStatus is hacky, fix this later
    let status;
    let oppStatus;
    let resultInfo;
    if (userScore > opponentScore){
        status = 'win';
        oppStatus = 'lose';
        resultInfo = 'YOU WON';
    }
    else if (userScore === opponentScore){
        status = 'draw';
        oppStatus = 'draw';
        resultInfo = 'YOU DREW';
    }
    else {
        status = 'lose';
        oppStatus = 'win';
        resultInfo = 'YOU LOST';
    }

    return (
        <div className={resultCard}>
            <Title className={textCenter} level={2}> {resultInfo} </Title>
            <div className={challengersBox}>
                {/* TODO */}
                {/* fix the inconsistency in id and _id */}

                {
                    challengers.map(({ id, _id, picture, name }, index) => (
                        <React.Fragment key={_id}>
                            <div className={
                                `${challengerInfo} 
                                ${(_id === challengers[0]._id ? status: oppStatus)}`}
                            >
                                <img src={picture} alt={name} />
                                <div className=''>
                                    <h3 className={challengerInfoName}>{name}</h3>
                                    <p className={challengerInfoScore}>{challengeScores[_id || id]}</p>
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
                <Link href='/admin/challenge'>
                    <Button >{backToHome}</Button>
                </Link>
            </div>
        </div>
    );
};

ChallengeResult.defaultProps = {
    challengeScores: defaultChallengeScores,
    challengers: defaultChallengers,
};

export default ChallengeResult;

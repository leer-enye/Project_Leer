/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
import React from 'react';
import { Row, Col, Card, Progress, Icon } from 'antd';
import * as constants from '../../constants';
import './index.scss';

const { 
    CLASS_NAMES: {
        challengerInfo,
        challengerInfo1,
        quizCard,
        quizCardHeader,
        quizCardMain,
        quizCardOption,
        quizCardQuestion,
        timer,
        timerLabel,
    },
    DEFAULT_PROPS: {
        quiz: {
            defaultChallengers, 
            question,
        },
    },
    EXTRA_TEXTS: {
        circle,
        timeLeftLabel,
    },
} = constants;

const Quiz = ({ challengers, quizItem, timeLeft, onAnswer, quizEnded }) => (
    <div className={quizCard}>
        <header className={quizCardHeader}>
            {
                challengers.map(({ _id, picture, score, name }, index) => (
                    <React.Fragment key={_id}>
                        <div 
                            className={`${challengerInfo} ${(index === 1) ? challengerInfo1 : ''}`}
                        >
                            <img src={picture} alt={name} />
                            <div>
                                <h3>{name}</h3>
                                <p>{score || 0 }</p>
                            </div>
                        </div>
                        {
                            (index === 0) && !quizEnded ?
                                <div className={timer}>
                                    <h4 className={timerLabel}>{timeLeftLabel}</h4>
                                    <Progress 
                                        type={circle}
                                        width={48} 
                                        // divide by allocated time 
                                        // for each question (Default: 10s) 
                                        percent={(timeLeft/15) * 100}
                                        format={() => `${timeLeft}s`} 
                                    />
                                </div>
                                : null
                        }
                    </React.Fragment>
                ))
            }
        </header>
        <div className={quizCardMain}>
            {
                !quizEnded ? 
                    <React.Fragment>
                        <p 
                            className={quizCardQuestion} 
                            dangerouslySetInnerHTML={{ __html: quizItem.text }}>
                        </p>

                        <div>
                            <Row gutter={16}>
                                {
                                    quizItem.options.map((value, id) => (
                                        <Col key={`${value}_${id}`} span={12} md={12} xs={24} >
                                            <Card
                                                onClick={() => onAnswer(id)}
                                                className={quizCardOption}
                                                hoverable
                                            >
                                                <div 
                                                    dangerouslySetInnerHTML={{ __html: value }}
                                                >

                                                </div>
                                            </Card>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </div>
                    </React.Fragment>:
                    <p> Waiting for Opponent to submit <Icon type="loading" /> </p>
            }
            
        </div>
    </div>
);

Quiz.defaultProps = {
    challengers: defaultChallengers,
    quizItem: question,
};

export default Quiz;

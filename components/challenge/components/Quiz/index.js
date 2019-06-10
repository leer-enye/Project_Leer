import React from 'react';
import { Row, Col, Card, Progress } from 'antd';
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

const Quiz = ({ challengers, quizItem, timeLeft, onAnswer }) => (
    <div className={quizCard}>
        <header className={quizCardHeader}>
            {
                challengers.map(({ id, image, score, username }, index) => (
                    <React.Fragment key={id}>
                        <div 
                            className={`${challengerInfo} ${(index === 1) ? challengerInfo1 : ''}`}
                        >
                            <img src={image} alt={username} />
                            <div>
                                <h3>{username}</h3>
                                <p>{score}</p>
                            </div>
                        </div>
                        {
                            (index === 0) ?
                                <div className={timer}>
                                    <h4 className={timerLabel}>{timeLeftLabel}</h4>
                                    <Progress 
                                        type={circle}
                                        width={48} 
                                        // divide by allocated time 
                                        // for each question (Default: 10s)
                                        percent={(timeLeft/10) * 100}
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
            <p className={quizCardQuestion}>
                { quizItem.question }
            </p>
            <div>
                <Row gutter={16}>
                    {
                        quizItem.options.map(({ id, value }) => (
                            <Col key={id} span ={12} md = {12} xs = {24} >
                                <Card onClick={onAnswer} className={quizCardOption} hoverable>
                                    { value }
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        </div>
    </div>
);

Quiz.defaultProps = {
    challengers: defaultChallengers,
    quizItem: question,
};

export default Quiz;

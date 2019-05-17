import React from 'react';
import { Row, Col, Card } from 'antd';
import * as constants from '../../constants';
import './index.scss';

const { 
    CLASS_NAMES,
    DEFAULT_PROPS,
    EXTRA_TEXTS,
} = constants;
const {
    challengerInfo,
    challengerInfo1,
    quizCard,
    quizCardHeader,
    quizCardMain,
    quizCardOption,
    quizCardQuestion,
    timer,
    timerLabel,
    timerTime,
} = CLASS_NAMES;
const { quiz } = DEFAULT_PROPS;
const { timeLeft } = EXTRA_TEXTS;
const { defaultChallengers, question } = quiz;

const Quiz = ({ challengers, quizItem }) => (
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
                                    <h4 className={timerLabel}>{timeLeft}</h4>
                                    <span className={timerTime}>20</span>
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
                                <Card className={quizCardOption} hoverable>
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

import { Row, Col } from 'antd';
import Router from 'next/router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectors as authSelectors } from '../../../components/auth';
import { components, selectors as challengeSelectors } from '../../../components/challenge';
import { constants } from '../../../components/common';
import withAuthSync from '../../../hocs/withAuthSync';

const { Quiz } = components;
const { getUser } = authSelectors;
const { getQuestions, getSelectedOpponent } = challengeSelectors;
const {
    DEFAULT_PROPS,
    FLEX_ROW_JUSTIFY_CENTER,
    FLEX_ROW_TYPE,
    NEXT_LINKS,
} = constants;
const { challengeResultLink } = NEXT_LINKS;
const { quizPage } = DEFAULT_PROPS;

class QuizPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            questionIndex: 0,
            quizActive: false,
            score: 0, // users score
            seconds: 10,
            
        };

        this.timer = 0;
    }

    componentDidMount(){
        const { quizActive } = this.state;
        
        if (!quizActive){
            this.setState({ questionIndex: 0, quizActive: true  }, () => {
                this.startTimer();
            });
        }
    }

    componentWillUnmount(){
        // clear any active timer once component is unmounting
        clearInterval(this.timer);
    }

    countDown = () => {
        const { seconds } = this.state;
        
        // if time has elapsed, clear timer and move to next question
        if (seconds === 0) {
            clearInterval(this.timer);
            return this.nextQuestion();
        };
        
        // reduce seconds by 1 and update timer
        const newTime = seconds - 1;
        return this.setState({ seconds: newTime });
    }

    startTimer = () =>  {
        const { seconds } = this.state;
         
        if (this.timer === 0 && seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    onAnswerQuestion = answer => {
        const { questions } = this.props;
        const { questionIndex, score } = this.state;
        const question = questions[questionIndex];
        
        if (parseInt(answer, 10) === question.answer){
            const newScore = score + 10;
            return this.setState({ score: newScore }, () => {
                this.nextQuestion();
            });
        };

        return this.nextQuestion();
    }
    
    nextQuestion = () => {
        const { questionIndex } = this.state;
        const { questions } = this.props;
        const newQuestionIndex = questionIndex + 1;
        
        // reset timer and move to next question if all questions have been answered
        if (newQuestionIndex < questions.length){
            return this.setState({ questionIndex: newQuestionIndex, seconds: 10  }, () => {
                this.timer = 0;
                this.startTimer();
            });
        }

        // if all questions have been answered, redirect to result page
        return this.setState( { questionIndex: 0, quizActive: false }, () => {
            Router.push('/admin/challenge/challenge-result');
        });
    }

    render(){
        const { seconds, questionIndex } = this.state;
        const { questions, challengers } = this.props;
        console.log(challengers);
        return ( 
            <Row type={FLEX_ROW_TYPE} justify={FLEX_ROW_JUSTIFY_CENTER}>
                <Col span={18} md={18} xs={22}>
                    <Quiz 
                        challengers={challengers}
                        quizItem={ questions[questionIndex] } 
                        onAnswer={this.onAnswerQuestion}  
                        next={challengeResultLink} 
                        timeLeft={seconds} 
                    />
                </Col>
            </Row>
        );
    }
}

QuizPage.defaultProps = {
    questions: quizPage.questions,
};

const mapStateToProps = state => ({
    challengers: [getUser(state), getSelectedOpponent(state)],
    questions: getQuestions(state),
});

export default withAuthSync(connect(mapStateToProps, null)(QuizPage));

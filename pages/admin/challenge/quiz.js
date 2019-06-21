import { Row, Col } from 'antd';
import Router from 'next/router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectors as authSelectors } from '../../../components/auth';
import { 
    actions, 
    components, 
    selectors as challengeSelectors 
} from '../../../components/challenge';
import { constants } from '../../../components/common';
import withAuthSync from '../../../hocs/withAuthSync';

const { setCurrentQuestionRequest } = actions;
const { Quiz } = components;
const { getUser } = authSelectors;
const { 
    getChallengeScores,
    getChallengeEndStatus,
    getCurrentQuestion, 
    getQuestions, 
    getSelectedOpponent, 
} = challengeSelectors;
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
            quizActive: false,
            quizEnded: false,
            score: 0, // users score
            seconds: 15,
        };

        this.timer = 0;
    }

    componentDidMount(){
        const { quizActive, quizEnded } = this.state;
        
        // if quiz has ended return 
        if (quizEnded){
            return;
        };

        // this is executed first time component is mounted
        if (!quizActive){
            console.log('first time quiz is started \n\n');
            this.setState({ quizActive: true, seconds: 15 }, () => {
                this.startTimer();
            });
        }
    }

    componentDidUpdate(prevProps) {
        const { challengeScores } = this.props;

        if (prevProps.challengeScores === null && challengeScores) {
            console.log('previous challengeScores is => ', prevProps.challengeScores);
            console.log('current challengeScores is => ', challengeScores);
            Router.replace(challengeResultLink);
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
            return this.onAnswerQuestion(null);
        };
        
        // reduce seconds by 1 and update timer
        const newTime = seconds - 1;
        return this.setState({ seconds: newTime });
    }

    startTimer = () =>  {
        const { seconds } = this.state;
         
        if (this.timer === 0 && seconds > 0) {
            console.log('Countdown started again');
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    onAnswerQuestion = answer => {
        const { questions, currentQuestionIndex } = this.props;
        const { score } = this.state;
        const question = questions[currentQuestionIndex];
        
        // if user is wrong, move to the next question
        // without updating score
        if (parseInt(answer, 10) !== question.answer){
            return this.nextQuestion();
        };

        // if user is right, update score
        const newScore = score + 10;
        return this.setState({ score: newScore }, () => this.nextQuestion());
    }
    
    nextQuestion = () => {
        const { score } = this.state;
        const { 
            currentQuestionIndex, 
            questions, 
            setCurrentQuestion, 
            submitScore, 
            user, 
        } = this.props;
        const newQuestionIndex = currentQuestionIndex + 1;
        
        // reset timer and move to next question if all questions have been answered
        if (newQuestionIndex < questions.length){
            // set the index of the next question in store
            setCurrentQuestion(newQuestionIndex);
            // clear any existing setInterval
            // before restarting timer
            clearInterval(this.timer);
            this.timer = 0;
            return this.setState({ seconds: 15  }, () => this.startTimer());
        }

        // if all questions have been answered, submit score to backend and
        // clear timer
        clearInterval(this.timer);
        return this.setState({ quizActive: false, quizEnded: true, seconds: 0 }, () => {
            console.log('got to end of the quiz');
            submitScore({ score, userId: user._id });
        });
    }

    render(){
        const { seconds, quizEnded } = this.state;
        const { questions, currentQuestionIndex, challengers, challengeScores } = this.props;

        return ( 
            <Row type={FLEX_ROW_TYPE} justify={FLEX_ROW_JUSTIFY_CENTER}>
                <Col span={18} md={18} xs={22}>
                    <Quiz 
                        challengers={challengers}
                        quizItem={ questions[currentQuestionIndex] } 
                        quizEnded={quizEnded}
                        onAnswer={this.onAnswerQuestion}  
                        timeLeft={seconds}
                        challengeScores={challengeScores}
                        challengeResultLink={challengeResultLink} 
                    />
                </Col>
            </Row>
        );
    }
}

QuizPage.defaultProps = {
    questions: quizPage.questions,
};

const mapDispatchToProps = dispatch => ({
    setCurrentQuestion: questionIndex => dispatch(setCurrentQuestionRequest(questionIndex)), 
});

const mapStateToProps = state => ({
    challengeEndStatus: getChallengeEndStatus(state),
    challengeScores: getChallengeScores(state),
    challengers: [getUser(state), getSelectedOpponent(state)],
    currentQuestionIndex: getCurrentQuestion(state),
    questions: getQuestions(state),
    user: getUser(state),
});

export default withAuthSync(connect(mapStateToProps, mapDispatchToProps)(QuizPage));

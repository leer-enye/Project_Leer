import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

import { selectors as authSelectors } from '../../../components/auth';
import { components, selectors as challengeSelectors } from '../../../components/challenge';
import { constants } from '../../../components/common';
import withAuthSync from '../../../hocs/withAuthSync';

const { NEXT_LINKS } = constants;
const { quizLink } = NEXT_LINKS;
const { ChallengeInfo } = components;
const {
    getUser,
} = authSelectors;
const {
    getSelectedOpponent,
} = challengeSelectors;

class ChallengeInfoPage extends Component{ 
    constructor(props){
        super(props);
        this.state = {
            seconds: 5,
            timerStarted: false,
        };

        this.timer = 0;
    }

    componentDidMount(){
        const { timerStarted }  = this.state;
        
        if (!timerStarted){
            this.setState({ timerStarted: true }, () => 
                this.startTimer()
            );
        }
    }

    componentWillUnmount(){
        // clear any active timer once component unmounts
        clearInterval(this.timer);
    }

    countDown = () => {
        const { seconds } = this.state;
        
        // if time has elapsed, clear timer and move to quiz page
        if ( seconds === 0 ){
            clearInterval(this.timer);
            return Router.replace(quizLink);
        }

        const newTime = seconds - 1;
        return this.setState({ seconds: newTime });
    }

    startTimer = () => {
        const { seconds } = this.state;

        if (this.timer === 0 && seconds > 0 ){
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    render(){
        const { challengers } = this.props;
        const { seconds } = this.state;
        return <ChallengeInfo challengers={challengers} timeLeft={seconds} />;
    }
}

const mapStateToProps = state => ({
    challengers: [getUser(state), getSelectedOpponent(state)],
    
});

export default withAuthSync(connect(mapStateToProps, null)(ChallengeInfoPage));

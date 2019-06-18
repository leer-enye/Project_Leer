import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actions, components, selectors } from '../../../components/challenge';
import { constants } from '../../../components/common';
import withAuthSync from '../../../hocs/withAuthSync';

const { selectOpponentRequest } = actions;
const { NEXT_LINKS } = constants;
const { challengeInfoLink } = NEXT_LINKS;
const { OpponentSelect } = components;
const { getOnlineUsers, getChallengeReqStatus } = selectors;

class ChooseOpponentPage extends Component { 
    state= {} 

    componentDidMount(){
        const { getUserList } =  this.props;
        getUserList();
    }

    render(){
        const { 
            onlineUsers,
            selectOpponent,
            challengeReqStatus,
            challengeUserRequest, 
        } = this.props;

        return (  
            <OpponentSelect 
                selectOpponent={selectOpponent}
                challengeUserRequest={challengeUserRequest} 
                challengeReqStatus={challengeReqStatus}
                onlineUsers={onlineUsers} 
                next={challengeInfoLink} 
            />
        );
    };

}

const mapStateToProps = state => ({
    challengeReqStatus: getChallengeReqStatus(state),
    onlineUsers: getOnlineUsers(state),
});

const mapDispatchToProps = dispatch => ({
    selectOpponent: data => dispatch(selectOpponentRequest(data)),
});

export default withAuthSync(connect(mapStateToProps, mapDispatchToProps)(ChooseOpponentPage));

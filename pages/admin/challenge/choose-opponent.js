import React from 'react';
import { connect } from 'react-redux';

import { actions, components, selectors } from '../../../components/challenge';
import { constants } from '../../../components/common';
import withAuthSync from '../../../hocs/withAuthSync';

const { selectOpponentRequest } = actions;
const { NEXT_LINKS } = constants;
const { challengeInfoLink } = NEXT_LINKS;
const { OpponentSelect } = components;
const { getOnlineUsers } = selectors;

const ChooseOpponentPage = ({ onlineUsers, selectOpponent, challengeUserRequest }) => (
    <OpponentSelect 
        selectOpponent={selectOpponent}
        challengeUserRequest={challengeUserRequest} 
        onlineUsers={onlineUsers} 
        next={challengeInfoLink} 
    />
);

const mapStateToProps = state => ({
    onlineUsers: getOnlineUsers(state),
});

const mapDispatchToProps = dispatch => ({
    selectOpponent: data => dispatch(selectOpponentRequest(data)),
});

export default withAuthSync(connect(mapStateToProps, mapDispatchToProps)(ChooseOpponentPage));

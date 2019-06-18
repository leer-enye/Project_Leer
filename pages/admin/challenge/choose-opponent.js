import React from 'react';
import { connect } from 'react-redux';

import { components, selectors } from '../../../components/challenge';
import { constants } from '../../../components/common';
import withAuthSync from '../../../hocs/withAuthSync';

const { NEXT_LINKS } = constants;
const { challengeInfoLink } = NEXT_LINKS;
const { OpponentSelect } = components;
const { getOnlineUsers } = selectors;

const ChooseOpponentPage = ({ onlineUsers }) => (
    <OpponentSelect onlineUsers={onlineUsers} next={challengeInfoLink} />
);

const mapStateToProps = state => ({
    onlineUsers: getOnlineUsers(state),
});

export default withAuthSync(connect(mapStateToProps, null)(ChooseOpponentPage));

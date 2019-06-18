import React from 'react';
import { connect } from 'react-redux';

import { components, actions } from '../../../components/challenge';
import { constants } from '../../../components/common';
import withAuthSync from '../../../hocs/withAuthSync';

const { selectModeRequest } = actions;
const { NEXT_LINKS } = constants;
const { opponentSelectLink } = NEXT_LINKS;

const { ModeSelect } = components;

const SelectModePage = ({ selectMode }) => (
    <ModeSelect selectMode={selectMode} next={opponentSelectLink} />
);

const mapDispatchToProps = dispatch => ({
    selectMode: data => dispatch(selectModeRequest(data)),
});

export default withAuthSync(connect(null, mapDispatchToProps)(SelectModePage));

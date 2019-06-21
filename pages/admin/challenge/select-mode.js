import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';

import { components, actions } from '../../../components/challenge';
import { constants } from '../../../components/common';
import withAuthSync from '../../../hocs/withAuthSync';

const { selectModeRequest } = actions;
const { NEXT_LINKS } = constants;
const { opponentSelectLink } = NEXT_LINKS;

const { ModeSelect } = components;

class SelectModePage extends React.Component{

    componentDidMount(){
        // prefetch the next page ahead of time
        Router.prefetch(opponentSelectLink);
    }

    render(){
        const { selectMode } = this.props;
        return <ModeSelect selectMode={selectMode} next={opponentSelectLink} />    
    }
}

const mapDispatchToProps = dispatch => ({
    selectMode: data => dispatch(selectModeRequest(data)),
});

export default withAuthSync(connect(null, mapDispatchToProps)(SelectModePage));

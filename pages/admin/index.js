import React from 'react';
import { constants } from '../../components/common';
import withAuthSync from '../../hocs/withAuthSync';

const { PAGES_TEXT } = constants;
const { homePage } = PAGES_TEXT;
const { label } = homePage;

class Index extends React.Component {
	state = {};

	render() {
	    return (
	        <p>{label}</p>
	    );
	}
}

export default withAuthSync(Index);

import React from 'react';
import Layout from '../../components/layout';
import { constants } from '../../components/common';

const { SELECTED_MENU_ITEM, PAGES_TEXT } = constants;
const { home } = SELECTED_MENU_ITEM;
const { homePage } = PAGES_TEXT;
const { label } = homePage;

class Index extends React.Component {
	state = {};

	render() {
	    return (
	        <Layout selectedMenuItem={home}>
	            <p>{label}</p>
	        </Layout>
	    );
	}
}

export default Index;

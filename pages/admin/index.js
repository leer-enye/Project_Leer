import React from 'react';

import Layout from '../../components/layout';

class Index extends React.Component {
	state = {};

	render() {
	    return (
	        <Layout selectedMenuItem="home">
	            <p>Banana</p>
	        </Layout>
	    );
	}
}

export default Index;

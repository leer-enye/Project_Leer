import React from 'react';

import Layout from '../../components/Layout';

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

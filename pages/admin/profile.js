import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import Layout from '../../components/layout';
import { components } from '../../components/profile';

const { ViewProfile, EditProfile } = components;

class Profile extends Component {
    state = { action: 'view' }
    
    changeAction = () => {
        const { action } = this.state;
        
        if (action === 'view'){
            return this.setState({ action: 'edit' });
        }

        return this.setState({ action: 'view' });
    }

    render() {
        const { action } = this.state;
        return (
            <Layout selectedMenuItem="profile">
                <Row>
                    <Col span={24} style={{ marginBottom: 16 }}>
                        
                        <Button 
                            type="primary" 
                            onClick={this.changeAction}>
                            {`${action === 'view' ? 'Edit' : 'View'} Profile`}
                        </Button>
                    </Col>
                    <Col span={24}>
                        { action === 'view' ?  <ViewProfile /> : <EditProfile /> }
                    </Col>
                </Row>
            </Layout>
        );
    }

}

export default Profile;

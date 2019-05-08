import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import Layout from '../../../components/layout';
import { components } from '../../../components/profile';
import './index.scss';

const { ViewProfile, EditProfile } = components;

class Profile extends Component {
    state = { action: 'view' }

    changeAction = () => {
        const { action } = this.state;
        const isViewAction = action === 'view';
        return this.setState({ action: isViewAction ? 'view': 'edit' });
    }

    render() {
        const { action } = this.state;
        const isViewAction = action === 'view';
        return (
            <Layout selectedMenuItem="profile">
                <Row>
                    <Col span={24} className='mb-1'>
                        <Button
                            type="primary"
                            onClick={this.changeAction}>
                            {`${isViewAction ? 'Edit' : 'View'} Profile`}
                        </Button>
                    </Col>
                    <Col span={24}>
                        {isViewAction ? <ViewProfile /> : <EditProfile />}
                    </Col>
                </Row>
            </Layout>
        );
    }
}

export default Profile;

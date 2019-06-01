import React, { Component } from 'react';
import axios from 'axios';
import { Button, Row, Col } from 'antd';
import Layout from '../../../components/layout';
import { components } from '../../../components/profile';
import { constants } from '../../../components/common';
import { auth, withAuthSync } from '../../../utils/auth';
import './index.scss';

const { CLASS_NAMES, PAGES_TEXT, SELECTED_MENU_ITEM  } = constants;
const { profile } = SELECTED_MENU_ITEM;
const { mb1 } = CLASS_NAMES;
const { profilePage } = PAGES_TEXT;
const { editText, primaryText, viewText } = profilePage;

const { ViewProfile, EditProfile } = components;

class Profile extends Component {
    state = { action: viewText, updatedUser: null }

    // static async getInitialProps(ctx, sessionInfo) {
    //     return { };
    // }

    updateUserData = async data => {
        this.setState({ updatedUser: data });
    }

    changeAction = () => {
        const { action } = this.state;
        const isViewAction = action === viewText;
        return this.setState({ action: isViewAction ? editText: viewText });
    }

    getButtonLabel = () => {
        const { action } = this.state;
        const label = action === 'view' ? 'Edit' : 'View';
        return `${label} Profile`;
    }

    render() {
        const { action, updatedUser } = this.state;
        const { user } = this.props;
        const isViewAction = action === viewText;
        return (
            <Layout selectedMenuItem={profile}>
                <Row>
                    <Col span={24} className={mb1}>
                        <Button
                            type={primaryText}
                            onClick={this.changeAction}>
                            { this.getButtonLabel() }
                        </Button>
                    </Col>
                    <Col span={24}>
                        { isViewAction ? <ViewProfile user={updatedUser || user} /> : <EditProfile onUpdate={this.updateUserData} user={updatedUser || user } />}
                    </Col>
                </Row>
            </Layout>
        );
    }
}

export default withAuthSync(Profile);

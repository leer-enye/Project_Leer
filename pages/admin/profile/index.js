import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import Layout from '../../../components/layout';
import { components } from '../../../components/profile';
import { constants } from '../../../components/common';
import './index.scss';

const { CLASS_NAMES, PAGES_TEXT, SELECTED_MENU_ITEM  } = constants;
const { profile } = SELECTED_MENU_ITEM;
const { mb1 } = CLASS_NAMES;
const { profilePage } = PAGES_TEXT;
const { editText, primaryText, viewText } = profilePage;

const { ViewProfile, EditProfile } = components;

class Profile extends Component {
    state = { action: viewText }

    changeAction = () => {
        const { action } = this.state;
        const isViewAction = action === viewText;
        return this.setState({ action: isViewAction ? editText: viewText });
    }

    getButtonLabel = () => {
        const { action } = this.state;
        return `${action.charAt(0).toUpperCase() + action.slice(1)} Profile`;
    }

    render() {
        const { action } = this.state;
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
                        {isViewAction ? <ViewProfile /> : <EditProfile />}
                    </Col>
                </Row>
            </Layout>
        );
    }
}

export default Profile;

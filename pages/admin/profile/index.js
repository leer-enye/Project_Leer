import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'antd';
import { components } from '../../../components/profile';
import { constants } from '../../../components/common';
import withAuthSync  from '../../../hocs/withAuthSync';
import './index.scss';

const { CLASS_NAMES, PAGES_TEXT } = constants;
const { mb1 } = CLASS_NAMES;
const { profilePage } = PAGES_TEXT;
const { editText, primaryText, viewText } = profilePage;

const { ViewProfile, EditProfile } = components;

class Profile extends Component {
    state = { action: viewText, updatedUser: null }

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
            <React.Fragment>
                <Row>
                    <Col span={24} className={mb1}>
                        <Button
                            type={primaryText}
                            onClick={this.changeAction}>
                            { this.getButtonLabel() }
                        </Button>
                    </Col>
                    <Col span={24}>
                        { 
                            isViewAction ? 
                                <ViewProfile user={updatedUser || user} /> : 
                                <EditProfile 
                                    onUpdate={this.updateUserData} 
                                    user={updatedUser || user }    
                                />
                        }
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => (
    {
        user: state.auth.user,
    }
);

export default withAuthSync(connect(mapStateToProps, null)(Profile));

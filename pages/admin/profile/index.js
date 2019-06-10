import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'antd';

import withAuthSync from '../../../hocs/withAuthSync';
import { components } from '../../../components/profile';
import { constants } from '../../../components/common';
import { updateUserRequest } from '../../../components/auth/actions';
import { getUser } from '../../../components/auth/selectors';
import './index.scss';

const { 
    CLASS_NAMES: { mb1 }, 
    PAGES_TEXT: { 
        profilePage : { editText, primaryText, viewText } ,
    },
} = constants;
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
        const label = action === 'view' ? 'Edit' : 'View';
        return `${label} Profile`;
    }

    render() {
        const { action } = this.state;
        const { user, updateUser } = this.props;
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
                                <ViewProfile user={user} /> : 
                                <EditProfile 
                                    updateUser={updateUser} 
                                    user={user}    
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
        user: getUser(state),
    }
);

const mapDispatchToProps = dispatch => ({
    updateUser: data => dispatch(updateUserRequest(data)),
});

export default withAuthSync(connect(mapStateToProps, mapDispatchToProps)(Profile));

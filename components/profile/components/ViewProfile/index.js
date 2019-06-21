
import { Row, Col, Avatar } from 'antd';
import moment from 'moment';
import React from 'react';

import * as constants from "../../constants";
import './index.scss';

const {
    CLASS_NAMES: {
        card,
        infoField,
        mb2,
        textCenter,
    },
    DEFAULT_USER_PROPS,
    VIEW_PROFILE_FIELDS,
} = constants;

const generateComponent = ( name, user ) => {
    switch(name){
    case 'bio':
    case 'highSchool':
    case 'intendedUni':
    case 'username':
        return <span>{user[name]}</span>;

    case 'dateJoined':
        return <span>{moment(user.createdAt).format("MMMM Do YYYY")}</span>;
    
    case 'fullName':
        return <span>{`${user.firstName} ${user.lastName}`}</span>;
     
    default:
        return '';
    }
};

const ViewProfile = ({ user }) => {
    const { username, picture } = user;
    return ( 
        <Row className={`${card}`}> 
            <Col span={20} md={{ offset: 2, span: 18  }}>
                <Row>
                    <Col span={24} className={`${mb2} ${textCenter}`}>
                        <Avatar src={picture} size={150}>
                            {username ? username[0].toUpperCase(): ''}
                        </Avatar>
                    </Col>
                    <Col span={24} className={`${mb2}`}>                        
                        {
                            VIEW_PROFILE_FIELDS.slice(1).map((
                                ({ label, name, className }) => (
                                    <Col 
                                        key={label} 
                                        span={12} 
                                        md={name === 'bio' ? 24: 12} xs={24}>
                                        <div key={label} className={className || infoField}>
                                            <h4>{label}</h4>
                                            {generateComponent(name, user)}
                                        </div>
                                    </Col>
                                )
                            ))
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    );};

ViewProfile.defaultProps = {
    user: DEFAULT_USER_PROPS,
};

export default ViewProfile;

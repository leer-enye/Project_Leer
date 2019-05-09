
import React from 'react';
import { Row, Col, Avatar, Typography, Icon } from 'antd';
import * as constants from "../../constants";
import './index.scss';

const { Title } = Typography;
const {
    CLASS_NAMES,
    DEFAULT_USER_PROPS,
    SOCIAL_ICON_THEME,
    ICONS,
    TARGET_BLANK,
    VIEW_PROFILE_FIELDS,
} = constants;

const {
    card,
    infoField,
    mb2,
    socialIcon,
    socialIcons,
    textCenter,
} = CLASS_NAMES;

const { twitter } = ICONS;

const generateComponent = ( name, user ) => {
    switch(name){
    case 'bio':
    case 'dateJoined':
    case 'highSchool':
    case 'intendedUni':
    case 'username':
        return <span>{user[name]}</span>;
    
    case 'fullName':
        return <span>{`${user.firstName} ${user.lastName}`}</span>;

    case 'socials':
        return <span className={`${socialIcons}`}>
            {
                user.socials.map(social => (
                    <a key={social.type}
                        href={social.url}
                        target={TARGET_BLANK}>
                        <Icon
                            className={`${socialIcon}`}
                            type={social.type}
                            theme={social.type !== twitter && SOCIAL_ICON_THEME}
                        />
                    </a>
                ))
            }
        </span>;
        
    default:
        return '';
    }
};

const ViewProfile = ({ user }) => {
    const { score, username } = user;
    return ( 
        <Row className={`${card}`}> 
            <Col span={20} md={{ offset: 2, span: 18  }}>
                <Row>
                    <Col span={24} className={`${mb2} ${textCenter}`}>
                        <Avatar size={150}>
                            {username[0].toUpperCase()}
                        </Avatar>
                        <Title level={4}>{`${VIEW_PROFILE_FIELDS[0].label}: ${score} `}</Title>
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

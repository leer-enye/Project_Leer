
import React from 'react';
import { Row, Col, Avatar, Typography, Icon } from 'antd';
import * as constants from "../../constants";
import './index.scss';

const { Title } = Typography;
const {
    CLASS_NAMES,
    DEFAULT_USER_PROPS,
    SOCIAL_ICON_THEME,
    SOCIAL_TYPES,
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

const { 
    bioLabel,
    dateJoinedLabel,
    fullNameLabel,
    highSchoolLabel,
    intendedUniLabel,
    scoreLabel,
    socialsLabel,
    usernameLabel,
} = VIEW_PROFILE_FIELDS;

const { twitter } = SOCIAL_TYPES;

const ViewProfile = ({ user }) => {
    const { 
        bio, dateJoined, firstName, highSchool, 
        intendedUni, lastName, score, socials, username } = user;
    return ( 
        <Row className={`${card}`}> 
            <Col span={20} md={{ offset: 2, span: 18  }}>
                <Row>
                    <Col span={24} className={`${mb2} ${textCenter}`}>
                        <Avatar size={150}>
                            {username[0].toUpperCase()}
                        </Avatar>
                        <Title level={4}>{`${scoreLabel}: ${score} `}</Title>
                    </Col>
                    <Col span={12} md={{ span: 12 }} xs={24} className={`${mb2}`}>
                        <div className={`${infoField}`}>
                            <h4 >{usernameLabel}</h4>
                            <span>{username || ''}</span>
                        </div>
                        <div className={`${infoField}`}>
                            <h4>{fullNameLabel}</h4>
                            <span>{`${firstName} ${lastName}`}</span>
                        </div>
                        <div className={`${infoField}`}>
                            <h4>{socialsLabel}</h4>
                            <span className={`${socialIcons}`}>
                                {
                                    socials.map(social => (
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
                            </span>
                        </div>
                        
                    </Col>
                    <Col  span={12} md={12} xs={24}>
                        <div className={`${infoField}`}>
                            <h4>{highSchoolLabel}</h4>
                            <span>{highSchool}</span>
                        </div>
                        <div className={`${infoField}`}>
                            <h4>{intendedUniLabel}</h4>
                            <span>{intendedUni}</span>
                        </div>
                        <div className={`${infoField}`}>
                            <h4>{dateJoinedLabel}</h4>
                            <span>{dateJoined}</span>
                        </div>
                        
                    </Col>
                    <Col span={24}>
                        <div className={`${infoField}`}>
                            <h4>{bioLabel}</h4>
                            <p>
                                {bio}
                            </p>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );};

ViewProfile.defaultProps = {
    user: DEFAULT_USER_PROPS,
};

export default ViewProfile;

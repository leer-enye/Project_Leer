
import React from 'react';
import { Row, Col, Avatar, Typography, Icon } from 'antd';
import './index.scss';

const { Title } = Typography;

const ViewProfile = ({ user }) => <Row> 
    <Col span={20} md={{ offset: 2, span: 18  }}>
        <Row>
            <Col span={24} className="mb-2 text-center">
                <Avatar size={150}>
                    John Doe
                </Avatar>
                <Title level={4}>Score: 100</Title>
            </Col>
            <Col  span={12}  md={{ span: 12 }} xs={24}>
                <div className="info-field" style={{ marginBottom: '1rem' }}>
                    <h4 style={{ marginBottom: '0' }}>Name</h4>
                    <span>Patrick Akpatabor</span>
                </div>
                <div className="info-field">
                    <h4>First Name</h4>
                    <span>Patrick Akpatabor</span>
                </div>
                <div className="info-field">
                    <h4>Social Accounts</h4>
                    <span className="social-icons">
                        <Icon className="icon"  style={{ fontSize: 16, marginRight: '1rem' }} type="facebook" theme="filled" />
                        <Icon className="icon" style={{ fontSize: 16, marginRight: '1rem' }} type="twitter"  />
                        <Icon className="icon" style={{ fontSize: 16, marginRight: '1rem' }} type="instagram" theme="filled" />                        
                    </span>
                </div>
                
            </Col>
            <Col  span={12} md={12} xs={24}>
                <div className="info-field">
                    <h4>High School</h4>
                    <span>Airforce Secondary School, Ikeja</span>
                </div>
                <div className="info-field">
                    <h4>Intended University</h4>
                    <span>University of Nigeria</span>
                </div>
                <div className="info-field">
                    <h4>Date Joined</h4>
                    <span>24th April 2019</span>
                </div>
                
            </Col>
            <Col span={24}>
                <div className="info-field">
                    <h4>Bio</h4>
                    <p>
                        Presently a science student at
                        Air Force Secondary School Ikeja.
                        I love mathematics, physics,
                        chemistry and further maths
                    </p>
                </div>
            </Col>
        </Row>
    </Col>
</Row>;

export default ViewProfile;

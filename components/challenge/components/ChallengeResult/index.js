import React from 'react';
import { Typography, Button } from 'antd';
import './index.scss';

const { Title } = Typography;

const ChallengeResult = () => (
    <div className='result-card'>
        <Title className='text-center' level={2}> YOU WIN</Title>
        <div className='challengers-box'>
            <div className='challenger-info win'>
                <img src='/static/images/uche.jpg' alt='challenger' />
                <div className=''>
                    <h3 className='challenger-info__name'>Uche</h3>
                    <p className='challenger-info__score'>200</p>
                </div>
            </div>
            <Title level={3} className='vs-divider'> Vs</Title>
            <div className='challenger-info lose'>
                <img src='/static/images/uche.jpg' alt='challenger' />
                <div>
                    <h3 className='challenger-info__name'>Uche</h3>
                    <p className='challenger-info__score'>160</p>
                </div>
            </div>
        </div>
        <Title level={4} className='vs-divider'> Great Game! </Title>
        <div>
            <Button type='primary' className='mr-1 mb-1'>View Results</Button>
            <Button >Back to Home</Button>
        </div>
    </div>
);

export default ChallengeResult;

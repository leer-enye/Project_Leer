import React from 'react';
import { Row, Col, Card } from 'antd';
import './index.scss';

const Quiz = () => (
    <div className='quiz-card'>
        <header className='quiz-card__header'>
            <div className='challenger-info'>
                <img src='/static/images/uche.jpg' alt='challenger' />
                <div className=''>
                    <h3>Uche</h3>
                    <p>20</p>
                </div>
            </div>
            <div className='timer'>
                <h4 className='timer__label'>Time Left</h4>
                <span className='timer__time'>20</span>
            </div>
            <div className='challenger-info challenger-info--1'>
                <img src='/static/images/uche.jpg' alt='challenger' />
                <div className=''>
                    <h3>Uche</h3>
                    <p>20</p>
                </div>
            </div>
        </header>
        <div className='quiz-card__main'>
            <p className='quiz-card__question'>
                Eu magna ad sunt consequat ipsum veniam. Tempor 
                occaecat qui labore id velit irure occaecat irure 
                reprehenderit consequat. Veniam veniam excepteur 
                minim eu incididunt et ad esse exercitation amet 
                amet.
            </p>
            <div>
                <Row gutter={16}>
                    <Col span={12} md={12} xs={24}>
                        <Card className='quiz-card__option' hoverable>
                            A. Jude
                        </Card>
                    </Col>
                    <Col span={12} md={12} xs={24}>
                        <Card className='quiz-card__option' hoverable>
                            B. Uche
                        </Card>
                    </Col>
                    <Col span={12} md={12} xs={24}>
                        <Card className='quiz-card__option' hoverable>
                            C. Tosin
                        </Card>
                    </Col>
                    <Col span={12} md={12} xs={24}>
                        <Card className='quiz-card__option' hoverable>
                            D. Manny
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
);

export default Quiz;

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Router from 'next/router';
import { Typography, Row, Col, Card } from 'antd';

import { CHALLENGE_PAGES_HEADERS, CLASS_NAMES, DEFAULT_PROPS } from '../../constants';
import './index.scss';

const { Title } = Typography;
const { courseCard, mt4 } = CLASS_NAMES;
const { courseSelectLabel } = CHALLENGE_PAGES_HEADERS;

const CourseSelect = ({ courses, next, selectCourse }) => {
    const handleSelect = subject => {
        selectCourse(subject);
        Router.push(next);
    };

    return (
        <section>
            <Title level={3}>{courseSelectLabel}</Title>
            <Row gutter={16} className={mt4}>
                {courses.map(({ name, _id }) => (
                    <Col key={_id} span={6} md={6} xs={12}>
                        {/* <Link href={next}> */}
                        <div onClick={() => handleSelect({ _id, name })}>
                            <Card className={courseCard} hoverable>
                                {name}
                            </Card>
                        </div>
                        {/* </Link> */}
                    </Col>
                ))}
            </Row>
        </section>
    );
};

CourseSelect.defaultProps = {
    courses: DEFAULT_PROPS.courseSelect.subjects,
};

export default CourseSelect;

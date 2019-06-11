import React from 'react';
import Link from 'next/link';
import { Typography, Row, Col, Card } from 'antd';

import { CHALLENGE_PAGES_HEADERS, CLASS_NAMES, DEFAULT_PROPS } from '../../constants';
import './index.scss';

const { Title } = Typography;
const { courseCard, mt4 } = CLASS_NAMES;
const { courseSelectLabel } = CHALLENGE_PAGES_HEADERS;

const CourseSelect = ({ subjects, next }) => (
    <section>
        <Title level={3}>{courseSelectLabel}</Title>
        <Row gutter={16} className={mt4}>
            {subjects.map(({ name, id }) => (
                <Col key={id} span={6} md={6} xs={12}>
                    <Link href={next}>
                        <Card className={courseCard} hoverable>
                            {name}
                        </Card>
                    </Link>
                </Col>
            ))}

        </Row>
    </section>
);

CourseSelect.defaultProps = {
    subjects: DEFAULT_PROPS.courseSelect.subjects,
};

export default CourseSelect;

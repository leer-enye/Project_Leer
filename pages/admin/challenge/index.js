import React from 'react';
import { connect } from 'react-redux';

import { components, actions } from '../../../components/challenge';
import { constants } from '../../../components/common';
import withAuthSync from '../../../hocs/withAuthSync';

const { selectCourseRequest } = actions;
const { NEXT_LINKS } = constants;
const { modeSelectLink } = NEXT_LINKS;
const { CourseSelect } = components;

const ChallengeHome = ({ selectCourse }) => (
    <CourseSelect selectCourse={selectCourse} next={modeSelectLink} />
);

const mapDispatchToProps = dispatch => ({
    selectCourse: data => dispatch(selectCourseRequest(data)),
});
 
export default withAuthSync(connect(null, mapDispatchToProps)(ChallengeHome));

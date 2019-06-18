import React from 'react';
import { connect } from 'react-redux';

import { components, actions, selectors } from '../../../components/challenge';
import { constants } from '../../../components/common';
import withAuthSync from '../../../hocs/withAuthSync';

const { fetchCoursesRequest ,selectCourseRequest } = actions;
const { NEXT_LINKS } = constants;
const { modeSelectLink } = NEXT_LINKS;
const { CourseSelect } = components;
const { getCourses } = selectors;

class ChallengeHome extends React.Component {
    state = {}

    componentWillMount(){
        const { courses, fetchCourses } = this.props;

        if (courses.length === 0 ){
            fetchCourses();
        }
    }

    render(){
        const { courses, selectCourse } = this.props;
        return <CourseSelect courses={courses} selectCourse={selectCourse} next={modeSelectLink} />;
    }
}

const mapStateToProps = state => ({
    courses: getCourses(state),
});

const mapDispatchToProps = dispatch => ({
    fetchCourses: () => dispatch(fetchCoursesRequest()),
    selectCourse: data => dispatch(selectCourseRequest(data)),
});
 
export default withAuthSync(connect(mapStateToProps, mapDispatchToProps)(ChallengeHome));

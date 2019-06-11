import React from 'react';
import { components } from '../../../components/challenge';
import { constants } from '../../../components/common';
import withAuthSync from '../../../hocs/withAuthSync';

const { NEXT_LINKS } = constants;
const { modeSelectLink } = NEXT_LINKS;
const { CourseSelect } = components;

const ChallengeHome = () => (
    <CourseSelect next={modeSelectLink} />
);
    
export default withAuthSync(ChallengeHome);

import React from 'react';
import Layout from '../../../components/layout';
import { components } from '../../../components/challenge';
import { constants } from '../../../components/common';
import { auth, withAuthSync } from '../../../utils/auth';

const { SELECTED_MENU_ITEM, NEXT_LINKS } = constants;
const { challenge } = SELECTED_MENU_ITEM;
const { modeSelectLink } = NEXT_LINKS;
const { CourseSelect } = components;

const ChallengeHome = () => (
    <CourseSelect next={modeSelectLink} />
);
    
export default withAuthSync(ChallengeHome);

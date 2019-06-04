import React from 'react';
import Layout from '../../components/layout';
import { constants } from '../../components/common';
import { auth, withAuthSync } from '../../../utils/auth';

const { SELECTED_MENU_ITEM, PAGES_TEXT } = constants;
const { resources } = SELECTED_MENU_ITEM;
const { resourcesPage } = PAGES_TEXT;
const { label } = resourcesPage;

const Resources = () => (
    <div>{ label }</div>
);

export default withAuthSync(Resources);

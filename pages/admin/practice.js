import React from 'react';
import Layout from '../../components/layout';
import { constants } from '../../components/common';
import { auth, withAuthSync } from '../../../utils/auth';

const { SELECTED_MENU_ITEM, PAGES_TEXT } = constants;
const { practice } = SELECTED_MENU_ITEM;
const { practicePage } = PAGES_TEXT;
const { label } = practicePage;

const Practice = () => (
    <div>{label}</div>
);

export default withAuthSync(Practice);

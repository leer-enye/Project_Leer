import React from 'react';
import Layout from '../../components/layout';
import { constants } from '../../components/common';

const { SELECTED_MENU_ITEM, PAGES_TEXT } = constants;
const { practice } = SELECTED_MENU_ITEM;
const { practicePage } = PAGES_TEXT;
const { label } = practicePage;

const Practice = () => (
    <Layout selectedMenuItem={practice}>
        <div>{label}</div>
    </Layout>
);

export default Practice;

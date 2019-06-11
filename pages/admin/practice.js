import React from 'react';
import { constants } from '../../components/common';
import withAuthSync from '../../hocs/withAuthSync';

const { PAGES_TEXT } = constants;
const { practicePage } = PAGES_TEXT;
const { label } = practicePage;

const Practice = () => (
    <div>{label}</div>
);

export default withAuthSync(Practice);

import React from 'react';
import { constants } from '../../components/common';
import withAuthSync from '../../hocs/withAuthSync';

const { PAGES_TEXT } = constants;
const { resourcesPage } = PAGES_TEXT;
const { label } = resourcesPage;

const Resources = () => (
    <div>{ label }</div>
);

export default withAuthSync(Resources);

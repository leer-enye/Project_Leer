/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Heading from '../header_footer/header';

const Layout = props => (
    <div>
        <Heading />
        {props.children}
    </div>
);

export default Layout;

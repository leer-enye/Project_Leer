import React from 'react';
import { components } from '../../../components/challenge';
import Layout from '../../../components/layout';
import { constants } from '../../../components/common';

const { SELECTED_MENU_ITEM, NEXT_LINKS } = constants;
const { challenge } = SELECTED_MENU_ITEM;
const { opponentSelectLink } = NEXT_LINKS;

const { ModeSelect } = components;

const SelectModePage = () => (
    <Layout selectedMenuItem={challenge}>
        <ModeSelect next={opponentSelectLink} />
    </Layout>
);

export default SelectModePage;

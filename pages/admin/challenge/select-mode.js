import React from 'react';
import { components } from '../../../components/challenge';
import Layout from '../../../components/layout';
import { constants } from '../../../components/common';
import { auth, withAuthSync } from '../../../utils/auth';

const { SELECTED_MENU_ITEM, NEXT_LINKS } = constants;
const { challenge } = SELECTED_MENU_ITEM;
const { opponentSelectLink } = NEXT_LINKS;

const { ModeSelect } = components;

const SelectModePage = () => (
    <ModeSelect next={opponentSelectLink} />
);

export default withAuthSync(SelectModePage);

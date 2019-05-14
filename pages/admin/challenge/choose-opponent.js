import React from 'react';
import { components } from '../../../components/challenge';
import Layout from '../../../components/layout';
import { constants } from '../../../components/common';

const { SELECTED_MENU_ITEM, NEXT_LINKS } = constants;
const { challenge } = SELECTED_MENU_ITEM;
const { challengeInfoLink } = NEXT_LINKS;

const { OpponentSelect } = components;

const ChooseOpponentPage = () => (
    <Layout selectedMenuItem={challenge}>
        <OpponentSelect next={challengeInfoLink} />
    </Layout>
);

export default ChooseOpponentPage;

import React from 'react';
import { components } from '../../../components/challenge';
import { constants } from '../../../components/common';
import withAuthSync from '../../../hocs/withAuthSync';

const { NEXT_LINKS } = constants;
const { challengeInfoLink } = NEXT_LINKS;

const { OpponentSelect } = components;

const ChooseOpponentPage = () => (
    <OpponentSelect next={challengeInfoLink} />
);

export default withAuthSync(ChooseOpponentPage);

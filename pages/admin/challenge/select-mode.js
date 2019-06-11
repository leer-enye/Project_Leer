import React from 'react';
import { components } from '../../../components/challenge';
import { constants } from '../../../components/common';
import withAuthSync from '../../../hocs/withAuthSync';

const { NEXT_LINKS } = constants;
const { opponentSelectLink } = NEXT_LINKS;

const { ModeSelect } = components;

const SelectModePage = () => (
    <ModeSelect next={opponentSelectLink} />
);

export default withAuthSync(SelectModePage);

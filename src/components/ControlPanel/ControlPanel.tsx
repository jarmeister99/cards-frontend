import React from 'react'
import styled from 'styled-components';

import CreateCard from '../CreateCard/CreateCard';
import TagFilter from '../TagFilter/TagFilter';

const ControlPanelContainer = styled.div`
    margin: auto;
    width: 50%;
    margin-top: 2.5em;
    margin-bottom: 1em;
`;

const ControlPanel: React.FC = (props): JSX.Element => {
    return (
        <ControlPanelContainer>
            <TagFilter />
            <CreateCard />
        </ControlPanelContainer>
    )
}

export default ControlPanel;
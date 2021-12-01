import React from 'react'
import styled from 'styled-components';

import CreateCard from '../CreateCard/CreateCard';
import TagFilter from '../TagFilter/TagFilter';

interface IControlPanel {
}

const ControlPanelContainer = styled.div`
    margin: auto;
    margin-top: 2.5em;

    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: center;
    justify-content: space-evenly;
`;

const ControlPanel: React.FC<IControlPanel> = (props: IControlPanel): JSX.Element => {
    return (
        <ControlPanelContainer>
            <TagFilter />
            <CreateCard />
        </ControlPanelContainer>
    )
}

export default ControlPanel;
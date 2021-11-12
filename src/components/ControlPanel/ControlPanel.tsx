import React from 'react'
import styled from 'styled-components';

import CreateCard from '../CreateCard/CreateCard';

const ControlPanelContainer = styled.div`
    margin: auto;
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 2.5em;
    margin-bottom: 1.5em;
`;

const ControlPanel: React.FC = (props): JSX.Element => {
    return (
        <ControlPanelContainer>
            <CreateCard />
        </ControlPanelContainer>
    )
}

export default ControlPanel;
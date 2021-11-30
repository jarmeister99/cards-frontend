import React from 'react'
import styled from 'styled-components';
import { ICard } from '../Card/Card';

import CreateCard from '../CreateCard/CreateCard';
import TagFilter from '../TagFilter/TagFilter';

interface IControlPanel {
    cards: ICard[];
    setCards: React.Dispatch<React.SetStateAction<ICard[]>>
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
            <TagFilter cards={props.cards} setCards={props.setCards}/>
            <CreateCard cards={props.cards} setCards={props.setCards} />
        </ControlPanelContainer>
    )
}

export default ControlPanel;
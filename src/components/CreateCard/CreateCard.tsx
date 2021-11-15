import React, { SyntheticEvent, useRef, useState } from 'react';
import styled from 'styled-components';

import { PaleVioletButton } from '../Generic/Buttons/Buttons';
import '../Generic/Buttons/Buttons.scss';
import './CreateCard.scss';

const CreateCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 1.5em;
    * {
        margin: 0 1em;
    }
`;

const CreateCard: React.FC = (props): JSX.Element => {
    const [formActive, setFormActive] = useState<Boolean>(false);
    const createPopupContainer = useRef<HTMLDivElement>(null);
    const exitFormListener = (e: MouseEvent) => {
        setFormActive(false);
        createPopupContainer.current?.removeEventListener("mouseleave", exitFormListener)

    }
    const showForm = (e: SyntheticEvent) => {
        setFormActive(true);
        createPopupContainer.current?.addEventListener("mouseleave", exitFormListener)
        console.log(`Added event listener to ${createPopupContainer.current}`)
    }

    return (
        <CreateCardContainer>
            <PaleVioletButton primary={true} className="expand" onClick={showForm}>Create</PaleVioletButton>
            <div ref={createPopupContainer} className={"create-form" + (formActive ? " active" : "")}>!</div>
        </CreateCardContainer>
    )
}

export default CreateCard;
import React, { SyntheticEvent, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
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
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });

    const exitFormListener = (e: MouseEvent) => {
        setFormActive(false);
        createPopupContainer.current?.removeEventListener("mouseleave", exitFormListener)

    }
    const showForm = (e: SyntheticEvent) => {
        // TODO: would really like if we blurred the body here
        setFormActive(true);
        createPopupContainer.current?.addEventListener("mouseleave", exitFormListener)
        console.log(`Added event listener to ${createPopupContainer.current}`)
    }

    // TODO: Make sure mobile users can tap to exit
    const className = "create-form" + (formActive ? " active" : "") + (isDesktop ? "" : " mobile");
    return (
        <CreateCardContainer>
            <PaleVioletButton primary={true} className="expand" onClick={showForm}>Create</PaleVioletButton>
            <div ref={createPopupContainer} className={className}></div>
        </CreateCardContainer>
    )
}

export default CreateCard;
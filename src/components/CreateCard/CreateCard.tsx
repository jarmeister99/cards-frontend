import React, { SyntheticEvent, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import { PaleVioletButton } from '../Generic/Buttons/Buttons';
import '../Generic/Buttons/Buttons.scss';
import './CreateCard.scss';

interface CreateCardPayload {
    title: string;
    teaser: string;
    content: string;
    link: string;
    image_link?: string;
};

const CreateCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 1.5em;
`;
const CreateCardHeader = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 1em;
    font-size: 2em;
`;
const CreateCardForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: center;
    justify-content: space-between;
      
    label {
        text-align: center;
        margin-top: 0.5em;
        margin-bottom: 0.1em;
    }
    textarea{
        margin-top: 0.5em;
        margin-bottom: 0.1em;
        // width: 75%;
        width: min(75%, 20em);
    }
    input{
        margin-top: 0.5em;
        margin-bottom: 0.1em;
        // width: 75%;
        width: min(75%, 20em);
    }
    button{
        margin: 1em auto;
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
    }

    // TODO: Make sure mobile users can tap to exit
    const className = "create-form" + (formActive ? " active" : "") + (isDesktop ? "" : " mobile");
    return (
        <>
            <div ref={createPopupContainer} className={className}>
                <CreateCardHeader>Share a link!</CreateCardHeader>
                <CreateCardForm>
                    <label>Title</label>
                    <input type="text"></input>
                    <label>Teaser</label>
                    <textarea rows={2}></textarea>
                    <label>Content</label>
                    <textarea rows={4}></textarea>
                    <label>Link</label>
                    <input type="text"></input>
                    <label>(Optional) Image Link</label>
                    <input type="text"></input>
                    <PaleVioletButton primary={true} className="expand">Submit</PaleVioletButton>
                </CreateCardForm>
            </div>
            <CreateCardContainer>
                <PaleVioletButton primary={true} className="expand" onClick={showForm}>Create</PaleVioletButton>
            </CreateCardContainer>
        </>
    )
}

export default CreateCard;
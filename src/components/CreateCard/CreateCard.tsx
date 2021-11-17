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
interface Point {
    x: number;
    y: number;
};

const CreateCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 1.5em;
    touch-action: none;
`;
const CreateCardHeader = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 1em;
    font-size: 2em;
    touch-action: none;
`;
const CreateCardForm = styled.form`
    touch-action: none;
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
    const startTouchPos = useRef<Point>({ x: 0, y: 0 });
    const touchPos = useRef<Point>({ x: 0, y: 0 });
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });


    const exitFormListener = (e: MouseEvent) => {
        setFormActive(false);
        document.body.classList.remove('noscroll')
        createPopupContainer.current?.removeEventListener("mouseleave", exitFormListener)
    }
    const exitForm = () => {
        setFormActive(false);
        document.body.classList.remove('noscroll')
        createPopupContainer.current?.removeEventListener("mouseleave", exitFormListener)
    }
    const showForm = (e: SyntheticEvent) => {
        // TODO: would really like if we blurred the body here
        setFormActive(true);
        document.body.classList.add('noscroll')
        createPopupContainer.current?.addEventListener("mouseleave", exitFormListener)
    }

    // mobile swipe detection logic
    const endSwipeDetection = (e: SyntheticEvent) => {
        if (e.nativeEvent instanceof TouchEvent) { // Just making typescript happy - TODO clean this up
            const x_delta = Math.abs(startTouchPos.current.x - touchPos.current.x)
            const element_width = createPopupContainer.current?.offsetWidth; // TODO: our percentage seems to be incorrect on an actual phone - figure this out please?
            if (element_width !== undefined){ 
                const swipe_percentage = x_delta / element_width;
                if (swipe_percentage > 0.25){
                    exitForm();
                }
            }

        }
    }
    const startSwipeDetection = (e: SyntheticEvent) => {
        if (e.nativeEvent instanceof TouchEvent) { // Just making typescript happy - TODO clean this up
            startTouchPos.current = {
                x: e.nativeEvent.targetTouches[0].clientX,
                y: e.nativeEvent.targetTouches[0].clientY,
            }
            touchPos.current = {
                x: e.nativeEvent.targetTouches[0].clientX,
                y: e.nativeEvent.targetTouches[0].clientY,
            }
        }
    }
    const trackSwipe = (e: SyntheticEvent) => {
        e.stopPropagation();
        if (e.nativeEvent instanceof TouchEvent) { // Just making typescript happy - TODO clean this up
            touchPos.current = {
                x: e.nativeEvent.targetTouches[0].clientX,
                y: e.nativeEvent.targetTouches[0].clientY,
            }
        }
    }

    // TODO: Make sure mobile users can tap to exit
    const className = "create-form" + (formActive ? " active" : "") + (isDesktop ? "" : " mobile");
    return (
        <>
            <div 
            ref={createPopupContainer} 
            className={className}
            onTouchStart={startSwipeDetection}
            onTouchEnd={endSwipeDetection}
            onTouchMove={trackSwipe}
            >
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
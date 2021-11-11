import React, { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import '../animations/rotateY.css';

export interface ICard {
    title: string;
    content: string;
};

const CardContainer = styled.div`
    width: 20%;
    border: 3px solid black;
    padding: 1em;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin: 1%;
    animation-fill-mode: forward;

`;
const TitleContainer = styled.div`

`;
const TitleSpan = styled.div`
    font-weight: 750;
    text-align: center;
    :after {
        content: '';
        margin-top: 0.7em;
        margin-bottom: 0.7em;
        margin-left: 15%;
        width: 70%;
        height: 2px;
        background: black;
        display: block;
    }
`;
const ContentContainer = styled.div`
    margin-top: 5px;
`;

const Card: React.FC<ICard> = (props: ICard): JSX.Element => {
    const [flipped, setFlipped]: [Boolean, Dispatch<SetStateAction<Boolean>>] = useState<Boolean>(false);
    const [animationRunning, setAnimationRunning]: [Boolean, Dispatch<SetStateAction<Boolean>>] = useState<Boolean>(false);

    const hovering = useRef<Boolean>(false);
    const cardContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        cardContainer.current?.addEventListener('animationend', () => {
            setAnimationRunning(false);
            // if the animation has ended and we are still hovering
            if (hovering.current) {
                setFlipped(true);
            }
            // if we are no longer hovering
            else {
                setFlipped(false);
                // switch animation states
                cardContainer.current?.classList.add('rotateOutwards');
                cardContainer.current?.classList.remove('rotateInwards');
            }
        });
        cardContainer.current?.addEventListener('animationstart', () => {
            setAnimationRunning(true);
        });
    }, [])

    const mouseEnterHandler = (e: SyntheticEvent) => {
        hovering.current = true;
        // if we are not currently in an animation
        if (!animationRunning) {
            // switch animation states
            cardContainer.current?.classList.add('rotateInwards');
            cardContainer.current?.classList.remove('rotateOutwards');
        }
    };
    const mouseLeaveHandler = (e: SyntheticEvent) => {
        hovering.current = false;
        // if we are not currently in an animation
        if (!animationRunning) {
            // switch animation states
            cardContainer.current?.classList.add('rotateOutwards');
            cardContainer.current?.classList.remove('rotateInwards');
        }
    };

    return (
        <CardContainer ref={cardContainer} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
            <TitleContainer><TitleSpan>{props.title}</TitleSpan></TitleContainer>
            <ContentContainer>
                {!flipped && props.content}
                {flipped && 'foo'}
            </ContentContainer>
        </CardContainer>

    )

}

export default Card;
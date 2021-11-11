import React, { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import '../animations/slide_from_top.css';

export interface ICard {
    title: string;
    teaser: string;
    content?: string;
    link?: string;
};

const CardContainer = styled.div`
    width: 20%;
    border: 3px solid black;
    padding: 1em;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin: 1%;
    animation-fill-mode: forward;
    :hover {
        cursor: pointer;
    }

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
const CardSlider = styled.div`
    overflow: hidden;
    transform: translateY(0);
`;

const Card: React.FC<ICard> = (props: ICard): JSX.Element => {
    const [flipped, setFlipped]: [Boolean, Dispatch<SetStateAction<Boolean>>] = useState<Boolean>(false);
    const [animationRunning, setAnimationRunning]: [Boolean, Dispatch<SetStateAction<Boolean>>] = useState<Boolean>(false);

    const cardContainer = useRef<HTMLDivElement>(null);
    const cardSlider = useRef<HTMLDivElement>(null);


    const clickHandler = (e: SyntheticEvent) => {
        window.location.href = props.link || '/';
    }
    const mouseEnterHandler = (e: SyntheticEvent) => {
        // Apply the rotation
        cardSlider.current?.classList.add('slideFromTop');
        setFlipped(true);
    }
    const mouseLeaveHandler = (e: SyntheticEvent) => {
        // Apply the rotation
        cardSlider.current?.classList.add('slideFromTop');
        setFlipped(false);
    }

    return (
        <CardContainer ref={cardContainer} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} onClick={clickHandler}>
            <CardSlider ref={cardSlider}>
                { !flipped && <TitleContainer><TitleSpan>{props.title}</TitleSpan></TitleContainer> }
                <ContentContainer>
                    {!flipped && props.teaser}
                    {flipped && props.content}
                </ContentContainer>
            </CardSlider>
        </CardContainer>
    )

}

export default Card;
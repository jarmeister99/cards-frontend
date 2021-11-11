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
    // border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin: 1%;
    animation-fill-mode: forward;
    // transition: transform 750ms;
    // :hover {
    //     transition: transform 750ms;
    //     transform: rotateY(180deg);
    // }

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
    const [flipped, setFlipped]: [Boolean, Dispatch<SetStateAction<Boolean>>] = useState<Boolean>(false)
    const [animationRunning, setAnimationRunning]: [Boolean, Dispatch<SetStateAction<Boolean>>] = useState<Boolean>(false)
    const cardContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        cardContainer.current?.addEventListener('animationend', () => {
            setAnimationRunning(false);
        });
        cardContainer.current?.addEventListener('animationstart', () => {
            setAnimationRunning(true);
        });
    }, [])

    const mouseThresholdHandler = (e: SyntheticEvent) => {
        if (flipped && !animationRunning){
            cardContainer.current?.classList.add('rotateInwards');
            cardContainer.current?.classList.remove('rotateOutwards');
            setFlipped(!flipped);
        }
        else if (!flipped && !animationRunning){
            cardContainer.current?.classList.add('rotateOutwards');
            cardContainer.current?.classList.remove('rotateInwards');
            setFlipped(!flipped);
        }
    }

    if (!flipped) {
        return (
            <CardContainer ref={cardContainer} onMouseEnter={mouseThresholdHandler}>
                <TitleContainer><TitleSpan>{props.title}</TitleSpan></TitleContainer>
                <ContentContainer>
                    {props.content}
                </ContentContainer>
            </CardContainer>
        )
    }
    else {
        return (
            <CardContainer ref={cardContainer} onMouseLeave={mouseThresholdHandler}>
                <ContentContainer>
                    Flipped: {flipped.toString()}
                </ContentContainer>
            </CardContainer>
        )
    }
}

export default Card;
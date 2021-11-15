import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import './Card.scss'

export interface ICard {
    title: string;
    teaser: string;
    content: string;
    link?: string;
    tags?: string[];
    img_url: string;
};
interface ICardBack {
    content: string;
};
interface ICardFront {
    img_url: string;
    title: string;
    teaser: string;
    tags?: string[];
};
interface Point {
    x: number;
    y: number;
};

const MobileCardContainer = styled.div`
    height: 20em;
    margin-bottom: 2em;
    width: 90%;
    position: relative;
    box-sizing: border-box;
`;
const MobileImageContainer = styled.div<{ img_url: string }>`
    width: 100%;
    height: 50%;
    background-image: url(${props => props.img_url});
    background-size: cover;   
    background-position: center center;
`;

const MobileTitleContainer = styled.div`
    margin-top: 1em;
`;
const MobileTitleSpan = styled.div`
    font-weight: 750;
    text-align: center;
`;
const MobileTeaserContainer = styled.div`
    margin-top: 5px;
    text-overflow: ellipsis;
`;
const MobileTagsContainer = styled.div`
    position: absolute;
    bottom: 0.5em;
    left: 0;
    margin-top: 0.5em;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    width: 100%;
    text-align: center;
    :before{
        content: "";
        position: absolute;
        width: 60%;
        height: 1px;
        top: -0.5em;
        left: 20%;
        border-top: 1px solid gray;
    }
`;
const MobileTagSpan = styled.span`
    margin-left: 0.25em;
    margin-right: 0.25em;
`;
const MobileContentContainer = styled.div`
    margin-top: 5px;
`;

const MobileCard: React.FC<ICard> = (props: ICard): JSX.Element => {
    const [flipped, setFlipped] = useState<boolean>(false);
    const mobileCardContainer = useRef<HTMLDivElement>(null);
    const startTouchPos = useRef<Point>({ x: 0, y: 0 });
    const touchPos = useRef<Point>({ x: 0, y: 0 });

    const clickHandler = (e: SyntheticEvent) => {
        window.location.href = props.link || '/';
    }
    const flip = () => {
        setFlipped(!flipped);
    }
    const endSwipeDetection = (e: SyntheticEvent) => {
        if (e.nativeEvent instanceof TouchEvent) { // Just making typescript happy - TODO clean this up
            const x_delta = Math.abs(startTouchPos.current.x - touchPos.current.x)
            const element_width = mobileCardContainer.current?.offsetWidth;
            if (element_width != undefined){
                const swipe_percentage = x_delta / element_width;
                if (swipe_percentage > 0.30){
                    flip();
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
        }
    }
    const trackSwipe = (e: SyntheticEvent) => {
        if (e.nativeEvent instanceof TouchEvent) { // Just making typescript happy - TODO clean this up
            touchPos.current = {
                x: e.nativeEvent.targetTouches[0].clientX,
                y: e.nativeEvent.targetTouches[0].clientY,
            }
        }
    }
    return (
        <MobileCardContainer
            ref={mobileCardContainer}
            className={"card-container" + (flipped ? " flipped" : "")}
            onTouchStart={startSwipeDetection}
            onTouchEnd={endSwipeDetection}
            onTouchMove={trackSwipe}>
            <MobileFront img_url={props.img_url} title={props.title} teaser={props.teaser} tags={props.tags} />
            <MobileBack content={props.content} />
        </MobileCardContainer>
    )
}
const MobileFront: React.FC<ICardFront> = (props: ICardFront): JSX.Element => {
    return (
        <div className="front">
            <MobileImageContainer img_url={props.img_url} title={props.title}>
            </MobileImageContainer>
            <MobileTitleContainer><MobileTitleSpan>{props.title}</MobileTitleSpan></MobileTitleContainer>
            <MobileTeaserContainer>{props.teaser}</MobileTeaserContainer>
            {props.tags && <MobileTagsContainer>{props.tags.map(t => <MobileTagSpan>{t}</MobileTagSpan>)}</MobileTagsContainer>}
        </div>
    )
}

const MobileBack: React.FC<ICardBack> = (props: ICardBack): JSX.Element => {
    return (
        <div className="back">
            <MobileContentContainer>
                {props.content}
            </MobileContentContainer>
        </div>
    )
}

export default MobileCard;
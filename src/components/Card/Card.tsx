import React, { SyntheticEvent, useRef } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import './Card.scss'
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { fetchCardsAsync } from '../../features/cards/cardSlice';
import { useAppDispatch } from '../../app/hooks';

export interface ICard {
    title: string;
    teaser: string;
    content: string;
    link: string;
    tags?: string[];
    img_url: string;
    _id?: {$oid: string};
};
interface ICardBack {
    content: string;
    _id?: {$oid: string};
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

const CardContainer = styled.div`
    height: 20em;
    margin: 1em;
    padding: 0;
    top: 20px;
    width: 20%;
    position: relative;
    transform-style: preserve-3d;
    box-sizing: border-box;
`;
const ImageContainer = styled.div<{ img_url: string }>`
    width: 100%;
    height: 50%;
    background-image: url(${props => props.img_url});
    background-size: cover;   
    background-position: center center;
`;

const TitleContainer = styled.div`
    margin-top: 1em;
`;
const TitleSpan = styled.div`
    font-weight: 750;
    text-align: center;
`;
const TagsContainer = styled.div`
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
const TagSpan = styled.span`
    margin-left: 0.25em;
    margin-right: 0.25em;
`;
const ContentContainer = styled.div`
    margin-top: 5px;
`;
const TeaserContainer = styled.div`
    margin-top: 5px;
    text-overflow: ellipsis;

`;

const Card: React.FC<ICard> = (props: ICard): JSX.Element => {
    const [flipped, setFlipped] = useState<boolean>(false);
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
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
            const y_delta = Math.abs(startTouchPos.current.y - touchPos.current.y)
            const element_width = mobileCardContainer.current?.offsetWidth; 
            if (element_width !== undefined){ 
                const swipe_percentage = x_delta / element_width;
                if (swipe_percentage > 0.25){
                    flip();
                }
                else if (x_delta < 10 && y_delta < 10){
                    window.location.href = props.link;
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

    if (isDesktop){
        return (
            <CardContainer 
            className={"card-container" + (flipped ? " flipped" : "")} 
            onClick={clickHandler} 
            onMouseEnter={flip} 
            onMouseLeave={flip}>
                <Front img_url={props.img_url} title={props.title} teaser={props.teaser} tags={props.tags}/>
                <Back content={props.content} _id={props._id}/>
            </CardContainer>
        )
    }
    else{
        return (
            <CardContainer 
            className={"mobile card-container" + (flipped ? " flipped" : "")} 
            onTouchStart={startSwipeDetection}
            onTouchEnd={endSwipeDetection}
            onTouchMove={trackSwipe}
            ref={mobileCardContainer}>
                <Front img_url={props.img_url} title={props.title} teaser={props.teaser} tags={props.tags}/>
                <Back content={props.content} _id={props._id}/>
            </CardContainer>  
        )
    }

}
const Front: React.FC<ICardFront> = (props: ICardFront): JSX.Element => {
    return (
        <div className="front">
            <ImageContainer img_url={props.img_url} title={props.title}>
            </ImageContainer>
            <TitleContainer><TitleSpan>{props.title}</TitleSpan></TitleContainer>
            <TeaserContainer>{props.teaser}</TeaserContainer>
            { props.tags && <TagsContainer>{props.tags.map(t => <TagSpan key={t}>{t}</TagSpan>)}</TagsContainer> }
        </div>
    )
}
const Back: React.FC<ICardBack> = (props: ICardBack): JSX.Element => {
    // allow modifying global state
    const dispatch = useAppDispatch();
    const deleteCard = (e: SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
        axios.delete(`${process.env.REACT_APP_API_URI}/shares/${props._id?.$oid}`).then(() => {
            dispatch(fetchCardsAsync())
        }).catch(error => {
            console.log(error);
        })
    }
    return (
        <div className="back">
            <ContentContainer>
                {props.content}
            </ContentContainer>
            <button style={{position: "absolute", bottom: "1em", right: "1em"}} onClick={deleteCard}>Delete</button>
        </div>
    )
}

export default Card;
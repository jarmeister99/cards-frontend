import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
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
}
interface ICardFront {
    img_url: string;
    title: string;
    teaser: string;
    tags?: string[];
}

const CardContainer = styled.div`
    height: 20em;
    margin: 0;
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
`;

const Card: React.FC<ICard> = (props: ICard): JSX.Element => {
    const [flipped, setFlipped] = useState<boolean>(false);

    const clickHandler = (e: SyntheticEvent) => {
        window.location.href = props.link || '/';
    }
    const flip = () => {
        setFlipped(!flipped);
        console.log('flip')
    }
    return (
        <CardContainer className={"card-container" + (flipped ? " flipped" : "")} onClick={clickHandler} onMouseEnter={flip} onMouseLeave={flip}>
            <Front img_url={props.img_url} title={props.title} teaser={props.teaser} tags={props.tags}/>
            <Back content={props.content}/>
        </CardContainer>
    )
}
const Front: React.FC<ICardFront> = (props: ICardFront): JSX.Element => {
    return (
        <div className="front">
            <ImageContainer img_url={props.img_url} title={props.title}>
            </ImageContainer>
            <TitleContainer><TitleSpan>{props.title}</TitleSpan></TitleContainer>
            <TeaserContainer>{props.teaser}</TeaserContainer>
            { props.tags && <TagsContainer>{props.tags.map(t => <TagSpan>{t}</TagSpan>)}</TagsContainer> }
        </div>
    )
}

const Back: React.FC<ICardBack> = (props: ICardBack): JSX.Element => {
    return (
        <div className="back">
            <ContentContainer>
                {props.content}
            </ContentContainer>
        </div>
    )
}

export default Card;
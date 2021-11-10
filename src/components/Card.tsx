import React from 'react';
import styled from 'styled-components'

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
    return (
        <CardContainer>
            <TitleContainer><TitleSpan>{props.title}</TitleSpan></TitleContainer>
            <ContentContainer>{props.content}</ContentContainer>
        </CardContainer>
    )
}

export default Card;
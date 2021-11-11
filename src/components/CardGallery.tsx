import React from 'react';
import Card, { ICard } from './Card';
import styled from 'styled-components'

export interface ICardGallery {
    cards: ICard[];
}

const CardGalleryLayout = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const CardGallery: React.FC<ICardGallery> = (props: ICardGallery): JSX.Element => {
    return (
        <CardGalleryLayout>
            {props.cards.map(c => <Card title={c.title} content={c.content} link={c.link}/>)}
        </CardGalleryLayout>
    )
}

export default CardGallery;
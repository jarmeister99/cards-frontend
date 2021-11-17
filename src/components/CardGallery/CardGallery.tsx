import React, { useEffect, useState } from 'react';
import Card, { ICard } from '../Card/Card';
import styled from 'styled-components'
import axios from 'axios';

const CardGalleryLayout = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
interface ICardGallery {
    cards: ICard[];
}

const CardGallery: React.FC<ICardGallery> = (props: ICardGallery): JSX.Element => {
    return (
        <CardGalleryLayout>
            {props.cards.map(c => <Card title={c.title} teaser={c.teaser} link={c.link} content={c.content} tags={c.tags} img_url={c.img_url} />)}
        </CardGalleryLayout>
    )
}

export default CardGallery;
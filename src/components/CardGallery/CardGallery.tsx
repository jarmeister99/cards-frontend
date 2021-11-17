import React, { useEffect, useState } from 'react';
import Card, { ICard } from '../Card/Card';
import styled from 'styled-components'
import axios from 'axios';

export interface ICardGallery {
    cards: ICard[];
}

const CardGalleryLayout = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const CardGallery: React.FC<ICardGallery> = (props: ICardGallery): JSX.Element => {
    const [shares, setShares] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URI}/shares/`).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    return (
        <CardGalleryLayout>
            {props.cards.map(c => <Card title={c.title} teaser={c.teaser} link={c.link} content={c.content} tags={c.tags} img_url={c.img_url} />)}
        </CardGalleryLayout>
    )
}

export default CardGallery;
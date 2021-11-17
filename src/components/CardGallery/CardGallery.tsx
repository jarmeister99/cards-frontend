import React, { useEffect, useState } from 'react';
import Card, { ICard } from '../Card/Card';
import styled from 'styled-components'
import axios from 'axios';

const CardGalleryLayout = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const CardGallery: React.FC = (props): JSX.Element => {
    const [cards, setCards] = useState<ICard[]>([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URI}/shares/`).then(response => {
            setCards(response.data)
        }).catch(error => {
            console.log(error);
        })
    }, []);

    return (
        <CardGalleryLayout>
            {cards.map(c => <Card title={c.title} teaser={c.teaser} link={c.link} content={c.content} tags={c.tags} img_url={c.img_url} />)}
        </CardGalleryLayout>
    )
}

export default CardGallery;
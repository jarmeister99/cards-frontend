import React from 'react';
import Card, { ICard } from '../Card/Card';
import MobileCard from '../Card/MobileCard';
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive';

export interface ICardGallery {
    cards: ICard[];
}

const CardGalleryLayout = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

const CardGallery: React.FC<ICardGallery> = (props: ICardGallery): JSX.Element => {
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });

    if (isDesktop) {
        return (
            <CardGalleryLayout>
                {props.cards.map(c => <Card title={c.title} teaser={c.teaser} link={c.link} content={c.content} tags={c.tags} img_url={c.img_url} />)}
            </CardGalleryLayout>
        )
    }
    else {
        return (
            <div>
                <CardGalleryLayout>
                    {props.cards.map(c => <MobileCard title={c.title} teaser={c.teaser} link={c.link} content={c.content} tags={c.tags} img_url={c.img_url} />)}
                </CardGalleryLayout>
            </div>
        )
    }
}

export default CardGallery;
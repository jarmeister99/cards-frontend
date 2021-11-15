import React from 'react';
import Card, { ICard } from '../Card/Card';
import MobileCard from '../Card/MobileCard';
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive';

export interface ICardGallery {
    cards: ICard[];
}

const CardGalleryDesktopLayout = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;
const CardGalleryMobileLayout = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
`;

const CardGallery: React.FC<ICardGallery> = (props: ICardGallery): JSX.Element => {
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });

    if (isDesktop) {
        return (
            <CardGalleryDesktopLayout>
                {props.cards.map(c => <Card title={c.title} teaser={c.teaser} link={c.link} content={c.content} tags={c.tags} img_url={c.img_url} />)}
            </CardGalleryDesktopLayout>
        )
    }
    else {
        return (
            <div>
                <CardGalleryMobileLayout>
                    {props.cards.map(c => <MobileCard title={c.title} teaser={c.teaser} link={c.link} content={c.content} tags={c.tags} img_url={c.img_url} />)}
                </CardGalleryMobileLayout>
            </div>
        )
    }
}

export default CardGallery;
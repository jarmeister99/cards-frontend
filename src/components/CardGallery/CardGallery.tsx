import React, { useEffect } from 'react';
import Card, { ICard } from '../Card/Card';
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectCards, fetchCardsAsync } from '../../features/cards/cardSlice';

const CardGalleryLayout = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
interface ICardGallery {
}

const CardGallery: React.FC<ICardGallery> = (props: ICardGallery): JSX.Element => {
    const cards: ICard[] = useAppSelector(selectCards);
    const dispatch = useAppDispatch();
  
    // on first render, dispatch the result of fetchCardsAsync()
    useEffect(() => {
      dispatch(fetchCardsAsync())
    }, [dispatch])  // dispatch is guaranteed to be stable and does not need to be included here. 
    return (
        <CardGalleryLayout>
            {cards.map(c => <Card key={c._id?.$oid} _id={c._id} title={c.title} teaser={c.teaser} link={c.link} content={c.content} tags={c.tags} img_url={c.img_url} />)}
        </CardGalleryLayout>
    )
}

export default CardGallery;
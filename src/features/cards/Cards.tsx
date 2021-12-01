import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchCardsAsync,
  remove,
  selectCards
} from './cardSlice';

export function Cards() {
  const cards = useAppSelector(selectCards);
  const dispatch = useAppDispatch();

  // on first render, dispatch the result of fetchCardsAsync()
  useEffect(() => {
    dispatch(fetchCardsAsync())
  }, [dispatch])  // dispatch is guaranteed to be stable and does not need to be included here. 
  return (
    <div>
      {cards.map(card => <p key={card._id.$oid} onClick={e => dispatch(remove(card._id.$oid))}>{card.title}</p>)}
    </div>
  );
}

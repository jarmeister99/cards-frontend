import React, { SyntheticEvent, useEffect, useState } from 'react'
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { filter, selectCards } from '../../features/cards/cardSlice';
import { ICard } from '../Card/Card';

const TagFilterInput = styled.input`
    width: max(30%, 300px);
    margin: auto;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid gray;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    &:focus{
        outline: none;
    }
`;
interface ITagFilter {
}

const TagFilter: React.FC<ITagFilter> = (props: ITagFilter): JSX.Element => {
    const [tagEntry, setTagEntry] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    
    const dispatch = useAppDispatch();
  
    // filter cards based on selected tags every time they change
    useEffect(() => {
      dispatch(filter(selectedTags))
    }, [dispatch, selectedTags])  // dispatch is guaranteed to be stable and does not need to be included here. 

    // TODO: this is duplicate code from createcard - fix that.
    const handleTagEntry = (e: SyntheticEvent) => {
        if (e.nativeEvent instanceof InputEvent) { // Just making typescript happy - TODO clean this up
            if (e.nativeEvent.data === ' ') {
                if (!(selectedTags.includes(tagEntry) || tagEntry === '')) {
                    setSelectedTags([...selectedTags, tagEntry.toLowerCase()]);
                    setTagEntry('');
                }
                else {
                    setTagEntry('');
                }
            }
            else {
                setTagEntry((e.target as HTMLInputElement).value)
            }
        }
    }
    return (
        <>
            <TagFilterInput onChange={handleTagEntry} value={tagEntry}></TagFilterInput>
            <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "1em" }}>
                {selectedTags.map(t => <span key={t}>{t}</span>)}
            </div>
        </>
    )
}

export default TagFilter;
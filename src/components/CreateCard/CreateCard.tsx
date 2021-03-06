import axios from 'axios';
import React, { SyntheticEvent, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { useAppDispatch } from '../../app/hooks';
import { fetchCardsAsync } from '../../features/cards/cardSlice';
import { ICard } from '../Card/Card';

import { PaleVioletButton } from '../Generic/Buttons/Buttons';
import '../Generic/Buttons/Buttons.scss';
import TagDisplay from '../TagDisplay/TagDisplay';
import './CreateCard.scss';

interface ICreateCard {
}
interface Point {
    x: number;
    y: number;
};

const CreateCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 1.5em;
    touch-action: none;
`;
const CreateCardHeader = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 1em;
    font-size: 2em;
    touch-action: none;
`;
const CreateCardForm = styled.form`
    touch-action: none;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: center;
    justify-content: space-between;
      
    label {
        text-align: center;
        margin-top: 0.5em;
        margin-bottom: 0.1em;
    }
    textarea{
        margin-top: 0.5em;
        margin-bottom: 0.1em;
        // width: 75%;
        width: min(75%, 20em);
    }
    input{
        margin-top: 0.5em;
        margin-bottom: 0.1em;
        // width: 75%;
        width: min(75%, 20em);
    }
    button{
        margin: 1em auto;
    }
`;

const CreateCard: React.FC<ICreateCard> = (props: ICreateCard): JSX.Element => {
    // allow modifying global state
    const dispatch = useAppDispatch();

    // local state
    const [formActive, setFormActive] = useState<Boolean>(false);

    // states for various controlled components
    const [title, setTitle] = useState<string>('');
    const [teaser, setTeaser] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [img_url, setImgUrl] = useState<string>('');
    const [tag_entry, setTagEntry] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);

    // touch tracking
    const startTouchPos = useRef<Point>({ x: 0, y: 0 });
    const touchPos = useRef<Point>({ x: 0, y: 0 });

    // responsive design
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });

    // local element refs
    const createPopupContainer = useRef<HTMLDivElement>(null);

    const exitFormListener = (e: MouseEvent) => {
        setFormActive(false);
        document.body.classList.remove('noscroll')
        createPopupContainer.current?.removeEventListener("mouseleave", exitFormListener)
    }
    const exitForm = () => {
        setFormActive(false);
        document.body.classList.remove('noscroll')
        createPopupContainer.current?.removeEventListener("mouseleave", exitFormListener)
    }
    const showForm = (e: SyntheticEvent) => {
        // TODO: would really like if we blurred the body here
        setFormActive(true);
        document.body.classList.add('noscroll')
        createPopupContainer.current?.addEventListener("mouseleave", exitFormListener)
    }

    // mobile swipe detection logic
    const endSwipeDetection = (e: SyntheticEvent) => {
        if (e.nativeEvent instanceof TouchEvent) { // Just making typescript happy - TODO clean this up
            const x_delta = Math.abs(startTouchPos.current.x - touchPos.current.x)
            const element_width = createPopupContainer.current?.offsetWidth; // TODO: our percentage seems to be incorrect on an actual phone - figure this out please?
            if (element_width !== undefined) {
                const swipe_percentage = x_delta / element_width;
                if (swipe_percentage > 0.25) {
                    exitForm();
                }
            }

        }
    }
    const startSwipeDetection = (e: SyntheticEvent) => {
        if (e.nativeEvent instanceof TouchEvent) { // Just making typescript happy - TODO clean this up
            startTouchPos.current = {
                x: e.nativeEvent.targetTouches[0].clientX,
                y: e.nativeEvent.targetTouches[0].clientY,
            }
            touchPos.current = {
                x: e.nativeEvent.targetTouches[0].clientX,
                y: e.nativeEvent.targetTouches[0].clientY,
            }
        }
    }
    const trackSwipe = (e: SyntheticEvent) => {
        e.stopPropagation();
        if (e.nativeEvent instanceof TouchEvent) { // Just making typescript happy - TODO clean this up
            touchPos.current = {
                x: e.nativeEvent.targetTouches[0].clientX,
                y: e.nativeEvent.targetTouches[0].clientY,
            }
        }
    }

    const clearEntry = () => {
        setTitle('');
        setTeaser('');
        setContent('');
        setLink('');
        setImgUrl('');
        setTags([]);
        setTagEntry('');
    }
    const submitForm = (e: SyntheticEvent) => {
        e.preventDefault();
        const formData: ICard = {title, teaser, content, link, img_url, tags};
        clearEntry();
        axios.post(`${process.env.REACT_APP_API_URI}/shares/`, formData).then(() => {
            dispatch(fetchCardsAsync())
        }).catch(error => {
            console.log(error);
        })

        exitForm();
    }
    const handleTagEntry = (e: SyntheticEvent) => {
        if (e.nativeEvent instanceof InputEvent) { // Just making typescript happy - TODO clean this up
            if (e.nativeEvent.data === ' ') {
                if (!(tags.includes(tag_entry) || tag_entry === '')) {
                    setTags([...tags, tag_entry]);
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

    // TODO: Make sure mobile users can tap to exit
    const className = "create-form" + (formActive ? " active" : "") + (isDesktop ? "" : " mobile");
    return (
        <>
            <div
                ref={createPopupContainer}
                className={className}
                onTouchStart={startSwipeDetection}
                onTouchEnd={endSwipeDetection}
                onTouchMove={trackSwipe}
            >
                <CreateCardHeader>Share a link!</CreateCardHeader>
                <CreateCardForm>
                    <label>Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)}></input>
                    <label>Teaser</label>
                    <textarea style={{ resize: "none" }} rows={2} value={teaser} onChange={e => setTeaser(e.target.value)}></textarea>
                    <label>Content</label>
                    <textarea style={{ resize: "none" }} rows={4} value={content} onChange={e => setContent(e.target.value)}></textarea>
                    <label>Link</label>
                    <input value={link} onChange={e => setLink(e.target.value)}></input>
                    <label>(Optional) Image URL</label>
                    <input value={img_url} onChange={e => setImgUrl(e.target.value)}></input>
                    <label>(Optional) Tags</label>
                    <input value={tag_entry} onChange={handleTagEntry}></input>
                    <TagDisplay tags={tags} setTags={setTags} />
                    <PaleVioletButton primary={true} className="expand" onClick={submitForm}>Submit</PaleVioletButton>
                </CreateCardForm>
            </div>
            <CreateCardContainer>
                <PaleVioletButton primary={true} className="expand" onClick={showForm}>Create</PaleVioletButton>
            </CreateCardContainer>
        </>
    )
}

export default CreateCard;
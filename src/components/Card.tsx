import React, { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import '../animations/rotateY.css';

export interface ICard {
    title: string;
    teaser: string;
    content?: string;
    link?: string;
};
interface Point {
    x: number;
    y: number;
}

const CardContainer = styled.div`
    width: 20%;
    border: 3px solid black;
    padding: 1em;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin: 1%;
    animation-fill-mode: forward;
    :hover {
        cursor: pointer;
    }

`;
const TitleContainer = styled.div`

`;
const TitleSpan = styled.div`
    font-weight: 750;
    text-align: center;
    :after {
        content: '';
        margin-top: 0.7em;
        margin-bottom: 0.7em;
        margin-left: 15%;
        width: 70%;
        height: 2px;
        background: black;
        display: block;
    }
`;
const ContentContainer = styled.div`
    margin-top: 5px;
`;

const Card: React.FC<ICard> = (props: ICard): JSX.Element => {
    const [animationRunning, setAnimationRunning]: [Boolean, Dispatch<SetStateAction<Boolean>>] = useState<Boolean>(false);

    const cardContainer = useRef<HTMLDivElement>(null);
    const mousePosition = useRef<Point>({ x: 0, y: 0 });
    const flipped = useRef<Boolean>(false);

    const flip = () => {
        // switch animation states
        cardContainer.current?.classList.add('rotateInwards');
        cardContainer.current?.classList.remove('rotateOutwards');

        flipped.current = true;
        setAnimationRunning(true);

        // start tracking mousePos()
        document.body.addEventListener('mousemove', trackMousePos)
        // attach animation end handler
        cardContainer.current?.addEventListener('animationend', animationEndHandler);
    }
    const unflip = () => {
        cardContainer.current?.classList.add('rotateOutwards');
        cardContainer.current?.classList.remove('rotateInwards');

        flipped.current = false;
        setAnimationRunning(true);

        // start tracking mousePos()
        document.body.addEventListener('mousemove', trackMousePos)
        // attach animation end handler
        cardContainer.current?.addEventListener('animationend', animationEndHandler);
    }
    const clearAnimation = () => {
        // no longer animating
        setAnimationRunning(false);

        // disable handler once it has triggered once
        cardContainer.current?.removeEventListener('animationend', animationEndHandler);
    }

    const animationEndHandler = () => {
        document.body.removeEventListener('mousemove', trackMousePos);

        // unpack mouse position for ease of use
        const x = mousePosition.current.x;
        const y = mousePosition.current.y;

        // get rect created by the square
        const domRect: DOMRect | undefined = cardContainer.current?.getBoundingClientRect();

        if (domRect !== undefined) { // we love typescript
            // if we just finished a flip, we better be in the box
            if (flipped.current) {
                // is the point not in the box?
                if (!((x >= domRect.x && x <= domRect.x + domRect.width) && (y >= domRect.y && y <= domRect.y + domRect.height))) {
                    // then let's unflip ourselves
                    unflip();
                }
                // is the point in the box?
                else {
                    // animation is over
                    clearAnimation();
                }
            }
            // if we just finished an unflip, we better be out of the box
            else {
                // is the point in the box?
                if ((x >= domRect.x && x <= domRect.x + domRect.width) && (y >= domRect.y && y <= domRect.y + domRect.height)) {
                    // then let's flip ourselves
                    flip();
                }
                // if the point not in the box?
                else {
                    // animation is over
                    clearAnimation();
                }
            }
        }
        // freak case that should never happen - unflip just to have reliable behavior
        else {
            unflip();
        }
        console.log(`Animation running: ${animationRunning}`)
        
    }
    const trackMousePos = (e: MouseEvent) => {
        mousePosition.current.x = e.pageX;
        mousePosition.current.y = e.pageY;
    }
    const mouseEnterHandler = (e: SyntheticEvent) => {
        if (!animationRunning) {
            // switch animation states
            flip();
        }
    };
    const mouseLeaveHandler = (e: SyntheticEvent) => {
        console.log(`animation running on mouseLeave: ${animationRunning}`)
        if (!animationRunning) {
            console.log('wtf?')
            // switch animation states
            unflip();
        }
    };
    const clickHandler = (e: SyntheticEvent) => {
        window.location.href = props.link || '/';
    }

    return (
        <CardContainer ref={cardContainer} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} onClick={clickHandler}>
            {!flipped.current && <TitleContainer><TitleSpan>{props.title}</TitleSpan></TitleContainer>}
            <ContentContainer>
                {!flipped.current && props.teaser}
                {flipped.current && props.content}
            </ContentContainer>
        </CardContainer>
    )

}

export default Card;
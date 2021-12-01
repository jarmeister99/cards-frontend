import styled from "styled-components";

interface ITagDisplay {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin-top: 1em;
`;

const TagDisplay: React.FC<ITagDisplay> = (props: ITagDisplay): JSX.Element => {
    const tags = props.tags;
    const setTags = props.setTags;
    return (
        <TagContainer>
            {props.tags.map(tag => <span onClick={() => {setTags(tags.filter(t => t !== tag))}}>{tag}</span>)}
        </TagContainer>
    )
}

export default TagDisplay;
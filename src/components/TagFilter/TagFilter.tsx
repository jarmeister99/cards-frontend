import React from 'react'
import styled from 'styled-components';

const TagFilterInput = styled.input`
    width: 100%;
    margin: auto;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid gray;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    &:focus{
        outline: none;
    }
`;

const TagFilter: React.FC = (props): JSX.Element => {
    return (
        <div>
            <TagFilterInput></TagFilterInput>
        </div>
    )
}

export default TagFilter;
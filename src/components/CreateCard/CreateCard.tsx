import React from 'react';
import styled from 'styled-components';
import { PaleVioletButton } from '../Generic/Buttons/Buttons';
import '../Generic/Buttons/Buttons.scss'

const CreateCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 1.5em;
    * {
        margin: 0 1em;
    }
`;

const CreateCard: React.FC = (props): JSX.Element => {
    return (
        <CreateCardContainer>
            <PaleVioletButton primary={true} className="expand">Create</PaleVioletButton>
        </CreateCardContainer>
    )
}

export default CreateCard;
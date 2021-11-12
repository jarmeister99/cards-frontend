import React from 'react';
import styled from 'styled-components';
import { PaleVioletButton } from '../Generic/Buttons/Buttons';
import '../Generic/Buttons/Buttons.scss'

const CreateCardContainer = styled.div`
    margin: auto;
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const CreateCard: React.FC = (props): JSX.Element => {
    return (
        <CreateCardContainer>
            <PaleVioletButton primary={true} className="expand centered">Create</PaleVioletButton>
        </CreateCardContainer>
    )
}

export default CreateCard;
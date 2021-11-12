import React from 'react';
import styled from 'styled-components';
import { PaleVioletButton } from '../Generic/Buttons/Buttons';
import '../Generic/Buttons/Buttons.scss'


const CreateCard: React.FC = (props): JSX.Element => {
    return (
        <div>
            <PaleVioletButton primary={true} className="expand centered">Create</PaleVioletButton>
        </div>
    )
}

export default CreateCard;
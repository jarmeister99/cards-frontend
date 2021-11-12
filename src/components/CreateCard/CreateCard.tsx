import React from 'react';
import { PaleVioletButton } from '../Generic/Buttons/Buttons';
import '../Generic/Buttons/Buttons.scss'

const CreateCard: React.FC = (props): JSX.Element => {
    return (
        <div>
            <PaleVioletButton primary={true} className="expand">Create</PaleVioletButton>
        </div>
    )
}

export default CreateCard;
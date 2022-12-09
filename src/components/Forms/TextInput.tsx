import React, { FormEvent, ReactElement, useState } from 'react';
import { FormGroup, Label, Col, Input, Tooltip } from 'reactstrap';
import { InputFieldTypes } from '../../common/constants/constants';

interface ITextInputProps {
    disabled: boolean;
    id: string;
    inputType: InputFieldTypes;
    invalid?: boolean;
    label: string;
    onChange: (e: FormEvent<HTMLInputElement>) => void;
    value: string;
    valid?: boolean;
    validationText: string;
}

/**
 * Breaking inputs into their own class to tie in a tooltip for valid input instructions.
 */
function TextInput({ disabled, id, inputType, invalid, label, onChange, value, valid, validationText }: ITextInputProps): ReactElement {
    // Tooltip state
    const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

    // Toggler function
    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <FormGroup row>
            <Label sm={2}>{label}</Label>
            <Col sm={10}>
                <Input
                    id={`Tooltip-${id}`}
                    type={inputType}
                    placeholder={`${label}`}
                    value={value}
                    onChange={onChange}
                    invalid={invalid}
                    valid={valid}
                    readOnly={disabled}
                />
                {(id === 'passwordConfirm' && invalid) &&
                    <p className='text-danger mt-2 text-start'>Passwords do not match</p>
                }
            </Col>
            <Tooltip
                placement={'top'}
                isOpen={tooltipOpen}
                target={`Tooltip-${id}`}
                toggle={toggle}
            >
                {validationText}
            </Tooltip>
        </FormGroup>
    );
};

export default TextInput;
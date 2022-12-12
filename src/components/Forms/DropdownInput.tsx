import _ from 'lodash';
import React, { ChangeEvent, ChangeEventHandler, ReactElement, useState } from 'react';
import { FormGroup, Label, Col, Input, Tooltip } from 'reactstrap';

// Utils
import { EntityTypes, InputFieldTypes } from '../../common/constants/constants';

interface ITextInputProps {
    disabled: boolean;
    entityType: EntityTypes;
    invalid?: boolean;
    label: string;
    onSelect: (e: ChangeEvent<HTMLInputElement>) => void;
    selectedValue: string;
    values: Array<{ id: string; name: string}>;
}

/**
 * Breaking inputs into their own class to tie in a tooltip for valid input instructions.
 */
function DropdownInput({ disabled, entityType, label, onSelect, selectedValue, values }: ITextInputProps): ReactElement {

    return (
        <FormGroup row>
            <Label sm={2}>{label}</Label>
            <Col sm={10}>
                <Input
                    type={InputFieldTypes.SELECT}
                    readOnly={disabled}
                    onChange={(e) => onSelect(e)}
                    value={selectedValue}
                >
                    <option id='' value=''>
                        No {entityType}
                    </option>
                    {!_.isEmpty(values) &&
                        _.map(values, (value) => {
                            return (
                                <option id={value.id} value={value.id}>
                                    {value.name}
                                </option>
                            )
                        })
                    };
                </Input>
            </Col>
        </FormGroup>
    );
};

export default DropdownInput;
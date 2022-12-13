import React, { FormEvent, ReactElement, useState } from 'react';
import { Row, Col, Input, Tooltip } from 'reactstrap';
import * as _ from 'lodash';

// Utils
import { InputFieldTypes } from '../../common/constants/constants';

interface ITableInputTextProps {
    id: string;
    invalid: boolean;
    isEditMode: boolean;
    isSalary?: boolean;
    onChange: (e: FormEvent<HTMLInputElement>) => void;
    tooltipText: string;
    value: string;
    valid: boolean;
}

function TableInputText({ id, invalid, isEditMode, isSalary, onChange, tooltipText, value, valid}: ITableInputTextProps): ReactElement {
    // Tooltip state
    const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

    // Toggler function
    const toggle = () => setTooltipOpen(!tooltipOpen);

    // Number formatter for salary
    const formatter: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <Row className='justify-content-center'>
            <Col sm={12}>
                {isEditMode &&
                    <>
                        <Input
                            id={`Tooltip-${id}`}
                            type={InputFieldTypes.TEXT}
                            value={value}
                            onChange={onChange}
                            valid={valid}
                            invalid={invalid}
                        />
                        <Tooltip
                            placement={'top'}
                            isOpen={tooltipOpen}
                            target={`Tooltip-${id}`}
                            toggle={toggle}
                        >
                            {tooltipText}
                        </Tooltip>
                    </>
                }
                {(!isEditMode && !isSalary) &&
                    <>
                        {!_.isEmpty(value) ? value : 'No Information'}
                    </>
                }
                {(!isEditMode && isSalary) &&
                    <>
                        {!_.isEmpty(value) ? formatter.format(parseInt(value)) : 'No Information'}
                    </>
                }
            </Col>
        </Row>
    );
};

export default TableInputText;
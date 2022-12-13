import React, { FormEvent, ReactElement, useState } from 'react';
import { Row, Col, Input, Tooltip, Button } from 'reactstrap';
import * as _ from 'lodash';

// Utils
import { ComponentColor, CurrentViewOptions, InputFieldTypes } from '../../common/constants/constants';

interface ITableInputTextProps {
    currentViewHandler?: Function;
    id?: string;
    invalid: boolean;
    isEditMode: boolean;
    isSalary?: boolean;
    linkView?: CurrentViewOptions
    onChange: (e: FormEvent<HTMLInputElement>) => void;
    tooltipId: string;
    tooltipText: string;
    value: string;
    valid: boolean;
}

function TableInputText({ currentViewHandler, id, invalid, isEditMode, isSalary, linkView, onChange, tooltipId, tooltipText, value, valid}: ITableInputTextProps): ReactElement {
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
                            id={`Tooltip-${tooltipId}`}
                            type={InputFieldTypes.TEXT}
                            value={value}
                            onChange={onChange}
                            valid={valid}
                            invalid={invalid}
                        />
                        <Tooltip
                            placement={'top'}
                            isOpen={tooltipOpen}
                            target={`Tooltip-${tooltipId}`}
                            toggle={toggle}
                        >
                            {tooltipText}
                        </Tooltip>
                    </>
                }
                {(!isEditMode && !isSalary && _.isNil(currentViewHandler) && _.isNil(id)) &&
                    <>
                        {!_.isEmpty(value) ? value : 'No Information'}
                    </>
                }
                {(!isEditMode && !isSalary && !_.isNil(currentViewHandler) && !_.isNil(id)) &&
                    <Button
                        color={ComponentColor.LINK}
                        onClick={
                            () => currentViewHandler(linkView, id)
                        }
                    >{value}</Button>
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
import React, { ReactElement } from 'react';
import { FormGroup, Col, Spinner, Button } from 'reactstrap';
import { ComponentColor } from '../../../common/constants/constants';

interface IAddFormButtonsProps {
    isLoading: boolean;
    onSubmit: () => void;
    onCancel: () => void;
    isDisabled: boolean;
}

function AddFormButtons({ isLoading, onSubmit, onCancel, isDisabled }: IAddFormButtonsProps): ReactElement {
    return (
        <FormGroup
            check
            row
        >
            <Col
                sm={{
                    offset: 1,
                    size: 10
                }}
            >
                {isLoading
                    ?
                        <Spinner>
                            Processing request...
                        </Spinner>
                    :
                    <>
                        <Button color={ComponentColor.PRIMARY} onClick={onSubmit} disabled={isDisabled}>
                            Submit
                        </Button>
                        &nbsp;
                        <Button color={ComponentColor.SECONDARY} onClick={onCancel}>
                            Clear Form
                        </Button>
                    </>
                }
            </Col>
        </FormGroup>
    );
}

export default AddFormButtons;
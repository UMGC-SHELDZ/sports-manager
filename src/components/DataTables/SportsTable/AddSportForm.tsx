
import React, { FormEvent, ReactElement, useContext, useEffect, useState } from 'react';
import * as _ from 'lodash';
import { Button, Col, Form, FormGroup, Row, Spinner, Table, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { ComponentColor, InputFieldTypes } from '../../../common/constants/constants';
import IToastData from '../../../common/interfaces/IToastData';
import { validateName } from '../../../common/utils/validationUtil';
import TextInput from '../../Forms/TextInput';
import { EntityContext } from '../../../providers/EntityProvider';
import ISport from '../../../common/interfaces/ISport';
import { AxiosError } from 'axios';
import sportsService from '../../../services/sportsService';
import { configureToast } from '../../../common/utils/toastUtil';
import { UserContext } from '../../../providers/UserProvider';


function AddSportForm(): ReactElement {
    // global state
    const { dispatch } = useContext(EntityContext);
    const { authToken } = useContext(UserContext);

    // State for form
    const [isValid, setIsValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // State for sport variables
    const [sportName, setSportsName] = useState<string>('');

    // Toast State
    const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
    const [toastData, setToastData] = useState<IToastData>({ toastIcon: ComponentColor.DANGER, toastHeader: 'Error', toastBody: 'Something went wrong' });

    // Check form validity on sports name update
    useEffect(() => {
        setIsValid(validateName(sportName));
    }, [sportName]);

    // Handlers for UI actions
    /**
     * Handler for changing the name of a sport
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleSportsNameChange = (e: FormEvent<HTMLInputElement>): void => {
        setSportsName(e.currentTarget.value);
    };

    /**
     * Handler to save a sport
     */
    const handleSaveSport = async (): Promise<void> => {
        setIsLoading(true);

        const newSportData: ISport = {
            sportName: sportName
        };

        const newSport: ISport | AxiosError = await sportsService.add(newSportData, authToken as string);
        // If there is a server error, let the user know something went wrong with their request.
        if (newSport instanceof AxiosError) {
            setToastData(configureToast(ComponentColor.DANGER, 'Error', 'Something went wrong with processing your request.'));
            setIsToastOpen(true);
            clearForm();
            setIsLoading(false);
            return;
        }

        // Add manager to state
        dispatch({
            type: 'ADD_SPORT',
            sport: newSport
        });

        clearForm();
        setIsLoading(false);
    }

    /**
     * Handler to clear the sports form
     */
    const clearForm = (): void => {
        setSportsName('');
    }

    return (
        <>
            <Row className={'justify-content-center mt-3 mb-3 border-bottom'}>
                <Col md={8} className={'mb-3'}>
                    <Form>
                        <h3>Add Sport</h3>
                        <TextInput
                            id='sportInput'
                            inputType={InputFieldTypes.TEXT}
                            label='Name of Sport'
                            value={sportName}
                            onChange={handleSportsNameChange}
                            valid={_.size(sportName) > 0 && validateName(sportName)}
                            invalid={_.size(sportName) > 0 && !validateName(sportName)}
                            disabled={isLoading}
                            validationText={'Name of sport must only contain letters and be of a length between 3 and 20 characters'}
                        />
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
                                        <Button color={ComponentColor.PRIMARY} onClick={handleSaveSport} disabled={!isValid}>
                                            Submit
                                        </Button>
                                        &nbsp;
                                        <Button color={ComponentColor.SECONDARY} onClick={clearForm}>
                                            Clear Form
                                        </Button>
                                    </>
                                }
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Toast isOpen={isToastOpen}>
                <ToastHeader icon={toastData.toastIcon} toggle={() => setIsToastOpen(false)}>
                    {toastData.toastHeader}
                </ToastHeader>
                <ToastBody>
                    {toastData.toastBody}
                </ToastBody>
            </Toast>
        </>
    );
};

export default AddSportForm;
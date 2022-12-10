import React, { FormEvent, ReactElement, useContext, useEffect, useState } from 'react'
import * as _ from 'lodash';
import { AxiosError } from 'axios';

// Constants
import { ComponentColor, CurrentViewOptions, InputFieldTypes } from '../../../common/constants/constants';
import { validateName, validatePassword, validateUsername } from '../../../common/utils/validationUtil';
import { Button, Col, Form, FormGroup, Row, Spinner, Toast, ToastBody, ToastHeader } from 'reactstrap';
import TextInput from '../TextInput';
import managersService from '../../../services/managersService';
import IManager from '../../../common/interfaces/IManager';
import { configureToast } from '../../../common/utils/toastUtil';
import IToastData from '../../../common/interfaces/IToastData';
import { EntityContext } from '../../../providers/EntityProvider';

// Props for RegistrationForm
interface IRegistrationFormProps {
    setCurrentView: Function;
}

function RegistrationForm({ setCurrentView }: IRegistrationFormProps): ReactElement {
    // To add manager option to global state
    const { dispatch } = useContext(EntityContext);

    // Form State
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false);

    // Data State
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');

    // Toast State
    const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
    const [toastData, setToastData] = useState<IToastData>({ toastIcon: ComponentColor.DANGER, toastHeader: 'Error', toastBody: 'Something went wrong' });

    // Changes to form data runs validations
    useEffect(() => {
        setIsValid(validateForm);
    }, [firstName, lastName, userName, password, passwordConfirm]);

    const validateForm = (): boolean => {
        // Add more validations
        const validations: { [key: string]: boolean } = {
            firstName: validateName(firstName),
            lastName: validateName(lastName),
            password: validatePassword(password),
            passwordMatch: password === passwordConfirm,
            userName: validateUsername(userName)
        }

        // Check for invalid values
        const invalid: Array<boolean> = _.filter(validations, (value, key) => value === false);

        // If the invalid is an empty array, no validation errors.
        return _.isEmpty(invalid);
    };

    /**
     * Helper function to clear the form.
     */
    const clearForm = (): void => {
        setFirstName('');
        setLastName('');
        setUserName('');
        setPassword('');
        setPasswordConfirm('');
    }
    
    // Action handlers
    const handleRegistration = async (): Promise<void> => {
        setIsLoading(true)
        // Create manager data
        const newManagerData: IManager = {
            firstName,
            lastName,
            userName,
            password
        }

        // Create the new manager
        const newManager: IManager | AxiosError = await managersService.addManager(newManagerData);

        // If there is a server error, let the user know something went wrong with their request.
        if (newManager instanceof AxiosError) {
            setToastData(configureToast(ComponentColor.DANGER, 'Error', 'Something went wrong with processing your request.'));
            setIsToastOpen(true);
            clearForm();
            setIsLoading(false);
            return;
        }

        // Add manager to state
        dispatch({
            type: 'ADD_MANAGER',
            manager: newManager
        });

        setIsLoading(false);
        setCurrentView(CurrentViewOptions.LOGIN)
    };

    /**
     * Handler for changing the last name of a manager
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
     const handleLastNameChange = (e: FormEvent<HTMLInputElement>): void => {
        setLastName(e.currentTarget.value);
    };

    /**
     * Handler for changing the first name of a manager
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleFirstNameChange = (e: FormEvent<HTMLInputElement>): void => {
        setFirstName(e.currentTarget.value);
    };

    /**
     * Handler for changing the userName of a manager
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleUsernameChange = (e: FormEvent<HTMLInputElement>): void => {
        setUserName(e.currentTarget.value);
    };
    
    /**
     * Handler for changing the password of a manager
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handlePasswordChange = (e: FormEvent<HTMLInputElement>): void => {
        setPassword(e.currentTarget.value);
    };

    /**
     * Handler for changing the password confirm of a manager
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
     const handlePasswordConfirmChange = (e: FormEvent<HTMLInputElement>): void => {
        setPasswordConfirm(e.currentTarget.value);
    };
    
    return (
        <>
            <Row className={'justify-content-center mt-3'}>
                <Col md={8}>
                    <Form>
                        <h3>Sign Up</h3>
                        <TextInput 
                            id={'firstName'}
                            inputType={InputFieldTypes.TEXT}
                            label={'First Name'}
                            value={firstName}
                            onChange={handleFirstNameChange}
                            invalid={_.size(firstName) > 0 && !validateName(firstName)}
                            valid={_.size(firstName) > 0 && validateName(firstName)}
                            validationText='First Name must be only letters with a length between 2 and 20 characters.'
                            disabled={isLoading}
                        />
                        <TextInput 
                            id={'lastName'}
                            inputType={InputFieldTypes.TEXT}
                            label='Last name'
                            value={lastName}
                            onChange={handleLastNameChange}
                            invalid={_.size(lastName) > 0 && !validateName(lastName)}
                            valid={_.size(lastName) > 0 && validateName(lastName)}
                            validationText='Last Name must be only letters with a length between 2 and 20 characters.'
                            disabled={isLoading}
                        />
                        <TextInput 
                            id={'userName'}
                            inputType={InputFieldTypes.TEXT}
                            label='User Name'
                            value={userName}
                            onChange={handleUsernameChange}
                            invalid={_.size(userName) > 0 && !validateUsername(userName)}
                            valid={_.size(userName) > 0 && validateUsername(userName)}
                            validationText='Username must be a length between 8 and 20 characters.'
                            disabled={isLoading}
                        />
                        <TextInput 
                            id={'password'}
                            inputType={InputFieldTypes.PASSWORD}
                            label='Password'
                            value={password}
                            onChange={handlePasswordChange}
                            invalid={_.size(password) > 0 && !validatePassword(password)}
                            valid={_.size(password) > 0 && validatePassword(password)}
                            validationText='Passwords must contain at least 12 characters, at least one number and at least one special character.'
                            disabled={isLoading}
                        />
                        <TextInput 
                            id={'passwordConfirm'}
                            inputType={InputFieldTypes.PASSWORD}
                            label='Confirm Password'
                            value={passwordConfirm}
                            onChange={handlePasswordConfirmChange}
                            invalid={(_.size(passwordConfirm) > 0 && password !== passwordConfirm)}
                            valid={(_.size(passwordConfirm) > 0 && password === passwordConfirm)}
                            validationText='Passwords must contain at least 12 characters, at least one number and at least one special character.'
                            disabled={isLoading}
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
                                        <Button color={ComponentColor.PRIMARY} onClick={handleRegistration} disabled={!isValid}>
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
    )
};

export default RegistrationForm;
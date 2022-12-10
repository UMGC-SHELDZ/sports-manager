import { AxiosError } from 'axios';
import _ from 'lodash';
import React, { FormEvent, ReactElement, useContext, useEffect, useState } from 'react'
import { Toast, ToastHeader, ToastBody, Button, Col, Form, FormGroup, Row, Spinner } from 'reactstrap';

// Constants
import { ComponentColor, CurrentViewOptions, InputFieldTypes } from '../../../common/constants/constants';

// Interfaces
import IToastData from '../../../common/interfaces/IToastData';
import { AuthenticatedUser } from '../../../common/types/LoginResponse';
import { configureToast } from '../../../common/utils/toastUtil';

// Global state
import { UserContext } from '../../../providers/UserProvider';
import managersService from '../../../services/managersService';
import TextInput from '../TextInput';

// Props for LoginForm
interface ILoginFormProps {
    setCurrentView: Function;
}

function LoginForm({ setCurrentView }: ILoginFormProps): ReactElement {
    // Import dispatch from global state
    const { dispatch } = useContext(UserContext);

    // Form State
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false);

    // Data State
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Toast State
    const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
    const [toastData, setToastData] = useState<IToastData>({ toastIcon: ComponentColor.DANGER, toastHeader: 'Error', toastBody: 'Something went wrong' });

    // Checks to state to ensure form data before enabling the Login button
    useEffect(() => {
        setIsValid(_.size(userName) > 0 && _.size(password) > 0)
    }, [userName, password]);

    // Form event handlers

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
     * Helper function to clear the form.
     */
    const clearForm = (): void => {
        setUserName('');
        setPassword('');
    }

    // MOCK login function to set authentication status
    /**
     * Handler to login to the application.
     */
     const handleLogin = async (): Promise<void> => {
        setIsLoading(true);

        // Attempt to login
        const authenticatedUser: AuthenticatedUser | AxiosError = await managersService.loginManager(userName, password);
        // If server error, generic toast display
        if (authenticatedUser instanceof AxiosError) {
            // 401 is invalid credentials
            if (authenticatedUser.response?.status === 401) {
                setToastData(configureToast(ComponentColor.DANGER, 'Error', 'Invalid username or password'));
            } else {
                setToastData(configureToast(ComponentColor.DANGER, 'Error', 'Something went wrong with processing your request.'));
            }
            setIsToastOpen(true);
            clearForm();
            setIsLoading(false);
            return;
        };

        // If authenticated, set auth in context
        dispatch({
            type: 'STORE_AUTHENTICATION',
            user: authenticatedUser.user,
            authToken: authenticatedUser.token
        });

        setIsLoading(false);
        setCurrentView(CurrentViewOptions.LOGIN_SUCCESS);
    };


    return (
        <>
            <Row className={'justify-content-center mt-3'}>
                <Col md={8}>
                    <Form>
                        <h3>Login</h3>
                        <TextInput 
                            id={'userName'}
                            inputType={InputFieldTypes.TEXT}
                            label='User Name'
                            value={userName}
                            onChange={handleUsernameChange}
                            validationText='Please input your username.'
                            disabled={isLoading}
                        />
                        <TextInput 
                            id={'password'}
                            inputType={InputFieldTypes.PASSWORD}
                            label='Password'
                            value={password}
                            onChange={handlePasswordChange}
                            validationText='Please input your password.'
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
                                        <Button color={ComponentColor.PRIMARY} onClick={handleLogin} disabled={!isValid}>
                                            Login
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

export default LoginForm;
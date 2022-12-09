import React, { FormEvent, ReactElement, useEffect, useState } from 'react'
import * as _ from 'lodash';

// Constants
import { CurrentViewOptions } from '../../common/constants/constants';
import { validatePassword } from '../../common/utils/validationUtil';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

// Props for RegistrationForm
interface IRegistrationFormProps {
    setCurrentView: Function;
}

function RegistrationForm({ setCurrentView }: IRegistrationFormProps): ReactElement {
    // Form State
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false);

    // Data State
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');

    // Changes to form data runs validations
    useEffect(() => {
        setIsValid(validateForm);
    }, [firstName, lastName, username, password, passwordConfirm]);

    const validateForm = (): boolean => {
        // Add more validations
        const validations: { [key: string]: boolean } = {
            password: validatePassword(password),
            passwordMatch: password === passwordConfirm
        }

        // Check for invalid values
        const invalid: Array<boolean> = _.filter(validations, (value, key) => value === false);

        // If the invalid is an empty array, no validation errors.
        return _.isEmpty(invalid);
    };

    const clearForm = (): void => {
        setFirstName('');
        setLastName('');
        setUsername('');
        setPassword('');
        setPasswordConfirm('');
    }
    
    // Action handlers
    const handleRegistration = async (): Promise<void> => {
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
     * Handler for changing the username of a manager
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleUsernameChange = (e: FormEvent<HTMLInputElement>): void => {
        setUsername(e.currentTarget.value);
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
        <Row className={'justify-content-center mt-3'}>
            <Col md={8}>
                <Form>
                    <h3>Sign Up</h3>
                    <FormGroup row>
                        <Label sm={2}>First Name</Label>
                        <Col sm={10}>
                            <Input
                                type='text'
                                placeholder='First name'
                                value={firstName}
                                onChange={handleFirstNameChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>Last Name</Label>
                        <Col sm={10}>
                            <Input
                                type='text'
                                placeholder='Last name'
                                value={lastName}
                                onChange={handleLastNameChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>Username</Label>
                        <Col sm={10}>
                            <Input
                                type='text'
                                placeholder='Enter username'
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>Password</Label>
                        <Col sm={10}>
                            <Input
                                type='password'
                                className='form-control'
                                placeholder='Enter password'
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <p className={'mt-2 text-start'}>* Passwords must contain at least 12 characters, at least one number and at least one special character</p>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>Confirm Password</Label>
                        <Col sm={10}>
                            <Input
                                type='password'
                                placeholder='Confirm password'
                                value={passwordConfirm}
                                onChange={handlePasswordConfirmChange}
                            />
                            {(_.size(passwordConfirm) > 0 && password !== passwordConfirm) && 
                                <p className='text-danger mt-2 text-start'>Passwords do not match</p>
                            }
                        </Col>
                    </FormGroup>
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
                            <Button color={'primary'} onClick={handleRegistration} disabled={!isValid}>
                                Submit
                            </Button>
                            &nbsp;
                            <Button color={'secondary'} onClick={clearForm}>
                                Clear Form
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        </Row>
    )
};

export default RegistrationForm;
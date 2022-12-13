
import React, { ChangeEvent, FormEvent, ReactElement, useContext, useEffect, useState } from 'react';
import * as _ from 'lodash';
import { Button, Col, Form, FormGroup, Row, Spinner, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { AxiosError } from 'axios';

// Custom Components
import TextInput from '../../Forms/TextInput';
import DropdownInput from '../../Forms/DropdownInput';

// State
import { EntityContext } from '../../../providers/EntityProvider';
import { UserContext } from '../../../providers/UserProvider';

// Interfaces
import IToastData from '../../../common/interfaces/IToastData';
import ITeam from '../../../common/interfaces/ITeam';
import IPlayer from '../../../common/interfaces/IPlayer';

// Utils
import { ComponentColor, EntityTypes, InputFieldTypes } from '../../../common/constants/constants';
import { configureToast } from '../../../common/utils/toastUtil';
import { validateName, validatePlayerNumber, validatePosition, validateSalary } from '../../../common/utils/validationUtil';

// Services
import playersService from '../../../services/playersService';
import { isEmpty } from 'lodash';

function AddPlayerForm(): ReactElement {
    // global state
    const { dispatch, teams } = useContext(EntityContext);
    const { authToken } = useContext(UserContext);

    // State for form
    const [isValid, setIsValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // State for team variables
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [teamId, setTeamId] = useState<string>('');
    const [position, setPosition] = useState<string>('');
    const [playerNumber, setPlayerNumber] = useState<string>('');
    const [salary, setSalary] = useState<string>('');

    // Toast State
    const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
    const [toastData, setToastData] = useState<IToastData>({ toastIcon: ComponentColor.DANGER, toastHeader: 'Error', toastBody: 'Something went wrong' });

    // Check form validity on team name update
    useEffect(() => {
        setIsValid(validateForm);
    }, [firstName, lastName, position, playerNumber, salary]);

    // Helper function for form validation
    const validateForm = (): boolean => {
        // Add more validations
        const validations: { [key: string]: boolean } = {
            firstName: validateName(firstName),
            lastName: validateName(lastName),
            position: validatePosition(position) || _.isEmpty(position),
            playerNumber: validatePlayerNumber(playerNumber) || _.isEmpty(playerNumber),
            salary: validateSalary(salary) || _.isEmpty(salary)
        };

        // Check for invalid values
        const invalid: Array<boolean> = _.filter(validations, (value, key) => value === false);

        // If the invalid is an empty array, no validation errors.
        return _.isEmpty(invalid);
    };

    // Handlers for UI actions
    /**
     * Handler for changing the first name of a player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleFirstNameChange = (e: FormEvent<HTMLInputElement>): void => {
        setFirstName(e.currentTarget.value);
    };

    /**
     * Handler for changing the last name of a player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleLastNameChange = (e: FormEvent<HTMLInputElement>): void => {
        setLastName(e.currentTarget.value);
    };

    /**
     * Handler for changing the position of a player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handlePositionChange = (e: FormEvent<HTMLInputElement>): void => {
        setPosition(e.currentTarget.value);
    };

    /**
     * Handler for changing the number of a player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handlePlayerNumberChange = (e: FormEvent<HTMLInputElement>): void => {
        setPlayerNumber(e.currentTarget.value);
    };

    /**
     * Handler for changing the salary of a player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
     const handleSalaryChange = (e: FormEvent<HTMLInputElement>): void => {
        setSalary(e.currentTarget.value);
    };

    /**
     * Handler for changing the team of a player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
    */
    const handleTeamSelect = (e: ChangeEvent<HTMLInputElement>): void => {
        setTeamId(e.currentTarget.value);
    };

    /**
     * Handler to save a team
     */
    const handleSaveTeam = async (): Promise<void> => {
        setIsLoading(true);

        const newPlayerData: IPlayer = {
            firstName: firstName,
            lastName: lastName,
        };

        // If team, position, playerNumber or salary are not empty, add them to the data
        if (!_.isEmpty(teamId)) {
            newPlayerData.team = teamId;
        };

        if (!_.isEmpty(position)) {
            newPlayerData.position = position;
        };

        if (!_.isEmpty(playerNumber)) {
            newPlayerData.playerNumber = parseInt(playerNumber);
        };

        if (!_.isEmpty(salary)) {
            newPlayerData.salary = parseInt(salary);
        };

        const newPlayer: IPlayer | AxiosError = await playersService.add(newPlayerData, authToken as string);

        // If there is a server error, let the user know something went wrong with their request.
        if (newPlayer instanceof AxiosError) {
            setToastData(configureToast(ComponentColor.DANGER, 'Error', 'Something went wrong with processing your request.'));
            setIsToastOpen(true);
            clearForm();
            setIsLoading(false);
            return;
        }

        // Add manager to state
        dispatch({
            type: 'ADD_PLAYER',
            player: newPlayer
        });

        clearForm();
        setIsLoading(false);
    }

    /**
     * Handler to clear the sports form
     */
    const clearForm = (): void => {
        setFirstName('');
        setLastName('');
        setPosition('');
        setPlayerNumber('');
        setSalary('');
        setTeamId('');
    };

    return (
        <>
            <Row className={'justify-content-center mt-3 mb-3 border-bottom'}>
                <Col md={8} className={'mb-3'}>
                    <Form>
                        <h3>Add Player</h3>
                        <TextInput
                            id='firstNameInput'
                            inputType={InputFieldTypes.TEXT}
                            label='First Name'
                            value={firstName}
                            onChange={handleFirstNameChange}
                            valid={_.size(firstName) > 0 && validateName(firstName)}
                            invalid={_.size(firstName) > 0 && !validateName(firstName)}
                            disabled={isLoading}
                            validationText={'First name must only contain letters and be of a length between 3 and 20 characters'}
                        />
                        <TextInput
                            id='lastNameInput'
                            inputType={InputFieldTypes.TEXT}
                            label='Last Name'
                            value={lastName}
                            onChange={handleLastNameChange}
                            valid={_.size(lastName) > 0 && validateName(lastName)}
                            invalid={_.size(lastName) > 0 && !validateName(lastName)}
                            disabled={isLoading}
                            validationText={'Last name must only contain letters and be of a length between 3 and 20 characters'}
                        />
                        <DropdownInput
                            label='Select Team'
                            values={_.map(teams, (team: ITeam) => {
                                return { id: team._id as string, name: team.teamName}
                            })}
                            onSelect={handleTeamSelect}
                            disabled={isLoading}
                            entityType={EntityTypes.TEAM}
                            selectedValue={teamId}
                        />
                        <TextInput
                            id='positionInput'
                            inputType={InputFieldTypes.TEXT}
                            label='Position'
                            value={position}
                            onChange={handlePositionChange}
                            valid={_.size(position) > 0 && validatePosition(position) || _.isEmpty(position)}
                            invalid={_.size(position) > 0 && !validatePosition(position)}
                            disabled={isLoading}
                            validationText={'Position may only contain letters, numbers and spaces and must be between 1 and 20 characters.'}
                        />
                        <TextInput
                            id='playerNumberInput'
                            inputType={InputFieldTypes.TEXT}
                            label='Player Number'
                            value={playerNumber}
                            onChange={handlePlayerNumberChange}
                            valid={_.size(playerNumber) > 0 && validatePlayerNumber(playerNumber) || _.isEmpty(playerNumber)}
                            invalid={_.size(playerNumber) > 0 && !validatePlayerNumber(playerNumber)}
                            disabled={isLoading}
                            validationText={'Player number may only contain numerical digits and be between 0 and 100.'}
                        />
                        <TextInput
                            id='salaryInput'
                            inputType={InputFieldTypes.TEXT}
                            label='Salary'
                            value={salary}
                            onChange={handleSalaryChange}
                            valid={_.size(salary) > 0 && validateSalary(salary) || _.isEmpty(salary)}
                            invalid={_.size(salary) > 0 && !validateSalary(salary)}
                            disabled={isLoading}
                            validationText={'Salary must be a numerical whole number above 0.'}
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
                                        <Button color={ComponentColor.PRIMARY} onClick={handleSaveTeam} disabled={!isValid}>
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

export default AddPlayerForm;
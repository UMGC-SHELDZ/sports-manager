
import React, { ChangeEvent, FormEvent, ReactElement, useContext, useEffect, useState } from 'react';
import * as _ from 'lodash';
import { Col, Form, Row, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { AxiosError } from 'axios';

// Custom Components
import TextInput from '../../Forms/TextInput';
import AddFormButtons from '../AddFormComponents/AddFormButtons';

// State
import { EntityContext } from '../../../providers/EntityProvider';
import { UserContext } from '../../../providers/UserProvider';

// Interfaces
import IToastData from '../../../common/interfaces/IToastData';
import ITeam from '../../../common/interfaces/ITeam';
import ISport from '../../../common/interfaces/ISport';
import IManager from '../../../common/interfaces/IManager';

// Utils
import { ComponentColor, EntityTypes, InputFieldTypes } from '../../../common/constants/constants';
import { configureToast } from '../../../common/utils/toastUtil';
import { validateName } from '../../../common/utils/validationUtil';

// Services
import teamsService from '../../../services/teamsService';
import DropdownInput from '../../Forms/DropdownInput';

function AddTeamForm(): ReactElement {
    // global state
    const { dispatch, sports, managers } = useContext(EntityContext);
    const { authToken } = useContext(UserContext);

    // State for form
    const [isValid, setIsValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // State for team variables
    const [teamName, setTeamName] = useState<string>('');
    const [sportId, setSportId] = useState<string>('');
    const [managerId, setManagerId] = useState<string>('');

    // Toast State
    const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
    const [toastData, setToastData] = useState<IToastData>({ toastIcon: ComponentColor.DANGER, toastHeader: 'Error', toastBody: 'Something went wrong' });

    // Check form validity on team name update
    useEffect(() => {
        setIsValid(validateName(teamName));
    }, [teamName]);

    // Handlers for UI actions
    /**
     * Handler for changing the name of a team
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleTeamNameChange = (e: FormEvent<HTMLInputElement>): void => {
        setTeamName(e.currentTarget.value);
    };

    /**
     * Handler for changing the sport of a team
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleSportSelect = (e: ChangeEvent<HTMLInputElement>): void => {
        setSportId(e.currentTarget.value);
    };

    /**
     * Handler for changing the manager of a team
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
    */
    const handleManagerSelect = (e: ChangeEvent<HTMLInputElement>): void => {
        setManagerId(e.currentTarget.value);
    };

    /**
     * Handler to save a team
     */
    const handleSaveTeam = async (): Promise<void> => {
        setIsLoading(true);

        const newTeamData: ITeam = {
            teamName: teamName,
        };

        // If sport or manage is not empty, set them on the new team object
        if (!_.isEmpty(sportId)) {
            newTeamData.sport = sportId;
        };

        if (!_.isEmpty(managerId)) {
            newTeamData.manager = managerId;
        };

        const newTeam: ITeam | AxiosError = await teamsService.add(newTeamData, authToken as string);

        // If there is a server error, let the user know something went wrong with their request.
        if (newTeam instanceof AxiosError) {
            setToastData(configureToast(ComponentColor.DANGER, 'Error', 'Something went wrong with processing your request.'));
            setIsToastOpen(true);
            clearForm();
            setIsLoading(false);
            return;
        }

        // Add manager to state
        dispatch({
            type: 'ADD_TEAM',
            team: newTeam
        });

        clearForm();
        setIsLoading(false);
    }

    /**
     * Handler to clear the sports form
     */
    const clearForm = (): void => {
        setTeamName('');
        setSportId('');
        setManagerId('');
    };

    return (
        <>
            <Row className={'justify-content-center mt-3 mb-3 border-bottom'}>
                <Col md={8} className={'mb-3'}>
                    <Form>
                        <h3>Add Team</h3>
                        <TextInput
                            id='teamInput'
                            inputType={InputFieldTypes.TEXT}
                            label='Name of Team'
                            value={teamName}
                            onChange={handleTeamNameChange}
                            valid={_.size(teamName) > 0 && validateName(teamName)}
                            invalid={_.size(teamName) > 0 && !validateName(teamName)}
                            disabled={isLoading}
                            validationText={'Name of team must only contain letters and be of a length between 3 and 20 characters'}
                        />
                        <DropdownInput
                            label='Sport'
                            values={_.map(sports, (sport: ISport) => {
                                return { id: sport._id as string, name: sport.sportName }
                            })}
                            onSelect={handleSportSelect}
                            disabled={isLoading}
                            entityType={EntityTypes.SPORT}
                            selectedValue={sportId}
                        />
                        <DropdownInput
                            label='Manager'
                            values={_.map(managers, (manager: IManager) => {
                                return { id: manager._id as string, name: `${manager.firstName} ${manager.lastName}`}
                            })}
                            onSelect={handleManagerSelect}
                            disabled={isLoading}
                            entityType={EntityTypes.MANAGER}
                            selectedValue={managerId}
                        />
                        <AddFormButtons
                            isLoading={isLoading}
                            onSubmit={handleSaveTeam}
                            onCancel={clearForm}
                            isDisabled={!isValid}
                        />
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

export default AddTeamForm;
import React, { ChangeEvent, ChangeEventHandler, FormEvent, ReactElement, useContext, useEffect, useState } from 'react';
import * as _ from 'lodash';
import { AxiosError } from 'axios';

// Hooks
import { useAuthentication } from '../../../hooks/useAuthentication';
import { EntityContext } from '../../../providers/EntityProvider';
import { UserContext } from '../../../providers/UserProvider';

// Interfaces
import ITeam from '../../../common/interfaces/ITeam';
import IPlayer from '../../../common/interfaces/IPlayer';

// Custom Components
import AddFormOptions from '../AddFormComponents/AddFormOptions';

// Utils
import { validateName, validatePlayerNumber, validatePosition, validateSalary } from '../../../common/utils/validationUtil';
import { ComponentColor, EntityTypes } from '../../../common/constants/constants';
import { configureToast } from '../../../common/utils/toastUtil';

// Services
import playersService from '../../../services/playersService';
import TableInputText from '../../Forms/TableInputText';
import TableDropdownInput from '../../Forms/TableDropdownInput';
import { isEmpty } from 'lodash';

interface IPlayersTableRow {
    player: IPlayer;
    setIsToastOpen: Function;
    setToastData: Function;
}

function PlayersTableRow({ player, setIsToastOpen, setToastData }: IPlayersTableRow): ReactElement {
    // Check authentication
    const isAuthenticated: boolean = useAuthentication();

    // global state
    const { teams, dispatch } = useContext(EntityContext);
    const { authToken } = useContext(UserContext)

    // State for Team variables
    const [firstName, setFirstName] = useState<string>(player.firstName);
    const [lastName, setLastName] = useState<string>(player.lastName);
    const [team, setTeam] = useState<string>(_.isNil(player.team) ? '' : player.team);
    const [position, setPosition] = useState<string>(_.isNil(player.position) ? '' : player.position);
    const [playerNumber, setPlayerNumber] = useState<string>(_.isNil(player.playerNumber) ? '' : player.playerNumber.toString());
    const [salary, setSalary] = useState<string>(_.isNil(player.salary) ? '' : player.salary.toString());
    const [teamName, setTeamName] = useState<string>('')

    // Sets edit state
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    // Form state
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState<boolean>(false);

    // Sets the number of players, the sport and the manager name when a team is passed into a table row
    useEffect(() => {
        if (!_.isEmpty(team)) {
            const foundTeam: ITeam | undefined = _.find(teams, (teamOpt) => teamOpt._id as string === team);
            !_.isNil(foundTeam) && setTeamName(foundTeam.teamName);
        };
        
    }, [player]);

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

    /**
     * Helper function for toggling edit mode.
     */
    const toggleIsEditMode = () => {
        setFirstName(player.firstName);
        setLastName(player.lastName);
        setTeam(!_.isNil(player.team) ? player.team : '');
        setPosition(!_.isNil(player.position) ? player.position : '');
        setPlayerNumber(!_.isNil(player.playerNumber) ? player.playerNumber.toString() : '');
        setSalary(!_.isNil(player.salary) ? player.salary.toString() : '');
        setIsEditMode(!isEditMode);
    };

    // Handlers for UI actions
    /**
     * Handler for changing the first name of the player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleFirstNameChange = (e: FormEvent<HTMLInputElement>): void => {
        setFirstName(e.currentTarget.value);
    };

    /**
     * Handler for changing the last name of the player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleLastNameChange = (e: FormEvent<HTMLInputElement>): void => {
        setLastName(e.currentTarget.value);
    };

    /**
     * Handler for changing the team of a player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleTeamSelect = (e: ChangeEvent<HTMLInputElement>): void => {
        setTeam(e.currentTarget.value);
    };

    /**
     * Handler for changing the position of the player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
     const handlePositionChange = (e: FormEvent<HTMLInputElement>): void => {
        setPosition(e.currentTarget.value);
    };

    /**
     * Handler for changing the number of the player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
     const handlePlayerNumberChange = (e: FormEvent<HTMLInputElement>): void => {
        setPlayerNumber(e.currentTarget.value);
    };

    /**
     * Handler for changing the salary of the player
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
     const handleSalaryChange = (e: FormEvent<HTMLInputElement>): void => {
        setSalary(e.currentTarget.value);
    };

    // Service handlers

    /**
     * Handler to delete a player
     */
    const handleDeletePlayer = async (): Promise<void> => {
        setIsLoading(true);
        setIsEditMode(false);

        const deleteResp = await playersService.delete(player._id as string, authToken as string);

        // If there is a server error, let the user know something went wrong with their request.
        if (deleteResp instanceof AxiosError) {
            setToastData(configureToast(ComponentColor.DANGER, 'Error', 'Something went wrong with processing your request.'));
            setIsToastOpen(true);
            setIsLoading(false);
            return;
        }

        // Add manager to state
        dispatch({
            type: 'DELETE_PLAYER',
            player: player
        });

        setIsLoading(false);
    }

    /**
     * Handler to save a player
     */
    const handleSavePlayer = async (): Promise<void> => {
        setIsLoading(true);
        setIsEditMode(false);

        const updatePlayerData: IPlayer = {
            _id: player._id,
            firstName: firstName,
            lastName: lastName
        };

        // If optional fields not empty, set them on the new player object
        if (!_.isEmpty(team)) {
            updatePlayerData.team = team;
        };

        if (!_.isEmpty(position)) {
            updatePlayerData.position = position;
        };

        if (!_.isEmpty(playerNumber)) {
            updatePlayerData.playerNumber = parseInt(playerNumber);
        };

        if (!_.isEmpty(salary)) {
            updatePlayerData.salary = parseInt(salary);
        };

        const updatePlayerResp: IPlayer | AxiosError = await playersService.update(updatePlayerData, authToken as string);

        // If there is a server error, let the user know something went wrong with their request.
        if (updatePlayerResp instanceof AxiosError) {
            setToastData(configureToast(ComponentColor.DANGER, 'Error', 'Something went wrong with processing your request.'));
            setIsToastOpen(true);
            setIsLoading(false);
            return;
        }

        // Add player to state
        dispatch({
            type: 'UPDATE_PLAYER',
            player: player
        });

        setIsLoading(false);
    };

    return (
        <tr key={player._id}>
            <th scope='row'>
                <TableInputText 
                    id={`${player._id}-lastNameInput`}
                    value={lastName}
                    onChange={handleLastNameChange}
                    valid={validateName(lastName)}
                    invalid={!validateName(lastName)}
                    isEditMode={isEditMode}
                    tooltipText='Last name must only contain letters and be of a length between 3 and 20 characters.'
                />
            </th>
            <td>
                <TableInputText 
                    id={`${player._id}-firstNameInput`}
                    value={firstName}
                    onChange={handleFirstNameChange}
                    valid={validateName(firstName)}
                    invalid={!validateName(firstName)}
                    isEditMode={isEditMode}
                    tooltipText='First name must only contain letters and be of a length between 3 and 20 characters.'
                />
            </td>
            <td>
               <TableDropdownInput
                    cellText={teamName}
                    entity={EntityTypes.TEAM}
                    id={`${player._id}-teamDropdown`}
                    isEditMode={isEditMode}
                    onChange={handleTeamSelect}
                    options={teams}
                    value={team}
               />
            </td>
            <td>
                <TableInputText 
                    id={`${player._id}-positionInput`}
                    value={position}
                    onChange={handlePositionChange}
                    valid={validatePosition(position) || _.isEmpty(position)}
                    invalid={!validatePosition(position) && !_.isEmpty(position)}
                    isEditMode={isEditMode}
                    tooltipText='Position may only contain letters, numbers and spaces and must be between 1 and 20 characters.'
                />
            </td>
            <td>
                <TableInputText 
                    id={`${player._id}-playerNumberInput`}
                    value={playerNumber}
                    onChange={handlePlayerNumberChange}
                    valid={validatePlayerNumber(playerNumber) || _.isEmpty(playerNumber)}
                    invalid={!validatePlayerNumber(playerNumber) && !_.isEmpty(playerNumber)}
                    isEditMode={isEditMode}
                    tooltipText='Player number may only contain numerical digits and be between 0 and 100.'
                />
            </td>
            <td>
                <TableInputText 
                    id={`${player._id}-playerSalaryInput`}
                    value={salary}
                    onChange={handleSalaryChange}
                    valid={validateSalary(salary) || _.isEmpty(salary)}
                    invalid={!validateSalary(salary) && !_.isEmpty(salary)}
                    isEditMode={isEditMode}
                    tooltipText='Salary must be a numerical whole number above 0.'
                    isSalary
                />
            </td>

            {isAuthenticated &&
                <AddFormOptions
                    saveFn={handleSavePlayer}
                    deleteFn={handleDeletePlayer}
                    toggleEdit={toggleIsEditMode}
                    saveDisabled={!isValid}
                    isLoading={isLoading}
                    isEditMode={isEditMode}
                />
            }
        </tr>
    )
};

export default PlayersTableRow;
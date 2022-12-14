import React, { ChangeEvent, FormEvent, ReactElement, useContext, useEffect, useState } from 'react';
import * as _ from 'lodash';
import { AxiosError } from 'axios';

// Hooks
import { useAuthentication } from '../../../hooks/useAuthentication';
import { EntityContext } from '../../../providers/EntityProvider';
import { UserContext } from '../../../providers/UserProvider';

// Interfaces
import ISport from '../../../common/interfaces/ISport';
import ITeam from '../../../common/interfaces/ITeam';
import IPlayer from '../../../common/interfaces/IPlayer';

// Custom Components
import AddFormOptions from '../AddFormComponents/AddFormOptions';
import TableInputText from '../../Forms/TableInputText';
import TableDropdownInput from '../../Forms/TableDropdownInput';

// Utils
import { validateName } from '../../../common/utils/validationUtil';
import { ComponentColor, CurrentViewOptions, EntityTypes } from '../../../common/constants/constants';
import { configureToast } from '../../../common/utils/toastUtil';

// Services
import teamsService from '../../../services/teamsService';
import IManager from '../../../common/interfaces/IManager';
import playersService from '../../../services/playersService';

interface ITeamsTableRowProps {
    currentViewHandler: Function;
    team: ITeam;
    setIsToastOpen: Function;
    setToastData: Function;
}

function TeamsTableRow({ team, setIsToastOpen, setToastData, currentViewHandler }: ITeamsTableRowProps): ReactElement {
    // Check authentication
    const isAuthenticated: boolean = useAuthentication();

    // global state for teams
    const { players, sports, managers, dispatch } = useContext(EntityContext);
    const { authToken } = useContext(UserContext)

    // State for Team variables
    const [teamName, setTeamName] = useState<string>(team.teamName);
    const [sport, setSport] = useState<string>(_.isNil(team.sport) ? '' : team.sport);
    const [sportName, setSportName] = useState<string>('');
    const [manager, setManager] = useState<string>(_.isNil(team.manager) ? '' : team.manager);
    const [managerName, setManagerName] = useState<string>('');
    const [numPlayers, setNumPlayers] = useState<number>(0);

    // Sets edit state
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    // Form state
    const [isLoading, setIsLoading] = useState(false);


    // Sets the number of players, the sport and the manager name when a team is passed into a table row
    useEffect(() => {
        /**
         * Helper function to get the number of players by team
         */
        const getNumPlayers = (): void => {
            const numberPlayersInTeam: Array<IPlayer> = _.filter(players, (player) => player.team === team._id);
            setNumPlayers(_.size(numberPlayersInTeam));
        }
        getNumPlayers();

        if (!_.isEmpty(sport)) {
            const foundSport: ISport | undefined = _.find(sports, (sportOpt) => sportOpt._id as string === sport);
            !_.isNil(foundSport) && setSportName(foundSport.sportName);
        };

        if (!_.isEmpty(manager)) {
            const foundManager: IManager | undefined = _.find(managers, (managerOpt) => managerOpt._id as string === manager);
            !_.isNil(foundManager) && setManagerName(`${foundManager.firstName} ${foundManager.lastName}`);
        };
        
    }, [team, manager, managers, sport, sports, players]);

    /**
     * Helper function for toggling edit mode.
     */
    const toggleIsEditMode = () => {
        setTeamName(team.teamName);
        setIsEditMode(!isEditMode);
    };

    // Handlers for UI actions
    /**
     * Handler for changing the name of the team
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
        setSport(e.currentTarget.value);
    };

    /**
     * Handler for changing the manager of a team
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
    */
    const handleManagerSelect = (e: ChangeEvent<HTMLInputElement>): void => {
        setManager(e.currentTarget.value);
    };

    /**
     * Unsets the team from each player that has the team.
     */
    const unsetTeamsFromPlayers = async (): Promise<void> => {
        const foundPlayers: Array<IPlayer> = _.filter(players, (player) => player.team === team._id);

        // Need to iterate through players as part of the team, and remove the team
        _.forEach(foundPlayers, async (player) => {
            player.team = undefined;

            const updatePlayerResp: IPlayer | AxiosError = await playersService.update(player, authToken as string);

            // If there is a server error, let the user know something went wrong with their request.
            if (updatePlayerResp instanceof AxiosError) {
                setToastData(configureToast(ComponentColor.DANGER, 'Error', 'Something went wrong with processing your request.'));
                setIsToastOpen(true);
                return;
            }

            // Add player to state
            dispatch({
                type: 'UPDATE_PLAYER',
                player: updatePlayerResp
            });
        });
    };

    // Service handlers

    /**
     * Handler to delete a team
     */
    const handleDeleteTeam = async (): Promise<void> => {
        setIsLoading(true);
        setIsEditMode(false);

        const deleteResp = await teamsService.delete(team._id as string, authToken as string);

        // If there is a server error, let the user know something went wrong with their request.
        if (deleteResp instanceof AxiosError) {
            setToastData(configureToast(ComponentColor.DANGER, 'Error', 'Something went wrong with processing your request.'));
            setIsToastOpen(true);
            setIsLoading(false);
            return;
        };

        // Add manager to state
        dispatch({
            type: 'DELETE_TEAM',
            team: team
        });

        // Remove teams from players
        await unsetTeamsFromPlayers()

        setIsLoading(false);
    }

    /**
     * Handler to save a team
     */
    const handleSaveTeam = async (): Promise<void> => {
        setIsLoading(true);
        setIsEditMode(false);

        const updateTeamData: ITeam = {
            _id: team._id,
            teamName: teamName
        };

        // If sport or manage is not empty, set them on the new team object
        if (!_.isEmpty(sport)) {
            updateTeamData.sport = sport;
        };

        if (!_.isEmpty(manager)) {
            updateTeamData.manager = manager;
        };

        const updateTeam: ITeam | AxiosError = await teamsService.update(updateTeamData, authToken as string);

        // If there is a server error, let the user know something went wrong with their request.
        if (updateTeam instanceof AxiosError) {
            setToastData(configureToast(ComponentColor.DANGER, 'Error', 'Something went wrong with processing your request.'));
            setIsToastOpen(true);
            setIsLoading(false);
            return;
        }

        // Add manager to state
        dispatch({
            type: 'UPDATE_TEAM',
            team: updateTeam
        });

        setIsLoading(false);
    };

    return (
        <tr key={team._id}>
            <th scope='row'>
                <TableInputText
                    id={team._id as string}
                    invalid={!validateName(teamName)}
                    isEditMode={isEditMode}
                    onChange={handleTeamNameChange}
                    tooltipId={`${team._id}-teamNameInput`}
                    tooltipText='Team name must be only letters with a length between 2 and 20 characters.'
                    value={teamName}
                    valid={validateName(teamName)}
                    currentViewHandler={currentViewHandler}
                    linkView={CurrentViewOptions.PLAYER}
                />
            </th>
            <td>
                <TableDropdownInput
                    cellText={sportName}
                    entity={EntityTypes.SPORT}
                    isEditMode={isEditMode}
                    id={`${team._id}-sportSelect`}
                    currentViewHandler={currentViewHandler}
                    linkView={CurrentViewOptions.TEAM}
                    onChange={handleSportSelect}
                    options={sports}
                    value={sport}
                />
            </td>
            <td>
                <TableDropdownInput
                    cellText={managerName}
                    entity={EntityTypes.MANAGER}
                    id={`${team._id}-managerSelect`}
                    isEditMode={isEditMode}
                    onChange={handleManagerSelect}
                    options={managers}
                    value={manager}
                />
            </td>
            <td>
                {numPlayers}
            </td>
            {isAuthenticated &&
                <AddFormOptions
                    saveFn={handleSaveTeam}
                    deleteFn={handleDeleteTeam}
                    toggleEdit={toggleIsEditMode}
                    saveDisabled={!validateName(teamName)}
                    isLoading={isLoading}
                    isEditMode={isEditMode}
                />
            }
        </tr>
    )
};

export default TeamsTableRow;
import React, { FormEvent, ReactElement, useContext, useEffect, useState } from 'react';
import * as _ from 'lodash';
import { AxiosError } from 'axios';

// Hooks
import { useAuthentication } from '../../../hooks/useAuthentication';
import { EntityContext } from '../../../providers/EntityProvider';
import { UserContext } from '../../../providers/UserProvider';

// Interfaces
import ISport from '../../../common/interfaces/ISport';
import ITeam from '../../../common/interfaces/ITeam';

// Custom Components
import AddFormOptions from '../AddFormComponents/AddFormOptions';

// Utils
import { validateName } from '../../../common/utils/validationUtil';
import { ComponentColor, CurrentViewOptions } from '../../../common/constants/constants';
import { configureToast } from '../../../common/utils/toastUtil';

// Services
import sportsService from '../../../services/sportsService';
import TableInputText from '../../Forms/TableInputText';


interface ISportsTableRow {
    currentViewHandler: Function;
    sport: ISport;
    setIsToastOpen: Function;
    setToastData: Function;
}

function SportsTableRow({ currentViewHandler, sport, setIsToastOpen, setToastData }: ISportsTableRow): ReactElement {
    // Check authentication
    const isAuthenticated: boolean = useAuthentication();

    // global state for teams
    const { teams, dispatch } = useContext(EntityContext);
    const { authToken } = useContext(UserContext)

    // State for Team variables
    const [sportName, setSportName] = useState<string>(sport.sportName);
    const [numTeams, setNumTeams] = useState<number>(0);

    // Sets edit state
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    // Form state
    const [isLoading, setIsLoading] = useState(false);

    // Sets the number of teams when a sport is passed into a table row
    useEffect(() => {
        /**
         * Helper function to get the number of teams by sport
         */
        const getNumTeams = (): void => {
            const numTeamsInSport: Array<ITeam> = _.filter(teams, (team) => team.sport === sport._id);
            setNumTeams(_.size(numTeamsInSport));
        }

        getNumTeams();
    }, [sport, teams]);

    const toggleIsEditMode = () => {
        setSportName(sport.sportName);
        setIsEditMode(!isEditMode);
    };

    // Handlers for UI actions
    /**
     * Handler for changing the name of the sport
     * @param {FormEvent<HTMLInputElement>} e Changes to the input field.
     */
    const handleSportNameChange = (e: FormEvent<HTMLInputElement>): void => {
        setSportName(e.currentTarget.value);
    }

    // Service handlers

    /**
     * Handler to delete a team
     */
    const handleDeleteSport = async (): Promise<void> => {
        setIsLoading(true);
        setIsEditMode(false);

        const deleteResp = await sportsService.delete(sport._id as string, authToken as string);

        // If there is a server error, let the user know something went wrong with their request.
        if (deleteResp instanceof AxiosError) {
            setToastData(configureToast(ComponentColor.DANGER, 'Error', 'Something went wrong with processing your request.'));
            setIsToastOpen(true);
            setIsLoading(false);
            return;
        }

        // Add manager to state
        dispatch({
            type: 'DELETE_SPORT',
            sport: sport
        });

        setIsLoading(false);
    }

    /**
     * Handler to save a team
     */
    const handleSaveSport = async (): Promise<void> => {
        setIsLoading(true);
        setIsEditMode(false);

        const updateSportData: ISport = {
            _id: sport._id,
            sportName: sportName
        };

        const updateSport: ISport | AxiosError = await sportsService.update(updateSportData, authToken as string);

        // If there is a server error, let the user know something went wrong with their request.
        if (updateSport instanceof AxiosError) {
            setToastData(configureToast(ComponentColor.DANGER, 'Error', 'Something went wrong with processing your request.'));
            setIsToastOpen(true);
            setIsLoading(false);
            return;
        }

        // Add manager to state
        dispatch({
            type: 'UPDATE_SPORT',
            sport: updateSport
        });

        setIsLoading(false);
    };

    return (
        <tr key={sport._id}>
            <th scope='row'>
                <TableInputText
                    currentViewHandler={currentViewHandler}
                    id={sport._id as string}
                    invalid={!validateName(sportName)}
                    isEditMode={isEditMode}
                    linkView={CurrentViewOptions.TEAM}
                    onChange={handleSportNameChange}
                    tooltipId={`${sport._id}-sportNameInput`}
                    tooltipText='Sport name must be only letters with a length between 2 and 20 characters.'
                    value={sportName}
                    valid={validateName(sportName)}
                />
            </th>
            <td>
                {numTeams}
            </td>
            {isAuthenticated &&
                <AddFormOptions
                    saveFn={handleSaveSport}
                    deleteFn={handleDeleteSport}
                    toggleEdit={toggleIsEditMode}
                    saveDisabled={!validateName(sportName)}
                    isLoading={isLoading}
                    isEditMode={isEditMode}
                />
            }
        </tr>
    )
};

export default SportsTableRow;
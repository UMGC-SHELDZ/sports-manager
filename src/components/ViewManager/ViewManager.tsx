import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { Row, Spinner } from 'reactstrap';

// Custom Components
import PlayersTable from '../DataTables/PlayersTable/PlayersTable';
import SportsTable from '../DataTables/SportsTable/SportsTable';
import TeamsTable from '../DataTables/TeamsTable/TeamsTable';
import LoginForm from '../Forms/LoginForm/LoginForm';
import RegistrationForm from '../Forms/RegistrationForm/RegistrationForm';
import HeaderBar from '../HeaderBar/HeaderBar';
import MainNavbar from '../MainNavbar/MainNavbar';

// Interfaces
import IManager from '../../common/interfaces/IManager';
import IPlayer from '../../common/interfaces/IPlayer';
import ISport from '../../common/interfaces/ISport';
import ITeam from '../../common/interfaces/ITeam';

// Utils
import { CurrentViewOptions } from '../../common/constants/constants';

// Services
import managersService from '../../services/managersService';
import playersService from '../../services/playersService';
import sportsService from '../../services/sportsService';
import teamsService from '../../services/teamsService';

// State
import { EntityContext } from '../../providers/EntityProvider';
import _ from 'lodash';

function ViewManager(): ReactElement {
    // Global State
    const { sports, teams, players, managers, isAppLoading } = useContext(EntityContext);

      // To update global state for initial data load
    const { dispatch } = useContext(EntityContext);

    // data state
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);

    // View State
    const [currentView, setCurrentView] = useState<CurrentViewOptions>(CurrentViewOptions.SPORT);
    const [selectedSport, setSelectedSport] = useState<string | undefined>(undefined);
    const [selectedSportName, setSelectedSportName] = useState<string | undefined>(undefined);
    const [fitleredTeamsBySport, setFilteredTeamsBySport] = useState<Array<ITeam> | undefined>(undefined);
    const [selectedTeam, setSelectedTeam] = useState<string | undefined>(undefined);
    const [selectedTeamName, setSelectedTeamName] = useState<string | undefined>(undefined);
    const [selectedTeamManagerName, setSelectedTeamManagerName] = useState<string | undefined>(undefined);
    const [filteredPlayersByteam, setFilteredPlayersByTeam] = useState<Array<IPlayer> | undefined>(undefined);

    // Updates initial state for data, and sets loaded to true so data will not be loaded again
    useEffect(() => {
        // If data loaded, do not load it again
        if (dataLoaded) {
            return;
        }
        (async () => {
            const sports: Array<ISport> = await sportsService.getSports();
            const teams: Array<ITeam> = await teamsService.getTeams();
            const players: Array<IPlayer> = await playersService.getPlayers();
            const managers: Array<IManager> = await managersService.getManagers();

            // Update state with database variables
            dispatch({
                type: 'SET_INITIAL_DATA',
                sports,
                teams,
                players,
                managers
            });

            // Set data loaded to true
            setDataLoaded(true);
        })();
    });

    // Update selected sport name, when a sport is selected.
    useEffect(() => {
        if (!_.isNil(selectedSport)) {
            const foundSport: ISport | undefined = _.find(sports, (sportOpt) => sportOpt._id as string === selectedSport);
            if (!_.isNil(foundSport)) {
                setSelectedSportName(foundSport.sportName)

                // Create an array of teams filtered by sport
                const filterTeams: Array<ITeam> = _.filter(teams, (team) => team.sport === foundSport._id);
                setFilteredTeamsBySport(filterTeams);
                return;
            }
        };
        setSelectedSportName(undefined);
        setFilteredTeamsBySport(undefined);
    }, [selectedSport, teams, sports]);

    // Update a team name/manager name if a team is selected
    useEffect(() => {
        if (!_.isNil(selectedTeam)) {
            const foundTeam: ITeam | undefined = _.find(teams, (teamOpt) => teamOpt._id as string === selectedTeam);

            // If team found, set the team then try to find the manager, if manager found try to set the manger, else set both to undefined.
            if (!_.isNil(foundTeam)) {
                setSelectedTeamName(foundTeam.teamName);

                // Create an array of players filtered by team
                const filterPlayers: Array<IPlayer> = _.filter(players, (player) => player.team === foundTeam._id);
                setFilteredPlayersByTeam(filterPlayers);

                if (!_.isNil(foundTeam.manager) && !_.isEmpty(foundTeam.manager)) {
                    const foundManager: IManager | undefined = _.find(managers, (managerOpt) => managerOpt._id as string === foundTeam.manager)

                    !_.isNil(foundManager) ? setSelectedTeamManagerName(`${foundManager?.firstName} ${foundManager?.lastName}`) : setSelectedTeamManagerName(undefined);
                    return;
                };
                return;
            }
        };
        setSelectedTeamName(undefined);
        setSelectedTeamManagerName(undefined);
        setFilteredPlayersByTeam(undefined);
    }, [selectedTeam, players, managers, teams])

    /**
     * Handler for dynamic view setting.
     * @param {CurrentViewOptions} newView sets the new view.
     * @param {string} id the id for team or sport.
     */
    const handleSetCurrentView = (newView: CurrentViewOptions, id?: string): void => {
        setCurrentView(newView);

        // If id param, set the sport or team
        if (!_.isNil(id)) {
            newView === CurrentViewOptions.TEAM && setSelectedSport(id);
            newView === CurrentViewOptions.PLAYER && setSelectedTeam(id);
            return;
        }

        // Clear sport/manager if no id provided
        setSelectedSport(undefined);
        setSelectedTeam(undefined);
    };

    return (
        <>
            <MainNavbar setCurrentView={handleSetCurrentView} />
            <HeaderBar
                curViewOption={currentView}
                sportName={_.isNil(selectedSportName) ? 'No Sport Selected' : selectedSportName}
                managerName={_.isNil(selectedTeamManagerName) ? 'No Current Manager' : selectedTeamManagerName}
                teamName={_.isNil(selectedTeamName) ? 'No Team Selected' : selectedTeamName}
            />
            {isAppLoading &&
                <Spinner className='mt-5'>
                    Loading data...
                </Spinner>
            }
            {!isAppLoading &&
                <>
                    {currentView === CurrentViewOptions.SPORT &&
                        <SportsTable sports={sports} currentViewHandler={handleSetCurrentView} />
                    }
                    {currentView === CurrentViewOptions.TEAM &&
                        <TeamsTable teams={_.isNil(fitleredTeamsBySport) ? teams : fitleredTeamsBySport} currentViewHandler={handleSetCurrentView} />
                    }
                    {currentView === CurrentViewOptions.PLAYER &&
                        <PlayersTable players={_.isNil(filteredPlayersByteam) ? players : filteredPlayersByteam} currentViewHandler={handleSetCurrentView} />
                    }
                    {currentView === CurrentViewOptions.LOGIN &&
                        <LoginForm setCurrentView={setCurrentView} />
                    }
                    {currentView === CurrentViewOptions.REGISTRATION &&
                        <RegistrationForm setCurrentView={setCurrentView} />
                    }
                    {currentView === CurrentViewOptions.LOGIN_SUCCESS && 
                        <Row>
                            <h2>Successfully Logged In!</h2>
                        </Row>
                    }
                </>
            }
            
        </>
    )
};

export default ViewManager;
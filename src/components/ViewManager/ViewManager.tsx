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

function ViewManager(): ReactElement {
    // Global State
    const { sports, teams, players, isAppLoading } = useContext(EntityContext);

      // To update global state for initial data load
    const { dispatch } = useContext(EntityContext);

    // data state
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);

    // View State
    const [currentView, setCurrentView] = useState<CurrentViewOptions>(CurrentViewOptions.SPORT);

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
    }, []);

    return (
        <>
            <MainNavbar setCurrentView={setCurrentView} />
            <HeaderBar curViewOption={currentView} sportName={'Football'} managerName={'Manager Name'} teamName={'Football Team Name'} />
            {isAppLoading &&
                <Spinner className='mt-5'>
                    Loading data...
                </Spinner>
            }
            {!isAppLoading &&
                <>
                    {currentView === CurrentViewOptions.SPORT &&
                        <SportsTable sports={sports} />
                    }
                    {currentView === CurrentViewOptions.TEAM &&
                        <TeamsTable teams={teams} />
                    }
                    {currentView === CurrentViewOptions.PLAYER &&
                        <PlayersTable players={players} />
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
import React, { useState } from 'react';
import { Row } from 'reactstrap';

// Constants 
import { CurrentViewOptions } from '../common/constants/constants';

// Interfaces
import ITeam from '../common/interfaces/ITeam';
import IPlayer from '../common/interfaces/IPlayer';

// Custom components
import HeaderBar from './HeaderBar/HeaderBar';
import JumbotronHeader from './JumbotronHeader/JumbotronHeader';
import MainNavbar from './MainNavbar/MainNavbar';
import SportsTable from './DataTables/SportTable/SportTable';
import TeamTable from './DataTables/TeamTable/TeamTable';
import LoginForm from './LoginForm/LoginForm';
import RegistrationForm from './RegistrationForm/RegistrationForm';

const mockFootballTeamsData: Array<ITeam> = [
  {
    teamName: 'Sports Team 1',
    managerName: 'Manager 1',
    numPlayers: 55,
    id: '1'
  },
  {
    teamName: 'Sports Team 2',
    managerName: 'Manager 2',
    numPlayers: 55,
    id: '2'
  },
  {
    teamName: 'Sports Team 3',
    managerName: 'Manager 3',
    numPlayers: 54,
    id: '3'
  }
]

const mockTeamsPlayersData: Array<IPlayer> = [
  {
    firstName: 'Player',
    lastName: 'One',
    id: '1'
  },
  {
    firstName: 'Player',
    lastName: 'Two',
    position: 'Position 1',
    playerNumber: 1,
    salary: 100000,
    id: '2'
  },
  {
    firstName: 'Player',
    lastName: 'Three',
    playerNumber: 2,
    id: '3'
  }
]

function App() {
  const [currentView, setCurrentView] = useState<CurrentViewOptions>(CurrentViewOptions.SPORT);

  return (
    <div className="App">
      <JumbotronHeader />
      <MainNavbar setCurrentView={setCurrentView} />
      <HeaderBar curViewOption={currentView} sportName={'Football'} managerName={'Manager Name'} teamName={'Football Team Name'} />
      {currentView === CurrentViewOptions.SPORT &&
        <SportsTable teams={mockFootballTeamsData} />
      }
      {currentView === CurrentViewOptions.TEAM &&
        <TeamTable players={mockTeamsPlayersData} />
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
      {currentView === CurrentViewOptions.REGISTRATION_SUCCESS && 
          <Row>
            <h2>Successfully Registered!</h2>
          </Row>
      }
    </div>
  );
}

export default App;

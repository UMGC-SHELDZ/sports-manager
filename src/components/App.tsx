import React from 'react';

// Constants 
import { CurrentViewOptions } from '../common/constants/constants';

// Interfaces
import ITeam from '../common/interaces/ITeam';

// Custom components
import HeaderBar from './HeaderBar/HeaderBar';
import JumbotronHeader from './JumbotronHeader/JumbotronHeader';
import MainNavbar from './MainNavbar/MainNavbar';
import SportsTable from './DataTables/SportsTable/SportsTable';

const mockFootballTeamsData: Array<ITeam> = [
  {
    teamName: 'Sports Team 1',
    managerName: 'Manager 1',
    numPlayers: 55
  },
  {
    teamName: 'Sports Team 2',
    managerName: 'Manager 2',
    numPlayers: 55
  },
  {
    teamName: 'Sports Team 3',
    managerName: 'Manager 3',
    numPlayers: 54
  }
]

function App() {
  return (
    <div className="App">
      <JumbotronHeader />
      <MainNavbar />
      <HeaderBar curViewOption={CurrentViewOptions.SPORT} sportName={'Football'} />
      <SportsTable teams={mockFootballTeamsData} />
    </div>
  );
}

export default App;

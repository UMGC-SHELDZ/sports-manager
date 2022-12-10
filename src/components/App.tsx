import React, { useContext, useEffect, useState } from 'react';
import { Row } from 'reactstrap';

// Constants 
import { CurrentViewOptions } from '../common/constants/constants';

// Custom components
import HeaderBar from './HeaderBar/HeaderBar';
import MainNavbar from './MainNavbar/MainNavbar';

// Global State
import { UserProvider } from '../providers/UserProvider';
import ViewManager from './ViewManager/ViewManager';
import { EntityContext, EntityProvider } from '../providers/EntityProvider';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <EntityProvider>
          <ViewManager />
        </EntityProvider>
      </UserProvider>
    </div>
  );
}

export default App;

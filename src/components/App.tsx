import React from 'react';
import { CurrentViewOptions } from '../common/constants/constants';

// Custom components
import HeaderBar from './HeaderBar/HeaderBar';
import HelloWorld from './HelloWorld/HelloWorld';
import JumbotronHeader from './JumbotronHeader/JumbotronHeader';
import NavBar from './NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <JumbotronHeader />
      <NavBar />
      <HeaderBar curViewOption={CurrentViewOptions.SPORT} sportName={'Football'} />
      <header className="App-header">
        <HelloWorld greetingText='HELLO WORLD' />
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import { CurrentViewOptions } from '../common/constants/constants';

// Custom components
import BreadcrumbBar from './BreadcrumbBar/BreadcrumbBar';
import HelloWorld from './HelloWorld/HelloWorld';
import JumbotronHeader from './JumbotronHeader/JumbotronHeader';
import NavBar from './NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <JumbotronHeader />
      <NavBar />
      <BreadcrumbBar curViewOption={CurrentViewOptions.SPORT} sportName={'Football'} />
      <header className="App-header">
        <HelloWorld greetingText='HELLO WORLD' />
      </header>
    </div>
  );
}

export default App;

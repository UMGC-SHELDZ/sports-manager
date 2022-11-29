import React from 'react';
import HelloWorld from './HelloWorld/HelloWorld';
import JumbotronHeader from './JumbotronHeader/JumbotronHeader';
import Navigation from './navbar.js';

function App() {
  return (
    <div className="App">
      <JumbotronHeader />
      <Navigation />
      <header className="App-header">
        <HelloWorld greetingText='HELLO WORLD' />
      </header>
    </div>
  );
}

export default App;

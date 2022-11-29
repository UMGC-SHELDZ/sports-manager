import React from 'react';
import HelloWorld from './HelloWorld/HelloWorld';
import JumbotronHeader from './JumbotronHeader/JumbotronHeader';
import NavBar from './NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <JumbotronHeader />
      <NavBar />
      <header className="App-header">
        <HelloWorld greetingText='HELLO WORLD' />
      </header>
    </div>
  );
}

export default App;

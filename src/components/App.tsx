import React from 'react';
import './App.css';
import HelloWorld from './HelloWorld/HelloWorld';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HelloWorld greetingText='HELLO WORLD' />
      </header>
    </div>
  );
}

export default App;

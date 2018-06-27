import * as React from 'react';
import './App.css';
import Tracker from './components/tracker/Tracker';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Receipt Tracker</h1>
        </header>
          <Tracker/>
      </div>
    );
  }
}

export default App;

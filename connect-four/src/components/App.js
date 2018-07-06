import React, { Component } from 'react';
import GameTracker from './GameTracker';
import GameGrid from './GameGrid';

class App extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div className="App">
        <h2>Poshmark Connect Four Game</h2>
        <GameTracker />
        <GameGrid />
      </div>
    );
  }
}

export default App;

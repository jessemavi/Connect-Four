import React, { Component } from 'react';
import GameTracker from './GameTracker';
import GameGrid from './GameGrid';
import { Modal, Button, Header, Icon } from 'semantic-ui-react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      player1Color: '',
      player2Color: '',
      currentPlayer: '',
      modalOpen: false
    };
  }

  updateCurrentPlayer = (currentPlayer) => {
    this.setState({
      currentPlayer: currentPlayer
    });
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = (player1Color, player2Color) => {
    console.log(player1Color, player2Color);
    this.setState({
      modalOpen: false,
      player1Color: player1Color,
      player2Color: player2Color,
      currentPlayer: 'player1'
    });
  }

  render() {
    return (
      <div className="App">
        <h2>Connect Four</h2>
        <Modal 
          trigger={<Button onClick={this.handleOpen}>Start Game</Button>} 
          size='small'
          open={this.state.modalOpen}
        >
          <Modal.Content>
            <Modal.Description>
              <Header>Select a color</Header>
              <p>Player 1, select a color. Player 2 will be the other color.</p>
              <Modal.Actions>
                <Icon name='circle' color='red' size='huge' onClick={this.handleClose.bind(this, 'red', 'blue')} />
                <Icon name='circle' color='blue' size='huge' onClick={this.handleClose.bind(this, 'blue', 'red')} />
              </Modal.Actions>
            </Modal.Description>
          </Modal.Content>
        </Modal>

        <GameTracker currentPlayer={this.state.currentPlayer} player1Color={this.state.player1Color} player2Color={this.state.player2Color} />
        <GameGrid updateCurrentPlayer={this.updateCurrentPlayer} currentPlayer={this.state.currentPlayer} player1Color={this.state.player1Color} player2Color={this.state.player2Color} />
      </div>
    );
  }
}

export default App;

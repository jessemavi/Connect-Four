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
      gameWinner: '',
      numberOfPlays: 0,
      modalOpen: false
    };
  }

  incrementNumberOfPlays = () => this.setState({ numberOfPlays: this.state.numberOfPlays + 1 })

  updateCurrentPlayer = (currentPlayer) => this.setState({ currentPlayer: currentPlayer })

  setWinner = (winner) => this.setState({ gameWinner: winner })

  resetGame = async () => {
    await this.setState({
      gameWinner: 'reset'
    });

    this.setState({
      gameWinner: '',
      numberOfPlays: 0
    });
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = (player1Color, player2Color) => {
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
        <h1>Connect Four</h1>
        <Modal 
          trigger={<Button size='small' color='green' disabled={this.state.currentPlayer !== ''} onClick={this.handleOpen}>Start Game</Button>} 
          size='small'
          open={this.state.modalOpen}
        >
          <Modal.Content>
            <Modal.Description>
              <Header>Select a color</Header>
              <p>Player 1, select a color. Player 2 will be the other color.</p>
              <Icon name='circle' color='red' size='huge' onClick={this.handleClose.bind(this, 'red', 'blue')} />
              <Icon name='circle' color='blue' size='huge' onClick={this.handleClose.bind(this, 'blue', 'red')} />
            </Modal.Description>
          </Modal.Content>
        </Modal>

        <GameTracker 
          currentPlayer={this.state.currentPlayer} 
          player1Color={this.state.player1Color} 
          player2Color={this.state.player2Color} 
          gameWinner={this.state.gameWinner}
          numberOfPlays={this.state.numberOfPlays}
          resetGame={this.resetGame} 
        />
        <GameGrid 
          updateCurrentPlayer={this.updateCurrentPlayer} 
          incrementNumberOfPlays={this.incrementNumberOfPlays}
          setWinner={this.setWinner} 
          currentPlayer={this.state.currentPlayer} 
          player1Color={this.state.player1Color} 
          player2Color={this.state.player2Color} 
          gameWinner={this.state.gameWinner} 
        />
      </div>
    );
  }
}

export default App;

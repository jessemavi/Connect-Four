import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'semantic-ui-react';
import './GameTracker.css';

const GameTracker = (props) => {
  return (
    <div className='game-tracker'>
      {
        props.numberOfPlays === 42 ?
        <div>
          <h3>No winner</h3>
          <p>&nbsp;</p>
          <Button size='tiny' color='green' onClick={props.resetGame}>Play again</Button>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </div>
        : props.gameWinner === 'player1' ?
          <div>
            <h3>Player One wins</h3>
            <Icon name='circle' color={props.player1Color} size='big' />
            <Button size='tiny' color='green' onClick={props.resetGame}>Play again</Button>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </div>
        : props.gameWinner === 'player2' ?
          <div>
            <h3>Player Two wins</h3>
            <Icon name='circle' color={props.player2Color} size='big' />
            <Button size='tiny' color='green' onClick={props.resetGame}>Play again</Button>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </div>
        : props.currentPlayer === 'player1' ?
          <div>
            <h3>Player One's turn</h3>
            <Icon name='circle' color={props.player1Color} size='big' />
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </div>
        : props.currentPlayer === 'player2' ?
          <div>
            <h3>Player Two's turn</h3>
            <Icon name='circle' color={props.player2Color} size='big' />
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </div>
        :
          <div>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </div>
      }
    </div>
  );
};

GameTracker.propTypes = {
  currentPlayer: PropTypes.string.isRequired,
  player1Color: PropTypes.string.isRequired,
  player2Color: PropTypes.string.isRequired,
  gameWinner: PropTypes.string.isRequired,
  numberOfPlays: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired
};

export default GameTracker;

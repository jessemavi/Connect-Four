import React from 'react';
import { Icon, Button } from 'semantic-ui-react';
import './GameTracker.css';

const GameTracker = (props) => {
  return (
    <div className='game-tracker'>
      {
        props.gameWinner === 'player1' ?
          <div>
            <h3>Player One wins</h3>
            <Icon name='circle' color={props.player1Color} size='big' />
            <Button size='tiny' onClick={props.resetGame}>Play again</Button>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </div>
        : props.gameWinner === 'player2' ?
          <div>
            <h3>Player Two wins</h3>
            <Icon name='circle' color={props.player2Color} size='big' />
            <Button size='tiny' onClick={props.resetGame}>Play again</Button>
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

export default GameTracker;

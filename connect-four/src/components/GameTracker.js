import React from 'react';
import { Icon } from 'semantic-ui-react';

const GameTracker = (props) => {
  return (
    <div>
      {
        props.currentPlayer === 'player1' ?
          <div>
            <p>Player One's turn</p>
            <Icon name='circle' color={props.player1Color} size='large' />
          </div>
        : props.currentPlayer === 'player2' ?
          <div>
            <p>Player Two's turn</p>
            <Icon name='circle' color={props.player2Color} size='large' />
          </div>
        :
          <p></p>
      }
    </div>
  );
};

export default GameTracker;

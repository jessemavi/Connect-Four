import React, { Component } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import _ from 'lodash';

class GameGrid extends Component {
  constructor(props) {
    super();
    this.state = {
      player1Color: 'blue',
      player2Color: 'green',
      currentPlayer: 'player1', 
      grid: [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
      ]
    };
  }

  dropDisc = (row, column) => {
    // console.log(row, column);

    // go through the column in the grid
    const { grid } = this.state;

    let i;

    for(i = grid.length - 1; i >= 0; i--) {
      if(grid[i][column] === 0) {
        if(this.state.currentPlayer === 'player1') {
          grid[i][column] = this.state.player1Color;
          this.setState({
            grid: grid,
            currentPlayer: 'player2'
          });
        } else if(this.state.currentPlayer === 'player2') {
          grid[i][column] = this.state.player2Color;
          this.setState({
            grid: grid,
            currentPlayer: 'player1'
          });
        }
        break;
      }
    }

    console.log('row', i, 'column', column);

    // check for four in a row

  }

  render() {

    const rowsAndColumns = _.times(6, i => (
      <Grid.Row key={i}>
        {_.times(7, j => (
          <Grid.Column key={j}>
            {this.state.grid[i][j] !== 0 ?
              <Icon name='circle' size='big' color={this.state.grid[i][j]} onClick={this.dropDisc.bind(this, i, j)} />
            :
              <Icon name='circle outline' size='big' onClick={this.dropDisc.bind(this, i, j)} />
            }
          </Grid.Column>
        ))}
      </Grid.Row>
    ));

    return (
      <div>
        <h3>Grid component</h3>
        <Grid columns={16} centered >
          {rowsAndColumns}
        </Grid>
      </div>
    );
  }
}

export default GameGrid;

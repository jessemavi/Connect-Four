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

    // console.log('row', i, 'column', column);

    // check for four in a row
    this.checkVertically(column);
    if(i >= 0) {
      this.checkHorizontally(i);
    }
    this.checkDiagonallyRight(i, column);
    this.checkDiagonallyLeft(i, column);
  }

  checkVertically = (column) => {
    let count = 0;
    let currentColor;

    for(let i = 0; i < this.state.grid.length; i++) {
      if(this.state.grid[i][column] !== 0) {
        if(currentColor === undefined) {
          currentColor = this.state.grid[i][column];
          count++;
        } else {
          if(this.state.grid[i][column] === currentColor) {
            count++;
          } else if(this.state.grid[i][column] !== currentColor) {
            currentColor = this.state.grid[i][column];
            count = 1;
          }
        }

        if(count === 4) {
          console.log('Winner vertically', currentColor);
          return;
        }
      } else if(this.state.grid[i][column] === 0) {
        if(count !== 0) {
          count = 0;
        }
        if(currentColor !== undefined) {
          currentColor = undefined;
        }
      }
    }
  }

  checkHorizontally = (row) => {
    let count = 0;
    let currentColor = undefined;

    for(let i = 0; i < this.state.grid[row].length; i++) {
      if(this.state.grid[row][i] !== 0) {
        if(currentColor === undefined) {
          currentColor = this.state.grid[row][i];
          count++;
        } else {
          if(this.state.grid[row][i] === currentColor) {
            count++;
          } else if(this.state.grid[row][i] !== currentColor) {
            currentColor = this.state.grid[row][i];
            count = 1;
          }
        }

        if(count === 4) {
          console.log('Winner horizontally', currentColor);
          return;
        }
      } else if(this.state.grid[row][i] === 0) {
        if(count !== 0) {
          count = 0;
        }
        if(currentColor !== undefined) {
          currentColor = undefined;
        }
      }
    }
  }

  checkDiagonallyRight = (row, column) => {
    let currentRow = 0;
    let currentColumn = 0;

    if(row - column >= 0) {
      currentRow = row - column;
    } else if(row - column < 0) {
      currentColumn = column - row;
    }

    let count = 0;
    let currentColor = undefined;

    while(currentRow < this.state.grid.length && currentColumn < this.state.grid[0].length) {
      // console.log(currentRow, currentColumn);
      if(this.state.grid[currentRow][currentColumn] !== 0) {
        if(currentColor === undefined) {
          currentColor = this.state.grid[currentRow][currentColumn];
          count++;
        } else {
          if(this.state.grid[currentRow][currentColumn] === currentColor) {
            count++;
          } else if(this.state.grid[currentRow][currentColumn] !== currentColor) {
            currentColor = this.state.grid[currentRow][currentColumn];
            count = 1;
          }
        }

        if(count === 4) {
          console.log('Winner diagonally right', currentColor);
          return;
        }
      } else if(this.state.grid[currentRow][currentColumn] === 0) {
        if(count !== 0) {
          count = 0;
        }
        if(currentColor !== undefined) {
          currentColor = undefined;
        }
      }

      currentRow++;
      currentColumn++;
    }
  }

  // at position [5,6] row and column in checkDiagonallyLeft is [-1, 6]

  checkDiagonallyLeft = (row, column) => {
    let currentRow = 0;
    let currentColumn = 6;

    if(column === 6) {
      currentRow = row;
    } else if(row + column > 6) {
      currentRow = column - 1;
    } else if(row + column <= 6) {
      currentColumn = row + column;
    }

    let count = 0;
    let currentColor = undefined;

    while(currentRow < this.state.grid.length && currentColumn >= 0) {
      console.log('row and column in checkDiagonallyLeft', currentRow, currentColumn);
      if(this.state.grid[currentRow][currentColumn] !== 0) {
        if(currentColor === undefined) {
          currentColor = this.state.grid[currentRow][currentColumn];
          count++;
        } else {
          if(this.state.grid[currentRow][currentColumn] === currentColor) {
            count++;
          } else if(this.state.grid[currentRow][currentColumn] !== currentColor) {
            currentColor = this.state.grid[currentRow][currentColumn];
            count = 1;
          }
        }

        if(count === 4) {
          console.log('Winner diagonally left', currentColor);
          return;
        }
      } else if(this.state.grid[currentRow][currentColumn] === 0) {
        if(count !== 0) {
          count = 0;
        }
        if(currentColor !== undefined) {
          currentColor = undefined;
        }
      }

      currentRow++;
      currentColumn--;
    }
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
        <Grid columns={16} centered>
          {rowsAndColumns}
        </Grid>
      </div>
    );
  }
}

export default GameGrid;

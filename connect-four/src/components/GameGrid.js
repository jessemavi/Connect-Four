import React, { Component } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import _ from 'lodash';

class GameGrid extends Component {
  constructor(props) {
    super();
    this.state = { 
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

    if(!this.props.currentPlayer) {
      return;
    }

    // go through the column in the grid
    const { grid } = this.state;

    let i;

    for(i = grid.length - 1; i >= 0; i--) {
      if(grid[i][column] === 0) {
        if(this.props.currentPlayer === 'player1') {
          grid[i][column] = this.props.player1Color;
          this.setState({
            grid: grid,
            currentPlayer: 'player2'
          });
          this.props.updateCurrentPlayer('player2');
        } else if(this.props.currentPlayer === 'player2') {
          grid[i][column] = this.props.player2Color;
          this.setState({
            grid: grid
          });
          this.props.updateCurrentPlayer('player1');
        }
        break;
      }
    }

    // check for four in a row
    if(i >= 0) {
      this.checkVertically(column);
      this.checkHorizontally(i);
      this.checkDiagonallyRight(i, column);
      this.checkDiagonallyLeft(i, column);
    }
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
    console.log('starting point', row, column);

    let startingRow = row;
    let startingColumn = column;

    while(startingRow !== 0 || startingColumn !== 0) {
      if(startingRow === 0 || startingColumn === 0) {
        break;
      }
      startingRow--;
      startingColumn--;
    }

    console.log(startingRow, startingColumn);

    let currentRow = startingRow;
    let currentColumn = startingColumn;

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

  checkDiagonallyLeft = (row, column) => {

    console.log('starting point', row, column);

    let startingRow = row;
    let startingColumn = column;

    while(startingRow !== 0 || startingColumn !== 6) {
      if(startingRow === 0 || startingColumn === 6) {
        break;
      }
      startingRow -= 1;
      startingColumn += 1;
    }

    console.log(startingRow, startingColumn);

    let currentRow = startingRow;
    let currentColumn = startingColumn;

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
        <Grid columns={16} centered>
          {rowsAndColumns}
        </Grid>
      </div>
    );
  }
}

export default GameGrid;

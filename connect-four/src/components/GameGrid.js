import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import './GameGrid.css';

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


  static getDerivedStateFromProps = (props, state) => {
    if(props.gameWinner === 'reset') {
      return {
        grid: [
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0]
        ] 
      }
    }
    return null;
  }

  gameWon = () => {
    if(this.props.currentPlayer === 'player1') {
      this.props.setWinner('player2');
    } else if(this.props.currentPlayer === 'player2') {
      this.props.setWinner('player1');
    }
  }


  dropDisc = async (row, column) => {
    if(!this.props.currentPlayer || this.props.gameWinner !== '') {
      return;
    }

    const { grid } = this.state;

    let i;
    for(i = grid.length - 1; i >= 0; i--) {
      if(grid[i][column] === 0) {
        if(this.props.currentPlayer === 'player1') {
          grid[i][column] = this.props.player1Color;
          await this.setState({
            grid: grid
          });
          this.props.updateCurrentPlayer('player2');
        } else if(this.props.currentPlayer === 'player2') {
          grid[i][column] = this.props.player2Color;
          await this.setState({
            grid: grid
          });
          this.props.updateCurrentPlayer('player1');
        }
        this.props.incrementNumberOfPlays();
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
    let count = 1;

    for(let i = 1; i < this.state.grid.length; i++) {
      if(this.state.grid[i][column] !== 0) {
        if(this.state.grid[i][column] === this.state.grid[i - 1][column]) {
          count++;
        } else {
          count = 1;
        }

        if(count === 4) {
          this.gameWon();
        }
      }
    }
  }


  checkHorizontally = (row) => {
    let count = 1;

    for(let i = 1; i < this.state.grid[row].length; i++) {
      if(this.state.grid[row][i] !== 0) {
        if(this.state.grid[row][i] === this.state.grid[row][i - 1]) {
          count++;
        } else {
          count = 1;
        }

        if(count === 4) {
          this.gameWon();
        }
      }
    }
  }


  checkDiagonallyRight = (row, column) => {
    let startingRow = row;
    let startingColumn = column;

    while(startingRow !== 0 || startingColumn !== 0) {
      if(startingRow === 0 || startingColumn === 0) {
        break;
      }
      startingRow--;
      startingColumn--;
    }

    let currentRow = startingRow;
    let currentColumn = startingColumn;

    let count = 0;
    let currentColor = undefined;

    while(currentRow < this.state.grid.length && currentColumn < this.state.grid[0].length) {
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
          this.gameWon();
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
    let startingRow = row;
    let startingColumn = column;

    while(startingRow !== 0 || startingColumn !== 6) {
      if(startingRow === 0 || startingColumn === 6) {
        break;
      }
      startingRow -= 1;
      startingColumn += 1;
    }

    let currentRow = startingRow;
    let currentColumn = startingColumn;

    let count = 0;
    let currentColor = undefined;

    while(currentRow < this.state.grid.length && currentColumn >= 0) {
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
          this.gameWon();
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
      <Grid.Row key={i} >
        {_.times(7, j => (
          <Grid.Column key={j} className='grid-column'>
            {this.state.grid[i][j] !== 0 ?
              <Icon name='circle' size='huge' color={this.state.grid[i][j]} onClick={this.dropDisc.bind(this, i, j)} />
            :
              <Icon name='circle outline' size='huge' onClick={this.dropDisc.bind(this, i, j)} />
            }
          </Grid.Column>
        ))}
      </Grid.Row>
    ));

    return (
      <div>
        <Grid centered={true}>
          {rowsAndColumns}
        </Grid>
      </div>
    );
  }
}


GameGrid.propTypes = {
  updateCurrentPlayer: PropTypes.func.isRequired,
  incrementNumberOfPlays: PropTypes.func.isRequired,
  setWinner: PropTypes.func.isRequired,
  currentPlayer: PropTypes.string.isRequired,
  player1Color: PropTypes.string.isRequired,
  player2Color: PropTypes.string.isRequired,
  gameWinner: PropTypes.string.isRequired
};

export default GameGrid;

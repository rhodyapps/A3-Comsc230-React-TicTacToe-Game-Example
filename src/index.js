import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


/* 
In this branch we will add a helper function at the bottom of the file 
to calculate if there is a winner. 
The calculateWinner() function will be called from Board render().

We also change the Board’s handleClick function to return early by 
ignoring a click if someone has won the game or if a Square is already filled

*/

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
          squares: Array(9).fill(null),
          xIsNext: true, // we add this boolean to have a way to tell who goes next
        };
      }
     /* When we play the game the Board array will look like this:
     [
        'O', null, 'X',
        'X', 'X', 'O',
        'O', null, null,
      ]
      */
   
    /*
    Each time a player moves, xIsNext (a boolean) will be flipped to 
    determine which player goes next and the game’s state will be saved.
    We’ll update the Board’s handleClick function to flip the value of xIsNext
     */

   handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
        return;
      }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    console.log("xIsNext: ",this.state.xIsNext);
     // Here we flip the boolean
    this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
        // this is using the 'not' operator to set either X or O
      });
  }


   renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  // helper function to be called from Board's 'render' function

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header';


/* 

Clicking any of the list item’s buttons throws an error because the jumpTo method 
is undefined. Before we implement jumpTo, we’ll add stepNumber to 
the Game component’s state to indicate which step we’re currently viewing.

First, add stepNumber: 0 to the initial state in Game’s constructor.
Next, we’ll define the jumpTo method in Game to update that stepNumber. 
We also set xIsNext to true if the number that we’re changing stepNumber 
to is even.

We will now make a few changes to the Game’s handleClick method which fires when 
you click on a square.
The stepNumber state we’ve added reflects the move displayed to the user now. 
After we make a new move, we need to update stepNumber by adding stepNumber: 
history.length as part of the this.setState argument. 
This ensures we don’t get stuck showing the same move after a new one has been made.

We will also replace reading this.state.history with this.state.history.slice(0, this.state.stepNumber + 1). 
This ensures that if we “go back in time” and then make a new move from that point, 
we throw away all the “future” history that would now become incorrect.

Finally, we will modify the Game component’s render method from always rendering
 the last move to rendering the currently selected move according to stepNumber:

*/

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
  
   renderSquare(i) {
    return (
      <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      />
    );
  }
  
  render() {
    return (
      <div>
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
    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null),
          }],
          stepNumber: 0,
          xIsNext: true,
        };
      }

      handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);

        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares,
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
      }
      jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
      }

      render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
    
        const moves = history.map((step, move) => {
          const desc = move ?
            'Go to move #' + move :
            'Go to game start';
          return (
            <li key={move}>
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
        });
    
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
    
        return (
          <div className="game">
            <div>
            <Header />
            </div>
            <div className="game-board" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '60px',
            
            }}>
              <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
              />
            </div>
            <div className="game-info">
              <div>{status}</div>
              <ol>{moves}</ol>
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
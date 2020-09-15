import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


/* 
/* 
In this branch we will add keys to the dynamic list items.
 Keys tell React about the identity of each component which allows 
 React to maintain state between re-renders. If a component’s key changes, 
 the component will be destroyed and re-created with a new state.steps were taken.

key is a special and reserved property in React (along with ref, a more advanced 
feature). When an element is created, React extracts the key property and stores 
the key directly on the returned element. Even though key may look like it belongs 
in props, key cannot be referenced using this.props.key.
 React automatically uses key to decide which components to update.
  A component cannot inquire about its key.

It’s strongly recommended that you assign proper keys whenever you build dynamic lists.
If you don’t have an appropriate key, you may want to consider restructuring your data 
so that you do.

If no key is specified, React will present a warning and use the array index as a key
by default. Using the array index as a key is problematic when trying to re-order
a list’s items or inserting/removing list items. 
Explicitly passing key={i} silences the warning but has the same problems as array
indices and is not recommended in most cases.

Keys do not need to be globally unique; 
they only need to be unique between components and their siblings.

In the tic-tac-toe game’s history, each past move has a unique ID associated with it:
 it’s the sequential number of the move. The moves are never re-ordered, deleted, 
 or inserted in the middle, so it’s safe to use the move index as a key.

In the Game component’s render method, we can add the key as <li key={move}> 
and React’s warning about keys should disappear.

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
          xIsNext: true,
        };
      }

      handleClick(i) {
        const history = this.state.history;
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
          xIsNext: !this.state.xIsNext,
        });
      }


      render() {
        const history = this.state.history;
        const current = history[history.length - 1];
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
            <div className="game-board">
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
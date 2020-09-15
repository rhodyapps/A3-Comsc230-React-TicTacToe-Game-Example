import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


/* 
In this branch we will make it possible to “go back in time” to the previous moves
in the game.

If we mutated the squares array, implementing time travel would be very difficult.

However, we used slice() to create a new copy of the squares array after every move,
 and treated it as immutable. This will allow us to store every past version of the
 squares array, and navigate between the turns that have already happened.

We’ll store the past squares arrays in another array called history.
The history array represents all board states, from the first to the last move, 
and has a shape like this:

history = [
  // Before first move
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // After first move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // After second move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, 'O',
    ]
  },
  // ...
]

Now we need to decide which component should own the history state.
We’ll want the top-level Game component to display a list of past moves. 
It will need access to the history to do that, so we will place the history
 state in the top-level Game component.

Placing the history state into the Game component lets us remove the squares 
state from its child Board component. Just like we “lifted state up” from the 
Square component into the Board component, we are now lifting it up from the Board
into the top-level Game component. This gives the Game component full control over the Board’s data, and lets it instruct the Board to render previous turns from the history.

First, we’ll set up the initial state for the Game component within its constructor.

Next, we’ll have the Board component receive squares and onClick props from the
 Game component. Since we now have a single click handler in Board for many Squares,
  we’ll need to pass the location of each Square into the onClick handler to indicate 
  which Square was clicked. Here are the required steps to transform the Board 
  component:

    1. Delete the constructor in Board.
    2. Replace this.state.squares[i] with this.props.squares[i] in Board’s renderSquare.
    3. Replace this.handleClick(i) with this.props.onClick(i) in Board’s renderSquare.

    In this branch the Board component has the code after these steps were taken.

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
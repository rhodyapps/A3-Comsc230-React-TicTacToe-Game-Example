import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


/* 
In this branch we will add the ability to have players take turns and the topic 'immutability'.

First, immutability: 
There are generally two approaches to changing data. 
The first approach is to mutate the data by directly changing the data’s values.
The second approach is to replace the data with a new copy which has the desired 
changes.

Immutability makes complex features much easier to implement. Later in this tutorial,
we will implement a “time travel” feature that allows us to review the tic-tac-toe game’s 
history and “jump back” to previous moves. This functionality isn’t specific to games
— an ability to undo and redo certain actions is a common requirement in applications. 
Avoiding direct data mutation lets us keep previous versions of the game’s history intact, 
and reuse them later.

Detecting changes in mutable objects is difficult because they are modified directly.
 This detection requires the mutable object to be compared to previous copies of itself
  and the entire object tree to be traversed.

Detecting changes in immutable objects is considerably easier.
 If the immutable object that is being referenced is different than the previous one,
  then the object has changed.

The main benefit of immutability is that it helps you build pure components in React.
Immutable data can easily determine if changes have been made, which helps to determine
when a component requires re-rendering.

Replace the previous version of the Square class with this function:
We have changed this.props to props both times it appears.

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
        const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

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
  
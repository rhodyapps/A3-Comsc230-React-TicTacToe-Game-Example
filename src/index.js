import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


/* To collect data from multiple children, or to have two child components communicate
 with each other, you need to declare the shared state in their parent component (Board) instead of in the child (Square)
 The parent component can pass the state back down to the children by using props; 
 this keeps the child components in sync with each other and with the parent component.

In this branch we will add an array to the Board component to hold the state value of each Square.
 */

class Square extends React.Component {
   
   
    
     constructor(props) {
        super(props);
        this.state = {
          value: null,
        };
      }

    render() {
      return (
        <button  className="square"
        onClick={() => this.setState({value: 'X'})}>
                {/* 
                Replace this.props.value with this.state.value inside the <button> tag.
                Replace the onClick={...} event handler with onClick={() => this.setState({value: 'X'})}.
                Put the className and onClick props on separate lines for better readability.
                 
                By calling this.setState from an onClick handler in the Square’s render method, 
                we tell React to re-render that Square whenever its <button> is clicked. 
                 When you call setState in a component, React automatically 
                 updates the child components inside of it too.
                 */ }
         {this.state.value}
         {/* Use Chrome Developer tools > Console to see this.state.value as you click */}
         {console.log(this.state.value)}
         
         
        </button>
      );
    }
  }
  
  class Board extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
          squares: Array(9).fill(null),
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
    We will now use the prop passing mechanism again. 
    We will modify the Board to instruct each individual 
    Square about its current value ('X', 'O', or null). 
    We have already defined the squares array in the Board’s constructor,
    and we will modify the Board’s renderSquare method to read from it.

    so we add the following to renderSquare:
    return <Square value={this.state.squares[i]}

    Next, we need to change what happens when a Square is clicked. 
    The Board component now maintains which squares are filled. 

    We need to create a way for the Square to update the Board’s state. 
    Since state is considered to be private to a component that defines it, 
    we cannot update the Board’s state directly from Square.

    Instead, we’ll pass down a function from the Board to the Square, 
    and we’ll have Square call that function when a square is clicked.
     We’ll change the renderSquare method in Board to call a function that
     is passed down from the Board to the Square when a Square is clicked as follows:
    */

   handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
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
      const status = 'Next player: X';
  
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
  
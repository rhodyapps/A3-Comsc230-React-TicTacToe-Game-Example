import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* This branch, part4-arrow-function-syntax shows how to 
use the arrow function syntax to streamline the codeing for functions.
Note that in this part of the program we have plain javascript
 we can use the JS comment syntax for single 
or multiline comments
*/

class Square extends React.Component {
    render() {
      return (
        <button className="square" onClick={() => alert('click')}>
                {/* ES6/ES2015 introduced arrow functions, which are nice 
                when working with inline functions, as parameters or callbacks:
                the previous syntax:

                   const dosomething = function dosomething(foo) {
                            // do something
                            }

                can now be written using arrow syntax as:
                
                const dosomething = foo => {
                            //do something
                            }

            In the code for this button, notice how with onClick={() => alert('click')}, 
            we’re passing a function - alert('click') - as the onClick prop. 
            React will only call this function after a click.
                 */ }
         {this.props.value}
         {console.log(this.props.value)}
         
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      {//return <Square />;}
      return <Square value={i} />;
    }
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
  
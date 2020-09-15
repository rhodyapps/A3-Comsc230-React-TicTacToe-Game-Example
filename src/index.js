import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Note that in this part of the program we have plain javascript
/*  we can use the JS comment syntax for single 
or multiline comments
*/

class Square extends React.Component {
   
    /* 
    React components can have state by setting this.state in their constructors.
     this.state should be considered as private to a React component that it’s defined in.
      Let’s store the current value of the Square in this.state, and change it when the Square is clicked.
    
    First, we’ll add a constructor to the class to initialize the state:
     Note: In JavaScript classes, you need to always call super when defining the constructor of a subclass.
       All React component classes that have a constructor should start with a super(props) call.
       
    */
    
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
  
import React from "react";
import ReactDOM from "react-dom";

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
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      gamer1: "",
      gamer2: "",
    };
  }

  handleClick(i) {
    const history = this.state.history;
    console.log(history);
    const current = history[history.length - 1];
    console.log(current);
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }

  componentDidMount() {
    let name1 = "Nastya"; //prompt("Введите имя первого игрока");
    let name2 = "Lesha"; //prompt("Введите имя второго игрока");
    this.setState({
      gamer1: name1,
      gamer2: name2,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winnerSign = calculateWinner(current.squares);

    let winner;
    if (winnerSign === "X") {
      winner = this.state.gamer1;
    } else {
      winner = this.state.gamer2;
    }
    let status;
    if (winnerSign) {
      status = "Победитель: " + winner + "!";
    } else {
      status =
        "Теперь ходит: " +
        (this.state.xIsNext
          ? `${this.state.gamer1} (X)`
          : `${this.state.gamer2} (O)`);
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
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

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

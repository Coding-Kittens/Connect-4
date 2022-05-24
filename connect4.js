/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
const gameDiv = document.getElementById("game"); //gets the "board"
const htmlBoard = document.getElementById("board");
const playerText = document.querySelector("h2");
const playerColor = ["red", "blue"];

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let playerVs = 1; //player v player 1: or player v computer 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

let isCpTurn = false;
let isGameOver = false;

//you can also press the numbers on you keyboard to place a piece
window.addEventListener("keydown", (event) => {
  let regex = /[\d]/;
  if (regex.test(event.key) && !isCpTurn && !isGameOver) {
    UpdateGame(event.key - 1);
  }
});

function startGame() {
  isGameOver = false;
  isCpTurn = false;
  exceptNums = [];
  switchPlayerText();
  makeBoard();
  makeHtmlBoard();
}

function resetGame() {
  currPlayer = 1;
  board = [];
  let tr = document.querySelectorAll("tr");

  for (let r of tr) {
    r.remove();
  }
}

//makes the board array to keep track of pieces
function makeBoard() {
  for (let i = 0; i < HEIGHT; i++) {
    let tempArr = [];
    for (let i = 0; i < WIDTH; i++) {
      tempArr.push(null);
    }

    board.push(tempArr);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  //makes the top part of the board where you click
  let top = document.createElement("tr");
  //set the id to column-top
  top.setAttribute("id", "column-top");
  //adds the event listener so you can click on it
  top.addEventListener("click", handleClick);

  //add the squears to the top of the board
  for (var x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    //set the id to the number that x is, so that it knows what column you put the piece on
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // creates the rest of the board
  for (let y = 0; y < HEIGHT; y++) {
    //makes a row
    let row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      // makes all the cells in the row
      let cell = document.createElement("td");
      //sets the coordinates for the cell as its id
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  //get the board check the colom that is givin return the first empty spot

  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (board[y][x] === null) {
      board[y][x] = currPlayer;
      return y;
    }
  }

  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  let piece = document.createElement("div");
  let cell = document.getElementById(`${y}-${x}`);
  piece.setAttribute("class", `piece player${currPlayer}`);
  setColor(piece, playerColor[currPlayer - 1]);
  setTimeout(() => {
    piece.animate(
      [{ transform: "translateY(-500px)" }, { transform: "translateY(30px)" }],
      1000
    );
    cell.append(piece);
  }, 200);
}

/** endGame: announce game end */

function endGame(msg) {
  isGameOver = true;
  setTimeout(() => {
    setTimeout(() => {
      gameOverMsg(msg);
    }, 1000);
    gameOverAnim();
    setTimeout(() => {
      resetGame();
      startGame();
    }, 1500);
  }, 1600);
}

function gameOverMsg(msg) {
  alert(msg);
}

function gameOverAnim() {
  let pieces = document.querySelectorAll(".piece");
  pieces.forEach((piece) => {
    piece.animate({ transform: "translateY(1000px)" }, 1500);
  });
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  if (!isCpTurn && !isGameOver) {
    let x = +evt.target.id;
    UpdateGame(x);
  }
}

function UpdateGame(x) {
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return null;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (checkIfTie(board)) {
    return endGame(`Tie!`);
  }

  switchPlayers();
  switchPlayerText();

  if (checkifComputer()) {
    isCpTurn = true;
    playComputerTurn();
  } else {
    isCpTurn = false;
  }
}

function switchPlayers() {
  currPlayer === 1 ? (currPlayer = 2) : (currPlayer = 1);
}

function switchPlayerText() {
  setColor(playerText, playerColor[currPlayer - 1]);
  playerText.innerText = "Player " + currPlayer;
}

const checkifComputer = () => (currPlayer == 2 && playerVs == 2 ? true : false);

const checkIfTie = (arr) =>
  arr.every((val) => val.every((cell) => cell !== null));

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  // Check four cells to see if they're all color of current player
  //  - cells: list of four (y, x) cells
  //  - returns true if all are legal coordinates & all match currPlayer
  const _win = (cells) =>
    cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );

  //checks the whole board
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      //checks if there are four horizontaly
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      //checks if there are four verticly
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      //checks if there are four on either diagonal
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];
      //checks if any of them are all the same color
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

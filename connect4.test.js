describe("make Board tests", function () {
  it("should make an array that has the right num of 'rows' and 'columns' ", function () {
    board = [];
    makeBoard();
    expect(board.length).toEqual(6);
    expect(board[2].length).toEqual(7);
    expect(WIDTH).toEqual(7);
    expect(HEIGHT).toEqual(6);
  });
});

describe(" make Html-Board tests", function () {
  it("should make the game board ", function () {
    resetGame();
    startGame();
    expect(htmlBoard.children.length).toEqual(7);
  });
});

describe(" find Spot For Col tests", function () {
  it("should find an empty spot ", function () {
    let tempBoard = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [1, null, null, null, null, null, null],
      [1, null, null, null, null, null, null],
      [1, null, null, null, null, null, null],
    ];
    board = tempBoard;

    expect(findSpotForCol(0)).toEqual(2);
  });

  it("should return null if there is no empty spot ", function () {
    let tempBoard = [
      [1, null, null, null, null, null, null],
      [2, null, null, null, null, null, null],
      [1, null, null, null, null, null, null],
      [2, null, null, null, null, null, null],
      [1, null, null, null, null, null, null],
      [1, null, null, null, null, null, null],
    ];
    board = tempBoard;
    expect(findSpotForCol(0)).toEqual(null);
  });
});

describe(" place In Table tests", function () {
  it("should make a new div ", function () {
    resetGame();
    startGame();
    placeInTable(0, 0);
    expect(htmlBoard.children[1].children[0]).not.toEqual(undefined);
  });
});

describe(" end Game  tests", function () {
  beforeEach(function () {
    spyOn(window, "alert");
  });

  it("should alert the players with the msg passed in", function () {
    gameOverMsg("cats are the best");
    expect(window.alert).toHaveBeenCalledWith("cats are the best");
  });
});

describe(" switch Players  tests", function () {
  it("should switch the current Player to the next player ", function () {
    currPlayer = 1;
    switchPlayers();
    expect(currPlayer).toEqual(2);
    switchPlayers();
    expect(currPlayer).toEqual(1);
  });

  it("should set the current Player to 1 if currPlayer <=0  or is > 2", function () {
    currPlayer = -1;
    switchPlayers();
    expect(currPlayer).toEqual(1);
    currPlayer = 0;
    switchPlayers();
    expect(currPlayer).toEqual(1);
    currPlayer = 3;
    switchPlayers();
    expect(currPlayer).toEqual(1);
  });
});

describe(" check For Win tests", function () {
  it("should check if there are not four in a row", function () {
    let tempBoard = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ];

    board = tempBoard;
    expect(checkForWin()).toEqual(undefined);
  });

  it("should check if there are four horizontaly", function () {
    tempBoard = [
      [null, null, null, null, null, null, null],
      [null, 1, 1, 1, 1, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ];
    board = tempBoard;
    expect(checkForWin()).toEqual(true);
  });
  it("should check if there are four verticly", function () {
    let tempBoard = [
      [null, null, null, null, null, null, null],
      [1, null, null, null, null, null, null],
      [1, null, null, null, null, null, null],
      [1, null, null, null, null, null, null],
      [1, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ];
    board = tempBoard;
    expect(checkForWin()).toEqual(true);
  });
  it("should check if there are four diagonaly UP", function () {
    let tempBoard = [
      [null, null, null, 1, null, null, null],
      [null, null, 1, null, null, null, null],
      [null, 1, null, null, null, null, null],
      [1, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ];
    board = tempBoard;
    expect(checkForWin()).toEqual(true);
  });
  it("should check if there are four diagonaly Down", function () {
    let tempBoard = [
      [1, null, null, null, null, null, null],
      [null, 1, null, null, null, null, null],
      [null, null, 1, null, null, null, null],
      [null, null, null, 1, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ];
    board = tempBoard;
    expect(checkForWin()).toEqual(true);
  });
});

describe(" reset Game tests", function () {
  beforeEach(function () {
    resetGame();
  });

  it("should clear the board array ", function () {
    expect(board).toEqual([]);
  });

  it("should clear the htmlBoard ", function () {
    expect(htmlBoard.innerHtml).toEqual(undefined);
  });

  it("should set the player to player1 ", function () {
    expect(currPlayer).toEqual(1);
  });
});

describe(" check if tie and check if computer tests", function () {
  beforeEach(function () {
    resetGame();
  });

  it("should be a tie ", function () {
    let tempBoard = [
      [1, 2, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 2, 2],
      [1, 2, 1, 2, 1, 2, 1],
      [2, 1, 2, 1, 2, 1, 2],
      [2, 1, 2, 1, 2, 1, 1],
      [2, 1, 2, 1, 2, 1, 2],
    ];
    expect(checkIfTie(tempBoard)).toEqual(true);
  });

  it("should not be a tie ", function () {
    let tempBoard = [
      [1, null, null, null, null, null, null],
      [null, 1, null, null, null, null, null],
      [null, null, 1, null, null, null, null],
      [null, null, null, 1, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ];

    expect(checkIfTie(tempBoard)).toEqual(false);
  });

  it("should check if it is the coputers turn", function () {
    currPlayer = 2;
    playerVs = 2;
    expect(checkifComputer()).toEqual(true);
    currPlayer = 1;
    playerVs = 2;
    expect(checkifComputer()).toEqual(false);
    currPlayer = 2;
    playerVs = 1;
    expect(checkifComputer()).toEqual(false);
    currPlayer = 1;
    playerVs = 1;
    expect(checkifComputer()).toEqual(false);
  });
});

afterEach(function () {
  resetGame();
  startGame();
});

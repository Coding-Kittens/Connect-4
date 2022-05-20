describe("make Board tests",function() {
it("should make an array that has the right num of 'rows' and 'columns' ",function () {
  board = [];
  makeBoard(3,3)
    expect(board.length).toEqual(3);
    expect(board[2].length).toEqual(3);
    expect(WIDTH).toEqual(3);
    expect(HEIGHT).toEqual(3);
}
);

it("should default to a width of 7 and a height of 6 if the values are <= 0 ",function () {
  board = [];
  makeBoard(-3,0)
    expect(board.length).toEqual(6);
    expect(board[2].length).toEqual(7);
    expect(WIDTH).toEqual(7);
    expect(HEIGHT).toEqual(6);

}
);


});

describe(" make Html-Board tests",function() {
it("should make game board ",function () {
  makeHtmlBoard();
  expect(htmlBoard.children.length).toEqual(14);
}
);

});



describe(" find Spot For Col tests",function() {

it("should find an empty spot ",function () {

  let  tempBoard = [
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ 1, null, null, null, null, null, null ],
    [ 1, null, null, null, null, null, null ],
    [ 1, null, null, null, null, null, null ],
  ];
  board = tempBoard;


  expect(findSpotForCol(0)).toEqual(2);

}
);

it("should return null if there is no empty spot ",function () {
  let  tempBoard = [
    [ 1, null, null, null, null, null, null ],
    [ 2, null, null, null, null, null, null ],
    [ 1, null, null, null, null, null, null ],
    [ 2, null, null, null, null, null, null ],
    [ 1, null, null, null, null, null, null ],
    [ 1, null, null, null, null, null, null ],
  ];
  board = tempBoard;
expect(findSpotForCol(0)).toEqual(null);
}
);


});


describe(" place In Table tests",function() {
it("should make a new div ",function () {

  placeInTable(0,0);
  expect(htmlBoard.children[1].children[0]).not.toEqual(undefined);
}
);
});


describe(" end Game  tests",function() {
  beforeEach(function() {
    spyOn(window, 'alert');
  });


it("should alert the players with the msg passed in",function () {
  endGame("cats are the best");
expect(window.alert).toHaveBeenCalledWith('cats are the best');
}
);

});


describe(" switch Players  tests",function() {
it("should switch the current Player to the next player ",function () {
  currPlayer=1;
  switchPlayers();
  expect(currPlayer).toEqual(2);
  switchPlayers();
  expect(currPlayer).toEqual(1);
}
);

it("should set the current Player to 1 if currPlayer <=0  or is > 2",function () {
  currPlayer= -1;
  switchPlayers();
  expect(currPlayer).toEqual(1);
  currPlayer= 0;
  switchPlayers();
  expect(currPlayer).toEqual(1);
  currPlayer= 3;
  switchPlayers();
  expect(currPlayer).toEqual(1);
}
);

});


describe(" check For Win tests",function() {


it("should check if there are not four in a row",function () {
let  tempBoard = [
  [ null, null, null, null, null, null, null ],
  [ null, null, null, null, null, null, null ],
  [ null, null, null, null, null, null, null ],
  [ null, null, null, null, null, null, null ],
  [ null, null, null, null, null, null, null ],
  [ null, null, null, null, null, null, null ],
];

board = tempBoard;
  expect(checkForWin()).toEqual(undefined);



}
);

it("should check if there are four horizontaly",function () {
  tempBoard = [
    [ null, null, null, null, null, null, null ],
    [ null, 1, 1, 1, 1, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
  ];
  board = tempBoard;
  expect(checkForWin()).toEqual(true);
}
);
it("should check if there are four verticly",function () {

    let tempBoard = [
      [ null, null, null, null, null, null, null ],
      [ 1, null, null,null, null, null, null ],
      [ 1, null, null, null, null, null, null ],
      [ 1, null, null, null, null, null, null ],
      [ 1, null, null, null, null, null, null ],
      [ null, null, null, null, null, null, null ],
    ];
    board = tempBoard;
    expect(checkForWin()).toEqual(true);

}
);
it("should check if there are four diagonaly UP",function () {
let tempBoard = [
    [ null, null, null, 1, null, null, null ],
    [ null, null, 1, null, null, null, null ],
    [ null,1, null, null, null, null, null ],
    [ 1, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
  ];
  board = tempBoard;
  expect(checkForWin()).toEqual(true);

}
);
it("should check if there are four diagonaly Down",function () {

  let  tempBoard = [
    [ 1, null, null, null, null, null, null ],
    [ null, 1, null, null, null, null, null ],
    [ null, null, 1, null, null, null, null ],
    [ null, null, null, 1, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
  ];
  board = tempBoard;
  expect(checkForWin()).toEqual(true);

}
);


});


describe(" reset Game tests",function() {

  beforeEach(function() {
  resetGame();
  });


it("should clear the board array ",function () {
    expect(board).toEqual([]);
}
);

it("should clear the htmlBoard ",function () {
    expect(htmlBoard.innerHtml).toEqual(undefined);
}
);

it("should set the player to player1 ",function () {
    expect(currPlayer).toEqual(1);
}
);
});


afterEach(function(){
resetGame();
startGame();
});

const mainMenu = document.querySelector(".mainMenu");
const menuBtn = document.querySelector("#mBtn");
const restartBtn = document.querySelector("#rBtn");
const optionsBtn = document.querySelector(".imgBtn");
let exceptNums = [];

//starts the game when the play button is pressed
mainMenu.addEventListener("submit", (event) => {
  event.preventDefault();

  playerColor[0] = document.querySelector("input[name='p1Color']").value;
  playerColor[1] = document.querySelector("input[name='p2Color']").value;

  try {
    playerVs = document.querySelector("input[name='PlayerVs']:checked").value;
  } catch (e) {
    //if the player does not set a value, or there is an error, it defaults to 1
    console.log("value was not set");
    playerVs = 1;
  }

  mainMenu.classList.add("hiddenObj");
  playerText.classList.remove("hiddenObj");
  optionsBtn.classList.remove("hiddenObj");
  startGame();
});

restartBtn.addEventListener("click", () => {
  switchPlayers();
  gameOverMsg(`Player ${currPlayer} won!`);
  resetGame();
  startGame();
});

menuBtn.addEventListener("click", () => {
  mainMenu.classList.remove("hiddenObj");
  playerText.classList.add("hiddenObj");
  optionsBtn.classList.add("hiddenObj");
  resetGame();
});

function setColor(element, color) {
  element.style.backgroundColor = color;
}

function playComputerTurn() {
  //random time to make it seem like its "thinking"
  let timer = randomRange(1, 5);

  setTimeout(() => {
    let x = randomRange(0, 7, ...exceptNums);

    //loops till it finds a row that has an empty spot
    //so it dosn't get stuck by a chooseing a row that is already full
    while (UpdateGame(x) === null) {
      //adds x to the list of exceptions so that next time it won't choose that num again till next game
      exceptNums.push(x);
      x = randomRange(0, 7, ...exceptNums);
    }
  }, timer * 1000);
}

//gives a random value from the min num to the max num except the exceptions
function randomRange(min, max, ...except) {
  let isrand = false;
  let num = 0;
  while (!isrand) {
    num = Math.floor(Math.random() * max);
    //if the num picked is less than the minimum then it pick a different num
    num >= min ? (isrand = true) : (isrand = false);
    //if the num is the same as any of the exceptions then it picks a different num
    if (except.length > 0) {
      isrand = !except.some((exNum) => exNum === num);
    }
  }

  return num;
}

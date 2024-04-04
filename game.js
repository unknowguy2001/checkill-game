const board = document.getElementById("board");

// prettier-ignore
const starter = [
    "", "X", "", "X", "", "X", "", "X",
    "X", "", "X", "", "X", "", "X", "",
    "", "X", "", "X", "", "X", "", "X",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "Y", "", "Y", "", "Y", "", "Y", "",
    "", "Y", "", "Y", "", "Y", "", "Y",
    "Y", "", "Y", "", "Y", "", "Y", "",
];

let randomPlayer = Math.round(Math.random() * 2);
let player = randomPlayer == 1 ? "red-checker" : "blue-checker";
console.log(player);

const renderGame = () => {
  let isBlack = true;

  for (let i = 0; i < starter.length; i++) {
    let square = createSquare(i);
    toggleSquareColor(square, isBlack);
    appendSquare(square);

    if (starter[i] !== "") {
      let checkerPiece = createCheckerPiece(starter[i]);
      square.appendChild(checkerPiece);
    }

    if ([7, 15, 23, 31, 39, 47, 55].includes(i)) {
      continue;
    }
    isBlack = !isBlack;
  }
};

const createSquare = (index) => {
  let square = document.createElement("div");
  square.classList.add("square");
  square.setAttribute("id", index);
  return square;
};

const toggleSquareColor = (square, isBlack) => {
  isBlack
    ? square.classList.add("black-square")
    : square.classList.add("white-square");
};

const appendSquare = (square) => {
  board.appendChild(square);
};

const createCheckerPiece = (type) => {
  let checkerPiece = document.createElement("div");
  checkerPiece.classList.add("checker-piece");
  checkerPiece.classList.add(type === "X" ? "blue-checker" : "red-checker");
  return checkerPiece;
};

function gameStart() {
  movement(player);
}

function movement(player) {
  const whiteSquares = document.querySelectorAll(".white-square");
  let startPlace = null;
  let destinationPlace = null;
  const kingPlaceRed = [1, 3, 5, 7];
  const kingPlaceBlue = [56, 58, 60, 62];

  function move() {
    const oldCheckerPlace = document.getElementById(startPlace);
    const newChecker = oldCheckerPlace.querySelector("div");
    const newCheckerPlace = document.getElementById(destinationPlace);

    if (newChecker.classList.contains("king")) {
      kingMove();
    }

    oldCheckerPlace.removeChild(newChecker);
    newCheckerPlace.appendChild(newChecker);
    newChecker.classList.remove("clickedChecker");

    if (
      (player === "red-checker" &&
        kingPlaceRed.includes(parseInt(destinationPlace))) ||
      (player === "blue-checker" &&
        kingPlaceBlue.includes(parseInt(destinationPlace)))
    ) {
      beKing(player, newChecker);
    }

    player = player === "red-checker" ? "blue-checker" : "red-checker";
    console.log(player);
  }

  whiteSquares.forEach((whiteSquare) => {
    whiteSquare.addEventListener("click", () => {
      const isHasCheckerInside = whiteSquare.querySelector("div");
      if (isHasCheckerInside) {
        const clickedCheckers = document.querySelectorAll(".clickedChecker");
        clickedCheckers.forEach((clickedChecker) => {
          clickedChecker.classList.remove("clickedChecker");
        });
        startPlace = whiteSquare.getAttribute("id");
        const selectedChecker = document
          .getElementById(startPlace)
          .querySelector("div");
        const isCurrentPlayer = selectedChecker.classList.contains(player);

        if (isCurrentPlayer) {
          const checker = whiteSquare.querySelector("div");
          checker.classList.add("clickedChecker");
          destinationPlace = null;
        }
      } else {
        destinationPlace = whiteSquare.getAttribute("id");
        if (startPlace !== null) {
          const checker = document
            .getElementById(startPlace)
            .querySelector("div");
          const isCurrentPlayer = checker.classList.contains(player);

          if (isCurrentPlayer) {
            const moveDifference = destinationPlace - startPlace;
            const canRedMove = moveDifference === -7 || moveDifference === -9;
            const canBlueMove = moveDifference === 7 || moveDifference === 9;
            const canRedCapture =
              moveDifference === -14 || moveDifference === -18;
            const canBlueCapture =
              moveDifference === 14 || moveDifference === 18;

            if (player === "red-checker") {
              if (canRedMove) {
                const isKing = checker.classList.contains("king");
                if (!isKing) {
                  move();
                }
                kingMove();
              } else if (canRedCapture) {
                if (
                  !document
                    .getElementById(destinationPlace)
                    .querySelector("div")
                ) {
                  const rightNeighbor = document.getElementById(
                    parseInt(destinationPlace) + 7
                  );
                  const leftNeighbor = document.getElementById(
                    parseInt(destinationPlace) + 9
                  );
                  if (
                    rightNeighbor &&
                    parseInt(startPlace) - 7 === parseInt(destinationPlace) + 7
                  ) {
                    rightNeighbor.removeChild(
                      rightNeighbor.querySelector("div")
                    );
                    move();
                  } else if (
                    leftNeighbor &&
                    parseInt(startPlace) - 9 === parseInt(destinationPlace) + 9
                  ) {
                    leftNeighbor.removeChild(leftNeighbor.querySelector("div"));
                    move();
                  }
                }
              }
            } else {
              if (canBlueMove) {
                const isKing = checker.classList.contains("king");
                if (!isKing) {
                  move();
                }
                kingMove();
              } else if (canBlueCapture) {
                if (
                  !document
                    .getElementById(destinationPlace)
                    .querySelector("div")
                ) {
                  const rightNeighbor = document.getElementById(
                    parseInt(destinationPlace) - 7
                  );
                  const leftNeighbor = document.getElementById(
                    parseInt(destinationPlace) - 9
                  );
                  if (
                    rightNeighbor &&
                    parseInt(startPlace) + 7 === parseInt(destinationPlace) - 7
                  ) {
                    rightNeighbor.removeChild(
                      rightNeighbor.querySelector("div")
                    );
                    move();
                  } else if (
                    leftNeighbor &&
                    parseInt(startPlace) + 9 === parseInt(destinationPlace) - 9
                  ) {
                    leftNeighbor.removeChild(leftNeighbor.querySelector("div"));
                    move();
                  }
                }
              }
            }
          }
        }
        startPlace = null;
      }
    });
  });
}

function beKing(player, checker) {
  const skills = [];
  if (!checker.getAttribute("id") && !checker.classList.contains("king")) {
    //checker.setAttribute("id");
    checker.classList.add("king");
  }
}

//!TODO: implement kingMove function
function kingMove() {
  // find skill that king has
  // basic move of king
  //top right -7, top left -9
  //bottom right +7, bottom left +9
  let oldCheckerPlace = document.getElementById(startPlace);
  let newChecker = oldCheckerPlace.querySelector("div");
  let newCheckerPlace = document.getElementById(destinationPlace);

  if (parseInt(destinationPlace) > parseInt(startPlace)) {
    let readyToMove = false;
    const RIGHT = Math.floor(parseInt(destinationPlace) / 7);
    const LEFT = Math.floor(parseInt(destinationPlace) / 9);
    let memo = parseInt(startPlace);
    let enemyCount = 0;
    console.log(LEFT);
    console.log(RIGHT);
    console.log(
      parseInt(destinationPlace) - LEFT * 7 <
        parseInt(destinationPlace) - RIGHT * 9
    );
    if (
      parseInt(destinationPlace) - LEFT * 7 <
      parseInt(destinationPlace) - RIGHT * 9
    ) {
      console.log("Hey ");
      while (readyToMove) {
        if (memo == parseInt(destinationPlace) && enemyCount < 2) {
          readyToMove = true;
          oldCheckerPlace.removeChild(oldCheckerPlace.querySelector("div"));
          newCheckerPlace.appendChild(newChecker);
          newChecker.classList.remove("clickedChecker");
          if (player == "red-checker") {
            player = "blue-checker";
          } else {
            player = "red-checker";
          }
          break;
        }
        memo += 7;
        if (document.getElementById(memo).querySelector("div")) {
          enemyCount++;
          continue;
        }
        continue;
      }
    } else {
      console.log("Hey ");
    }
  }
}
renderGame();
gameStart();

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

function renderGame() {
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
}

function createSquare(index) {
  let square = document.createElement("div");
  square.classList.add("square");
  square.setAttribute("id", index);
  return square;
}

function toggleSquareColor(square, isBlack) {
  isBlack
    ? square.classList.add("black-square")
    : square.classList.add("white-square");
}

function appendSquare(square) {
  board.appendChild(square);
}

function createCheckerPiece(type) {
  let checkerPiece = document.createElement("div");
  checkerPiece.classList.add("checker-piece");
  checkerPiece.classList.add(type === "X" ? "blue-checker" : "red-checker");
  return checkerPiece;
}

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
      kingMove(startPlace, destinationPlace);
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

            if (checker.classList.contains("king")) {
              kingMove(startPlace, destinationPlace);
            } else {
              if (player === "red-checker") {
                if (canRedMove) {
                  const isKing = checker.classList.contains("king");
                  if (!isKing) {
                    move();
                  } else {
                    kingMove(startPlace, destinationPlace);
                  }
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
                      parseInt(startPlace) - 7 ===
                        parseInt(destinationPlace) + 7
                    ) {
                      rightNeighbor.removeChild(
                        rightNeighbor.querySelector("div")
                      );
                      move();
                    } else if (
                      leftNeighbor &&
                      parseInt(startPlace) - 9 ===
                        parseInt(destinationPlace) + 9
                    ) {
                      leftNeighbor.removeChild(
                        leftNeighbor.querySelector("div")
                      );
                      move();
                    }
                  }
                }
              } else {
                if (canBlueMove) {
                  const isKing = checker.classList.contains("king");
                  if (!isKing) {
                    move();
                  } else {
                    kingMove(startPlace, destinationPlace);
                  }
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
                      parseInt(startPlace) + 7 ===
                        parseInt(destinationPlace) - 7
                    ) {
                      rightNeighbor.removeChild(
                        rightNeighbor.querySelector("div")
                      );
                      move();
                    } else if (
                      leftNeighbor &&
                      parseInt(startPlace) + 9 ===
                        parseInt(destinationPlace) - 9
                    ) {
                      leftNeighbor.removeChild(
                        leftNeighbor.querySelector("div")
                      );
                      move();
                    }
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
function kingMove(startPlace, destinationPlace) {
  const oldCheckerPlace = document.getElementById(startPlace);
  const newChecker = oldCheckerPlace.querySelector("div");
  const newCheckerPlace = document.getElementById(destinationPlace);

  //check X asis to move
  if (parseInt(startPlace) < parseInt(destinationPlace)) {
    let result = calculateYAxis(startPlace, destinationPlace);
    console.log(result);
    if (result == "left") {
      let starter = parseInt(startPlace);
      while (startPlace <= parseInt(destinationPlace)) {
        console.log("loop");
        starter += 7;
        if (
          starter == parseInt(destinationPlace) &&
          !document.getElementById(startPlace).querySelector("div")
        ) {
          oldCheckerPlace.removeChild(newChecker);
          newCheckerPlace.appendChild(newChecker);
          newChecker.classList.remove("clickedChecker");
          break;
        }

        if (document.getElementById(startPlace).querySelector("div")) {
          break;
        }
      }
      player = player === "red-checker" ? "blue-checker" : "red-checker";
    } else {
      let starter = parseInt(startPlace);
      while (startPlace <= parseInt(destinationPlace)) {
        starter += 9;
        if (
          starter == parseInt(destinationPlace) &&
          !document.getElementById(startPlace).querySelector("div")
        ) {
          oldCheckerPlace.removeChild(newChecker);
          newCheckerPlace.appendChild(newChecker);
          newChecker.classList.remove("clickedChecker");
          break;
        }

        if (document.getElementById(startPlace).querySelector("div")) {
          break;
        }
      }
      player = player === "red-checker" ? "blue-checker" : "red-checker";
    }
  } else {
    let result = calculateYAxis(startPlace, destinationPlace);
    if (result == "left") {
      let starter = parseInt(startPlace);
      while (startPlace <= parseInt(destinationPlace)) {
        console.log("loop");
        starter += 7;
        if (
          starter == parseInt(destinationPlace) &&
          !document.getElementById(startPlace).querySelector("div")
        ) {
          oldCheckerPlace.removeChild(newChecker);
          newCheckerPlace.appendChild(newChecker);
          newChecker.classList.remove("clickedChecker");
          break;
        }

        if (document.getElementById(startPlace).querySelector("div")) {
          break;
        }
      }
      player = player === "red-checker" ? "blue-checker" : "red-checker";
    } else {
      let starter = parseInt(startPlace);
      while (startPlace <= parseInt(destinationPlace)) {
        starter += 9;
        if (
          starter == parseInt(destinationPlace) &&
          !document.getElementById(startPlace).querySelector("div")
        ) {
          oldCheckerPlace.removeChild(newChecker);
          newCheckerPlace.appendChild(newChecker);
          newChecker.classList.remove("clickedChecker");
          break;
        }

        if (document.getElementById(startPlace).querySelector("div")) {
          break;
        }
      }
      player = player === "red-checker" ? "blue-checker" : "red-checker";
    }
  }
}
function calculateYAxis(startPlace, destinationPlace) {
  let left = Math.floor(parseInt(destinationPlace) / 7);
  let right = Math.floor(parseInt(destinationPlace) / 9);
  if (left > right) {
    return "left";
  }
  return "right";
}
renderGame();
gameStart();

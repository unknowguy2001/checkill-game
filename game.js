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
  let whiteSquares = document.querySelectorAll(".white-square");
  let startPlace = null;
  let destinationPlace = null;
  const kingPlaceRed = [1, 3, 5, 7];
  const kingPlaceBlue = [56, 58, 60, 62];

  //!TODO: implement kingMove function
  function kingMove() {
    // find skill that king has
    // basic move of king
    let oldCheckerPlace = document.getElementById(startPlace);
    let newChecker = oldCheckerPlace.querySelector("div");
    let newCheckerPlace = document.getElementById(destinationPlace);
    if (parseInt(destinationPlace) < parseInt(startPlace)) {
      let readyToMove = false;
      // while (readyToMove) {}
    }
  }

  function move() {
    let oldCheckerPlace = document.getElementById(startPlace);
    let newChecker = oldCheckerPlace.querySelector("div");
    let newCheckerPlace = document.getElementById(destinationPlace);

    if (oldCheckerPlace.querySelector("div").classList.contains("king")) {
      kingMove();
    }

    oldCheckerPlace.removeChild(oldCheckerPlace.querySelector("div"));
    newCheckerPlace.appendChild(newChecker);
    newChecker.classList.remove("clickedChecker");

    if (
      player == "red-checker" &&
      kingPlaceRed.find((val) => {
        return val == parseInt(destinationPlace);
      })
    ) {
      beKing(player, newChecker);
    } else if (
      player == "blue-checker" &&
      kingPlaceBlue.find((val) => {
        return val == parseInt(destinationPlace);
      })
    ) {
      beKing(player, newChecker);
    }

    if (player == "red-checker") {
      player = "blue-checker";
    } else {
      player = "red-checker";
    }
    console.log(player);
  }
  whiteSquares.forEach((whiteSquare) => {
    whiteSquare.addEventListener("click", () => {
      let isHasCheckerInside = whiteSquare.querySelector("div");
      if (isHasCheckerInside) {
        let clickedCheckers = document.querySelectorAll(".clickedChecker");

        //remove last clicked
        clickedCheckers.forEach((clickedChecker) => {
          clickedChecker.classList.remove("clickedChecker");
        });

        startPlace = whiteSquare.getAttribute("id");

        let selectedChecker = document
          .getElementById(startPlace)
          .querySelector("div");

        let isCurrentPlayer = selectedChecker.classList.contains(player);

        if (isCurrentPlayer) {
          let checker = whiteSquare.querySelector("div");

          checker.classList.add("clickedChecker");
          destinationPlace = null;
        }
        destinationPlace = null;
      } else {
        destinationPlace = whiteSquare.getAttribute("id");

        if (startPlace !== null) {
          let checker = document
            .getElementById(startPlace)
            .querySelector("div");
          let isCurrentPlayer = checker.classList.contains(player);

          if (isCurrentPlayer) {
            let canRedMove =
              destinationPlace - startPlace == -7 ||
              destinationPlace - startPlace == -9;

            let canBlueMove =
              destinationPlace - startPlace == 7 ||
              destinationPlace - startPlace == 9;

            let canRedCapture =
              destinationPlace - startPlace == -14 ||
              destinationPlace - startPlace == -18;

            let canBlueCapture =
              destinationPlace - startPlace == 14 ||
              destinationPlace - startPlace == 18;

            if (player == "red-checker") {
              //!TODO: fix this logic
              if (canRedMove) {
                let isKing = checker.classList.contains("king");
                if (!isKing) {
                  move();
                }
                kingMove();
              } else if (canRedCapture) {
                //check if destination has not checker
                if (
                  !document
                    .getElementById(destinationPlace)
                    .querySelector("div")
                ) {
                  //check right
                  if (
                    document
                      .getElementById(parseInt(destinationPlace) + 7)
                      .querySelector("div")
                  ) {
                    if (
                      parseInt(startPlace) - 7 ==
                      parseInt(destinationPlace) + 7
                    ) {
                      let enemy = document.getElementById(
                        parseInt(startPlace) - 7
                      );

                      enemy.removeChild(enemy.querySelector("div"));
                      move();
                    } else if (
                      parseInt(startPlace) - 9 ==
                      parseInt(destinationPlace) + 9
                    ) {
                      let enemy = document.getElementById(
                        parseInt(startPlace) - 9
                      );
                      enemy.removeChild(enemy.querySelector("div"));
                      move();
                    }
                  } else if (
                    //check left
                    document
                      .getElementById(parseInt(destinationPlace) + 9)
                      .document.querySelector("div")
                  ) {
                    if (
                      parseInt(startPlace) - 9 ==
                      parseInt(destinationPlace) + 9
                    ) {
                      let enemy = document.getElementById(
                        parseInt(startPlace) - 9
                      );
                      enemy.removeChild(enemy.querySelector("div"));
                      move();
                    }
                  }
                }
              }
            } else {
              if (canBlueMove) {
                let isKing = checker.classList.contains("king");
                if (!isKing) {
                  move();
                }
                kingMove();
              } else if (canBlueCapture) {
                //check if destination has not checker
                if (
                  !document
                    .getElementById(destinationPlace)
                    .querySelector("div")
                ) {
                  if (
                    document
                      .getElementById(parseInt(destinationPlace) - 7)
                      .querySelector("div")
                  ) {
                    if (
                      parseInt(startPlace) + 7 ==
                      parseInt(destinationPlace) - 7
                    ) {
                      let enemy = document.getElementById(
                        parseInt(startPlace) + 7
                      );

                      enemy.removeChild(enemy.querySelector("div"));
                      move();
                    } else if (
                      parseInt(startPlace) + 9 ==
                      parseInt(destinationPlace) - 9
                    ) {
                      let enemy = document.getElementById(
                        parseInt(startPlace) + 9
                      );
                      enemy.removeChild(enemy.querySelector("div"));
                      move();
                    }
                  } else if (
                    //check left
                    document
                      .getElementById(parseInt(destinationPlace) - 9)
                      .document.querySelector("div")
                  ) {
                    if (
                      parseInt(startPlace) + 9 ==
                      parseInt(destinationPlace) - 9
                    ) {
                      let enemy = document.getElementById(
                        parseInt(startPlace) + 9
                      );
                      enemy.removeChild(enemy.querySelector("div"));
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
renderGame();
gameStart();

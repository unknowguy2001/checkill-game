const board = document.getElementById("board");
const skills = [];

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
  canMoveChecker(player);
}

function canMoveChecker(player) {
  const whiteSquares = document.querySelectorAll(".white-square");
  let startPlace = null;
  let destinationPlace = null;
  const kingPlaceRed = [1, 3, 5, 7];
  const kingPlaceBlue = [56, 58, 60, 62];

  function moveChecker() {
    const oldCheckerPlace = document.getElementById(startPlace);
    const newChecker = oldCheckerPlace.querySelector("div");
    const newCheckerPlace = document.getElementById(destinationPlace);
    const isKing = newChecker.classList.contains("king");

    if (isKing) {
      let topToBottomDirection =
        parseInt(destinationPlace) - parseInt(startPlace);
      let bottomToTopDirection =
        parseInt(startPlace) - parseInt(destinationPlace);

      let leftTop = topToBottomDirection / 7;
      let rightTop = topToBottomDirection / 9;
      let leftbottom = bottomToTopDirection / 9;

      const isBottomPlace = parseInt(startPlace) < parseInt(destinationPlace);

      if (isBottomPlace) {
        console.log("is not bottom");
        if (leftTop % 1 == 0) {
          console.log("Incorrect");
          let currentSquareID = parseInt(startPlace);
          let enemy = [];
          while (currentSquareID <= destinationPlace) {
            currentSquareID += 7;
            if (currentSquareID == destinationPlace) {
              if (enemy.length >= 2) break;
              if (enemy.length == 1) {
                console.log(enemy[0]);
                enemy[0].parentNode.removeChild(enemy[0]);
              }

              oldCheckerPlace.removeChild(newChecker);
              newCheckerPlace.appendChild(newChecker);
              newChecker.classList.remove("clickedChecker");
              player =
                player === "red-checker" ? "blue-checker" : "red-checker";
              break;
            }
            if (document.getElementById(currentSquareID).querySelector("div")) {
              enemy.push(
                document.getElementById(currentSquareID).querySelector("div")
              );
              console.log(enemy);
              continue;
            }
          }
        } else {
          let currentSquareID = parseInt(startPlace);
          let enemy = [];
          while (currentSquareID <= destinationPlace) {
            console.log(currentSquareID);
            currentSquareID += 9;
            if (currentSquareID == destinationPlace) {
              if (enemy.length >= 2) break;
              if (enemy.length == 1) {
                if (enemy[0].classList.contains(player)) break;
                console.log(enemy[0]);
                enemy[0].parentNode.removeChild(enemy[0]);
              }

              oldCheckerPlace.removeChild(newChecker);
              newCheckerPlace.appendChild(newChecker);
              newChecker.classList.remove("clickedChecker");
              player =
                player === "red-checker" ? "blue-checker" : "red-checker";
              break;
            }
            if (document.getElementById(currentSquareID).querySelector("div")) {
              enemy.push(
                document.getElementById(currentSquareID).querySelector("div")
              );
              console.log(enemy);
              continue;
            }
          }
        }
      }

      if (leftbottom % 1 == 0) {
        let currentSquareID = parseInt(startPlace);
        let enemy = [];
        while (currentSquareID >= destinationPlace) {
          console.log("start");
          currentSquareID -= 9;
          if (currentSquareID == destinationPlace) {
            if (enemy.length >= 2) break;
            if (enemy.length == 1) {
              console.log(enemy[0]);
              enemy[0].parentNode.removeChild(enemy[0]);
            }

            oldCheckerPlace.removeChild(newChecker);
            newCheckerPlace.appendChild(newChecker);
            newChecker.classList.remove("clickedChecker");
            player = player === "red-checker" ? "blue-checker" : "red-checker";
            break;
          }
          if (document.getElementById(currentSquareID).querySelector("div")) {
            enemy.push(
              document.getElementById(currentSquareID).querySelector("div")
            );
            console.log(enemy);
            continue;
          }
        }
      } else {
        let currentSquareID = parseInt(startPlace);
        let enemy = [];
        while (currentSquareID >= destinationPlace) {
          console.log("start");
          currentSquareID -= 7;
          if (currentSquareID == destinationPlace) {
            if (enemy.length >= 2) break;
            if (enemy.length == 1) {
              console.log(enemy[0]);
              enemy[0].parentNode.removeChild(enemy[0]);
            }

            oldCheckerPlace.removeChild(newChecker);
            newCheckerPlace.appendChild(newChecker);
            newChecker.classList.remove("clickedChecker");
            player = player === "red-checker" ? "blue-checker" : "red-checker";
            break;
          }
          if (document.getElementById(currentSquareID).querySelector("div")) {
            enemy.push(
              document.getElementById(currentSquareID).querySelector("div")
            );
            console.log(enemy);
            continue;
          }
        }
      }

      document
        .getElementById(parseInt(startPlace))
        .querySelector("div")
        .classList.remove("clickedChecker");

      return;
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
              if (checker.classList.contains("king")) {
                moveChecker();
              }

              if (canRedMove) {
                moveChecker();
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

                    moveChecker();
                  } else if (
                    leftNeighbor &&
                    parseInt(startPlace) - 9 === parseInt(destinationPlace) + 9
                  ) {
                    leftNeighbor.removeChild(leftNeighbor.querySelector("div"));

                    moveChecker();
                  }
                }
              }
            } else {
              if (checker.classList.contains("king")) {
                moveChecker();
              }
              if (canBlueMove) {
                moveChecker();
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
                    moveChecker();
                  } else if (
                    leftNeighbor &&
                    parseInt(startPlace) + 9 === parseInt(destinationPlace) - 9
                  ) {
                    leftNeighbor.removeChild(leftNeighbor.querySelector("div"));
                    moveChecker();
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

//!TODO: Implement skill into beKing function
function beKing(player, checker) {
  if (!checker.getAttribute("id") && !checker.classList.contains("king")) {
    const probabilities = [0.5, 0.4, 0.3, 0.2, 0.1];

    checker.classList.add("king");
  }
}

renderGame();
gameStart();

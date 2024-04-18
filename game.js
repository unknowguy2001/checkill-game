const board = document.getElementById("board");
const textPlayer = document.getElementById("text");
//* protection = can't captured with starndard piece
//* hunter = if can captured enemy, hunter will continuously move
//* revive = when enemy capture this piece will not die (just 1)
//* unstopable = Can capture multiple enemies in a row.
const skills = ["protection", "hunter", "revive", "unstopable"];

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
  textPlayer.innerHTML = `${player}`;
}

function canMoveChecker(player) {
  const whiteSquares = document.querySelectorAll(".white-square");
  let startPlace = null; //This variable will store the ID of the square that the chosen checker lives in before moving.
  let destinationPlace = null; //This variable will store the ID of the square that the checker will move.
  const kingPlaceRed = [1, 3, 5, 7]; // This variable stores the ID of the square; if the red checker moves in, that checker will be king.
  const kingPlaceBlue = [56, 58, 60, 62]; // This variable stores the ID of the square; if the blue checker moves in, that checker will be king.

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
      let leftbottom = bottomToTopDirection / 9;

      const isBottomPlace = parseInt(startPlace) < parseInt(destinationPlace);

      if (isBottomPlace) {
        if (leftTop % 1 == 0) {
          let currentSquareID = parseInt(startPlace);
          let enemy = [];
          while (currentSquareID <= destinationPlace) {
            currentSquareID += 7;
            if (currentSquareID == destinationPlace) {
              if (newChecker.classList.contains("unstopable")) {
                let isHasMyTeam = false;

                for (let i = 0; i < enemy.length; i++) {
                  if (enemy[i].classList.contains(player)) {
                    isHasMyTeam = true;
                  }
                }

                if (isHasMyTeam) break;

                enemy.forEach((e) => {
                  if (!e.classList.contains("revive")) {
                    e.remove();
                  }
                  if (e.classList.contains("revive")) removeRevive(e);
                });

                oldCheckerPlace.removeChild(newChecker);
                newCheckerPlace.appendChild(newChecker);
                newChecker.classList.remove("clickedChecker");

                player =
                  player === "red-checker" ? "blue-checker" : "red-checker";
                textPlayer.innerHTML = `${player}`;
                checkWinner();
                break;
              }
              if (enemy.length >= 2) break;
              if (enemy.length == 1) {
                // Capture enemy.

                if (enemy[0].classList.contains(player)) break;

                if (!enemy[0].classList.contains("revive")) {
                  enemy[0].remove();
                }

                if (enemy[0].classList.contains("revive")) {
                  removeRevive(enemy[0]);
                  enemy.pop();
                }

                if (enemy.length != 0) {
                  if (enemy[0]) {
                    enemy[0].remove();
                  }
                }
                console.log("continue");
                oldCheckerPlace.removeChild(newChecker);
                newCheckerPlace.appendChild(newChecker);
                newChecker.classList.remove("clickedChecker");
                checkWinner();
                if (newChecker.classList.contains("hunter")) {
                  checkWinner();
                  break;
                }
                player =
                  player === "red-checker" ? "blue-checker" : "red-checker";
                textPlayer.innerHTML = `${player}`;
                checkWinner();
                break;
              }

              oldCheckerPlace.removeChild(newChecker);
              newCheckerPlace.appendChild(newChecker);
              newChecker.classList.remove("clickedChecker");

              player =
                player === "red-checker" ? "blue-checker" : "red-checker";
              textPlayer.innerHTML = `${player}`;
              console.log("2" + player);
              break;
            }
            // Check if there is an enemy in the square that the king will move through.
            if (document.getElementById(currentSquareID).querySelector("div")) {
              enemy.push(
                // Store the ID of the square that the enemy lives in.
                document.getElementById(currentSquareID).querySelector("div")
              );
              continue;
            }
          }
        } else {
          console.log("spot");
          let currentSquareID = parseInt(startPlace);
          let enemy = [];

          while (currentSquareID <= destinationPlace) {
            currentSquareID += 9;

            if (newChecker.classList.contains("unstopable")) {
              let isHasMyTeam = false;

              for (let i = 0; i < enemy.length; i++) {
                if (enemy[i].classList.contains(player)) {
                  isHasMyTeam = true;
                }
              }
              if (isHasMyTeam) break;
              enemy.forEach((e) => {
                if (!e.classList.contains("revive")) {
                  e.remove();
                }

                if (e.classList.contains("revive")) removeRevive(e);
              });

              oldCheckerPlace.removeChild(newChecker);
              newCheckerPlace.appendChild(newChecker);
              newChecker.classList.remove("clickedChecker");

              player =
                player === "red-checker" ? "blue-checker" : "red-checker";
              textPlayer.innerHTML = `${player}`;
              checkWinner();
              break;
            }

            if (currentSquareID == destinationPlace) {
              if (enemy.length >= 2) break;

              if (enemy.length == 1) {
                // Capture enemy.
                if (enemy[0].classList.contains(player)) break;

                if (!enemy[0].classList.contains("revive")) {
                  enemy[0].remove();
                }

                if (enemy[0].classList.contains("revive")) {
                  removeRevive(enemy[0]);
                  enemy.pop();
                }

                oldCheckerPlace.removeChild(newChecker);
                newCheckerPlace.appendChild(newChecker);
                newChecker.classList.remove("clickedChecker");

                if (enemy.length != 0) enemy[0].remove();

                if (newChecker.classList.contains("hunter")) {
                  checkWinner();
                  break;
                }

                player =
                  player === "red-checker" ? "blue-checker" : "red-checker";
                textPlayer.innerHTML = `${player}`;
                checkWinner();
                break;
              }

              oldCheckerPlace.removeChild(newChecker);
              newCheckerPlace.appendChild(newChecker);
              newChecker.classList.remove("clickedChecker");

              player =
                player === "red-checker" ? "blue-checker" : "red-checker";
              textPlayer.innerHTML = `${player}`;
              checkWinner();
              break;
            }

            // Check if there is an enemy in the square that the king will move through.
            if (document.getElementById(currentSquareID).querySelector("div")) {
              enemy.push(
                // Store the ID of the square that the enemy lives in.
                document.getElementById(currentSquareID).querySelector("div")
              );

              continue;
            }
          }
        }
      }

      if (leftbottom % 1 == 0) {
        console.log("come");
        let currentSquareID = parseInt(startPlace);
        let enemy = [];
        while (currentSquareID >= destinationPlace) {
          currentSquareID -= 9;
          if (currentSquareID == destinationPlace) {
            if (newChecker.classList.contains("unstopable")) {
              let isHasMyTeam = false;

              for (let i = 0; i < enemy.length; i++) {
                if (enemy[i].classList.contains(player)) {
                  isHasMyTeam = true;
                }
              }
              if (isHasMyTeam) break;
              enemy.forEach((e) => {
                if (!e.classList.contains("revive")) {
                  e.remove();
                }

                if (e.classList.contains("revive")) removeRevive(e);
              });

              oldCheckerPlace.removeChild(newChecker);
              newCheckerPlace.appendChild(newChecker);
              newChecker.classList.remove("clickedChecker");

              player =
                player === "red-checker" ? "blue-checker" : "red-checker";
              textPlayer.innerHTML = `${player}`;
              break;
            }

            if (enemy.length >= 2) break;
            if (enemy.length == 1) {
              if (!enemy[0].classList.contains("revive")) {
                enemy[0].remove();
              }

              if (enemy[0].classList.contains("revive")) {
                removeRevive(enemy[0]);
                enemy.pop();
              }
              oldCheckerPlace.removeChild(newChecker);
              newCheckerPlace.appendChild(newChecker);
              newChecker.classList.remove("clickedChecker");

              if (enemy.length != 0) enemy[0].remove();

              if (newChecker.classList.contains("hunter")) {
                break;
              }

              player =
                player === "red-checker" ? "blue-checker" : "red-checker";
              textPlayer.innerHTML = `${player}`;
              break;
            }

            oldCheckerPlace.removeChild(newChecker);
            newCheckerPlace.appendChild(newChecker);
            newChecker.classList.remove("clickedChecker");
            player = player === "red-checker" ? "blue-checker" : "red-checker";
            textPlayer.innerHTML = `${player}`;
            break;
          }
          if (document.getElementById(currentSquareID).querySelector("div")) {
            enemy.push(
              document.getElementById(currentSquareID).querySelector("div")
            );
            continue;
          }
        }
      } else {
        let currentSquareID = parseInt(startPlace);
        let enemy = [];
        while (currentSquareID >= destinationPlace) {
          currentSquareID -= 7;
          if (currentSquareID == destinationPlace) {
            if (newChecker.classList.contains("unstopable")) {
              let isHasMyTeam = false;

              for (let i = 0; i < enemy.length; i++) {
                if (enemy[i].classList.contains(player)) {
                  isHasMyTeam = true;
                }
              }
              if (isHasMyTeam) break;
              enemy.forEach((e) => {
                if (!e.classList.contains("revive")) {
                  e.remove();
                }

                if (e.classList.contains("revive")) {
                  removeRevive(e);
                  enemy.shift();
                }
              });

              oldCheckerPlace.removeChild(newChecker);
              newCheckerPlace.appendChild(newChecker);
              newChecker.classList.remove("clickedChecker");

              player =
                player === "red-checker" ? "blue-checker" : "red-checker";
              break;
            }

            if (enemy.length >= 2) break;
            if (enemy.length == 1) {
              if (enemy[0].classList.contains(player)) break;

              if (!enemy[0].classList.contains("revive")) {
                enemy[0].remove();
              }

              if (enemy[0].classList.contains("revive")) {
                removeRevive(enemy[0]);
                enemy.pop();
              }

              oldCheckerPlace.removeChild(newChecker);
              newCheckerPlace.appendChild(newChecker);
              newChecker.classList.remove("clickedChecker");
              if (enemy.length != 0) enemy[0].remove();

              if (newChecker.classList.contains("hunter")) {
                break;
              }

              player =
                player === "red-checker" ? "blue-checker" : "red-checker";
              textPlayer.innerHTML = `${player}`;
              break;
            }

            oldCheckerPlace.removeChild(newChecker);
            newCheckerPlace.appendChild(newChecker);
            newChecker.classList.remove("clickedChecker");
            player = player === "red-checker" ? "blue-checker" : "red-checker";
            textPlayer.innerHTML = `${player}`;
            break;
          }
          if (document.getElementById(currentSquareID).querySelector("div")) {
            enemy.push(
              document.getElementById(currentSquareID).querySelector("div")
            );
            continue;
          }
        }
      }

      // Remove the clicked effect if the checker can't move.
      document
        .getElementById(parseInt(startPlace))
        .querySelector("div")
        .classList.remove("clickedChecker");
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
      beKing(skills, newChecker);
    }

    player = player === "red-checker" ? "blue-checker" : "red-checker";
    textPlayer.innerHTML = `${player}`;
    checkWinner();
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
                    if (
                      !rightNeighbor
                        .querySelector("div")
                        .classList.contains("protection")
                    ) {
                      if (rightNeighbor.classList.contains("revive")) {
                        removeRevive(rightNeighbor);
                      } else {
                        rightNeighbor.removeChild(
                          rightNeighbor.querySelector("div")
                        );
                      }

                      moveChecker();
                    }
                  } else if (
                    leftNeighbor &&
                    parseInt(startPlace) - 9 === parseInt(destinationPlace) + 9
                  ) {
                    if (
                      !leftNeighbor
                        .querySelector("div")
                        .classList.contains("protection")
                    ) {
                      if (leftNeighbor.classList.contains("revive")) {
                        removeRevive(leftNeighbor);
                      } else {
                        leftNeighbor.removeChild(
                          leftNeighbor.querySelector("div")
                        );
                      }

                      moveChecker();
                    }
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
                    if (
                      !rightNeighbor
                        .querySelector("div")
                        .classList.contains("protection")
                    ) {
                      if (rightNeighbor.classList.contains("revive")) {
                        removeRevive(rightNeighbor);
                      } else {
                        rightNeighbor.removeChild(
                          rightNeighbor.querySelector("div")
                        );
                      }

                      moveChecker();
                    }
                  } else if (
                    leftNeighbor &&
                    parseInt(startPlace) + 9 === parseInt(destinationPlace) - 9
                  ) {
                    if (
                      !leftNeighbor
                        .querySelector("div")
                        .classList.contains("protection")
                    ) {
                      if (leftNeighbor.classList.contains("revive")) {
                        removeRevive(leftNeighbor);
                      } else {
                        leftNeighbor.removeChild(
                          leftNeighbor.querySelector("div")
                        );
                      }
                      moveChecker();
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

function beKing(skills, checker) {
  if (!checker.classList.contains("king")) {
    const randomSkills = Math.round(Math.random() * 4);

    switch (randomSkills) {
      case 1:
        checker.classList.add("king");
        let protection = document.createElement("p");
        protection.innerHTML = "P";
        checker.appendChild(protection);
        checker.classList.add(skills[0]);
        break;
      case 2:
        checker.classList.add("king");
        let hunter = document.createElement("p");
        hunter.innerHTML = "H";
        checker.appendChild(hunter);
        checker.classList.add(skills[1]);
        break;
      case 3:
        checker.classList.add("king");
        let revive = document.createElement("p");
        revive.innerHTML = "R";
        checker.appendChild(revive);
        checker.classList.add(skills[2]);
        break;
      case 4:
        checker.classList.add("king");
        let unstopable = document.createElement("p");
        unstopable.innerHTML = "U";
        checker.appendChild(unstopable);
        checker.classList.add(skills[3]);
        break;
      default:
        checker.classList.add("king");
        break;
    }
  }
}

function removeRevive(element) {
  if (element.classList.contains("revive")) {
    element.classList.remove("revive");
  }
}

function checkWinner() {
  console.log("check");
  const whiteSquares = document.querySelectorAll(".white-square");

  let red = null;
  let blue = null;
  whiteSquares.forEach((whiteSquare) => {
    let div = whiteSquare.querySelector("div");
    console.log(div);
    if (div != null) {
      if (div.classList.contains("red-checker")) {
        red += 1;
      } else {
        blue += 1;
      }
    }
  });
  console.log(red);
  console.log(blue);
  if (red == null) {
    alert("Player blue win!");
    location.reload();
  }
  if (blue == null) {
    alert("Player red win!");
    location.reload();
  }
}

renderGame();
gameStart();

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
    let square = document.createElement("div");

    square.classList.add("square");
    square.setAttribute("id", i);

    isBlack
      ? square.classList.add("black-square")
      : square.classList.add("white-square");

    board.appendChild(square);

    if (starter[i] != "") {
      let checkerPiece = document.createElement("div");
      checkerPiece.classList.add("checker-piece");

      checkerPiece.classList.add(
        starter[i] == "X" ? "blue-checker" : "red-checker"
      );

      square.appendChild(checkerPiece);
    }

    if (
      i == 7 ||
      i == 15 ||
      i == 23 ||
      i == 31 ||
      i == 39 ||
      i == 47 ||
      i == 55
    ) {
      continue;
    }
    isBlack = !isBlack;
  }
};
function gameStart() {
  movement(player);
}

function movement(player) {
  let whiteSquares = document.querySelectorAll(".white-square");
  let startPlace = null;
  let destinationPlace = null;

  function move() {
    let oldCheckerPlace = document.getElementById(startPlace);
    let newChecker = oldCheckerPlace.querySelector("div");
    let newCheckerPlace = document.getElementById(destinationPlace);

    oldCheckerPlace.removeChild(oldCheckerPlace.querySelector("div"));
    newCheckerPlace.appendChild(newChecker);
    newChecker.classList.remove("clickedChecker");
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

            //!TODO: implement capture function
            let canRedCapture =
              destinationPlace - startPlace == -14 ||
              destinationPlace - startPlace == -18;

            let canBlueCapture =
              destinationPlace - startPlace == 14 ||
              destinationPlace - startPlace == 18;

            if (player == "red-checker") {
              if (canRedMove) {
                move();
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
                move();
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

renderGame();
gameStart();

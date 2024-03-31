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
  let whiteSquares = document.querySelectorAll(".white-square");
  let startPlace = null;
  let destinationPlace = null;

  whiteSquares.forEach((whiteSquare) => {
    whiteSquare.addEventListener("click", () => {
      if (whiteSquare.querySelector("div")) {
        let clicked = document.querySelectorAll(".clickedChecker");

        clicked.forEach((element) => {
          element.classList.remove("clickedChecker");
        });

        startPlace = whiteSquare.getAttribute("id");

        let selectedChecker = document
          .getElementById(startPlace)
          .querySelector("div");

        console.log(player);
        let isCurrentPlayer = selectedChecker.classList.contains(player);
        console.log(isCurrentPlayer);

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
            //!TODO:(bug) It can move to any square.
            if (startPlace - destinationPlace <= 10) {
              let oldCheckerPlace = document.getElementById(startPlace);
              let newChecker = oldCheckerPlace.querySelector("div");
              let newCheckerPlace = document.getElementById(destinationPlace);

              oldCheckerPlace.removeChild(oldCheckerPlace.querySelector("div"));
              newCheckerPlace.appendChild(newChecker);
              newChecker.classList.remove("clickedChecker");
              player == "red-checker"
                ? (player = "blue-checker")
                : "red-checker";
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

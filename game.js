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

let firstPlayer = "red-checker";

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
  let goalPlace = null;

  whiteSquares.forEach((whiteSquare) => {
    whiteSquare.addEventListener("click", () => {
      if (whiteSquare.querySelector("div")) {
        startPlace = whiteSquare.getAttribute("id");
        goalPlace = null;
      } else {
        goalPlace = whiteSquare.getAttribute("id");

        if (startPlace !== null) {
          if (startPlace - goalPlace <= 10) {
            //!TODO: create movement
          }
        }
        startPlace = null;
      }
    });
  });
}

renderGame();
gameStart();

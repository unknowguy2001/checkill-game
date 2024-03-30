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

      if (starter[i] == "X") {
        checkerPiece.classList.add("red-checker");
      } else {
        checkerPiece.classList.add("blue-checker");
      }

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
renderGame();

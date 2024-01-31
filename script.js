let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset");
let newButton = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".messageContainer");
let message = document.querySelector("#Message");

let turnO = true;

const winPossitions = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    resetButton.innerText = `Reset Game`;
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWiner();
    checkDraw();
  });
});

const resetGame = () => {
  turnO = true;
  enebledBoxes();
  resetButton.innerText = `Reset Game`;
};

const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enebledBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    msgContainer.classList.add("hide");
  }
};

const showWiner = (winner) => {
  msgContainer.innerText = `Congratulation!, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

const showDraw = () => {
  msgContainer.innerText = `Match Draw`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

const checkWiner = () => {
  for (possition of winPossitions) {
    let pos1Val = boxes[possition[0]].innerText;
    let pos2Val = boxes[possition[1]].innerText;
    let pos3Val = boxes[possition[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWiner(pos1Val);
        resetButton.innerText = `New Game`;
      }
    }
  }
};

const checkDraw = () => {
  const winnerDetected = winPossitions.some(possition => {
    const pos1Val = boxes[possition[0]].innerText;
    const pos2Val = boxes[possition[1]].innerText;
    const pos3Val = boxes[possition[2]].innerText;

    return pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val;
  });

  if (!winnerDetected) {
    const isDraw = Array.from(boxes).every(box => box.innerText !== "");

    if (isDraw) {
      showDraw();
      resetButton.innerText = "New Game";
    }
  }
};


resetButton.addEventListener("click", resetGame);

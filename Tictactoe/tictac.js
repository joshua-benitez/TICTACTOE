var currentPlayer = "X"; // Start with player X
let winner = null; // Track the winner
let moves = 0; // Count the number of moves made
let gameOver = false; // Track if the game is over
let disabled = false;
const boxes = document.querySelectorAll(".box"); // Select all boxes
const status = document.querySelector(".status"); // Select the status element
const resetBtn = document.getElementById("reset"); // Select the reset button

// Add event listeners to each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.textContent !== "" || gameOver) return;

    box.textContent = currentPlayer;
    box.disabled = true;
    moves++;

    checkWinner(); 

    if (!gameOver) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      status.textContent = `Current Player: ${currentPlayer}`;
    }
  });
});
// Function to check for a winner or a draw
function checkWinner() {
  const boxValues = Array.from(boxes).map((box) => box.textContent);
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (
      boxValues[a] !== "" &&
      boxValues[a] === boxValues[b] &&
      boxValues[a] === boxValues[c]
    ) {
      gameOver = true;
      winner = boxValues[a];
      status.textContent = `${winner} wins!`;
      return;
    }
  }

  if (moves === 9 && !winner) {
    gameOver = true;
    status.textContent = "It's a draw!";
  }
}

//Function to reset the game
resetBtn.addEventListener("click", resetGame);
function resetGame() {
  currentPlayer = "X";
  winner = null;
  moves = 0;
  gameOver = false;
  status.textContent = `Current Player: ${currentPlayer}`;
  boxes.forEach((box) => {
    box.textContent = "";
    box.disabled = false;
  });
  status.textContent = `Current Player:  ${currentPlayer}`;
}

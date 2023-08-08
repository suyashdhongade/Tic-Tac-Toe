let currentPlayer = "X";
let gameOver = false;

const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

function makeMove(row, col) {
  if (!gameOver && board[row][col] === "") {
    board[row][col] = currentPlayer;
    document.getElementById("board").children[row * 3 + col].textContent = currentPlayer;
    checkWinner();
    togglePlayer();
  }
}

function checkWinner() {
  const winningCombinations = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      board[a[0]][a[1]] !== "" &&
      board[a[0]][a[1]] === board[b[0]][b[1]] &&
      board[a[0]][a[1]] === board[c[0]][c[1]]
    ) {
      document.getElementById("status").textContent = `Player ${currentPlayer} wins!`;
      gameOver = true;
      return;
    }
  }

  if (!gameOver && isBoardFull()) {
    document.getElementById("status").textContent = "It's a draw!";
    gameOver = true;
  }
}

function isBoardFull() {
  return board.every(row => row.every(cell => cell !== ""));
}

function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("game-board");
  const currentPlayerDisplay = document.getElementById("current-player");
  const xScoreDisplay = document.getElementById("x-score");
  const oScoreDisplay = document.getElementById("o-score");
  const resetButton = document.getElementById("reset");

  let boardState = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let gameActive = true;
  letscores = { X: 0, O: 0 };

  function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-index", i);
      cell.addEventListener("click", handleCellClick);
      board.appendChild(cell);
    }
  }

  function handleCellClick(e) {
    const index = e.target.getAttribute("data-index");
    if (boardState[index] !== "" || !gameActive) return;

    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      changePlayer();
    }
  }

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombinations.some((combination) => {
      const [a, b, c] = combination;
      return (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      );
    });
  }

  function isDraw() {
    return boardState.every((cell) => cell !== "");
  }

  function endGame(draw) {
    gameActive = false;

    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => cell.classList.add("disabled"));

    if (draw) {
      currentPlayerDisplay.textContent = "It's a Draw!";
      cells.forEach((cell) => cell.classList.add("draw"));
    } else {
      currentPlayerDisplay.textContent = `${currentPlayer} Wins!`;
      scores[currentPlayer]++;
      updateScores();

      cells.forEach((cell, index) => {
        if (boardState[index] === currentPlayer) {
          cell.classList.add("win");
        }
      });
    }
  }

  function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayerDisplay.textContent = `${currentPlayer}'s Turn`;
  }

  function updateScores() {
    xScoreDisplay.textContent = scores.X;
    oScoreDisplay.textContent = scores.O;
  }

  function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    currentPlayerDisplay.textContent = "X's Turn";

    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.className = "cell";
    });
  }

  resetButton.addEventListener("click", resetGame);
  createBoard();
});

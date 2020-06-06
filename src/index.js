const numRows = 3;
const numCols = numRows;
let board = new Array(numRows * numCols);
let player = "X";
let numMarked = 0;
let gameEnded = false;

window.updateBoard = function(cell, id) {
  if (gameEnded) return;
  if (isMarked(cell)) {
    alert("You must select an empty cell on the board!");
    return;
  }
  cell.innerText = player;
  board[id - 1] = player;
  numMarked++;
  updateGameStatus();
  if (!gameEnded) {
    player = switchPlayer();
    updatePlayerDOM(player);
  }
};

function updateGameStatus() {
  if (isWinner(player)) {
    announceWinner(player);
    gameEnded = true;
  } else if (numMarked === numRows * numCols) {
    makeAnnouncement("Its a draw!");
    gameEnded = true;
  }
}

function isMarked(cell) {
  return cell.innerText;
}

function isWinner(player) {
  if (checkRows(player)) return true;
  if (checkColumns(player)) return true;
  if (checkDiagonals(player)) return true;
  return false;
}

function checkRows(player) {
  for (let row = 0; row < numRows; row++) {
    if (checkRow(row, player)) return true;
  }
  return false;
}

function checkRow(row, player) {
  for (let col = 0; col < numCols; col++) {
    let index = row * numRows + col;
    if (board[index] !== player) return false;
  }
  return true;
}

function checkColumns(player) {
  for (let col = 0; col < numCols; col++) {
    if (checkColumn(col, player)) return true;
  }
  return false;
}

function checkColumn(col, player) {
  for (let row = 0; row < numRows; row++) {
    let index = row * numRows + col;
    if (board[index] !== player) return false;
  }
  return true;
}

function checkDiagonals(player) {
  if (checkMajorDiagonal(player)) return true;
  if (checkMinorDiagonal(player)) return true;
  return false;
}

function checkMajorDiagonal(player) {
  for (let row = 0; row < numRows; row++) {
    let col = row;
    let index = row * numRows + col;
    if (board[index] !== player) return false;
  }
  return true;
}

function checkMinorDiagonal(player) {
  for (let row = 0; row < numRows; row++) {
    let col = numCols - row - 1;
    let index = row * numRows + col;
    if (board[index] !== player) return false;
  }
  return true;
}

function announceWinner(player) {
  let playerName = player === "X" ? "Cross" : "Nought";
  makeAnnouncement(playerName + " won!");
}

function makeAnnouncement(message) {
  let playerDOM = document.getElementById("player");
  playerDOM.innerText = message + "\nRefresh for a new game!";
  alert(message);
}

function updatePlayerDOM(player) {
  let playerName = player === "X" ? "Cross" : "Nought";
  let playerDOM = document.getElementById("player");
  playerDOM.innerText = playerName + "'s turn!";
}

function switchPlayer() {
  return player === "X" ? "O" : "X";
}

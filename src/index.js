const gameStatusDiv = document.getElementById('status');
const p1ScoreDiv = document.getElementById('playerOneScore');
const p2ScoreDiv = document.getElementById('playerTwoScore');
const boxes = document.getElementsByClassName('block');
const restartButton = document.getElementsByClassName('restart')[0];
const boxesArray = Array.from(boxes);

const winningCombinations = [
  // Horizontal Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Vertical Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = 'x';
let player1_moves = [];
let player2_moves = [];
let player1_score = 0;
let player2_score = 0;
let gameEnded = false;
let visited = [];

boxesArray.forEach((box, index) => {
  box.id = index;
  box.addEventListener('click', updateBlock);
});

//Updates block on click,  keeps track of player's moves, and checks for a winner on each click
function updateBlock(e) {
  if (gameEnded) return;
  const target = e.target;
  const cellId = Number(target.id);
  if (visited.includes(cellId)) return;
  visited.push(cellId);
  if (currentPlayer === 'x') {
    player1_moves.push(cellId);
    target.innerText = 'x';
  } else {
    player2_moves.push(cellId);
    target.innerText = 'o';
  }
  const winner = checkWinner();
  currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
  gameStatus(currentPlayer, winner);
}

function checkWinner() {
  const cellsComplete = visited.length === 9;
  let p1Wins;
  let p2Wins;
  for (let i = 0; i < winningCombinations.length; i++) {
    p1Wins = winningCombinations[i].every((element) =>
      player1_moves.includes(element)
    );
    p2Wins = winningCombinations[i].every((element) =>
      player2_moves.includes(element)
    );
    if (p1Wins) {
      gameEnded = true;
      return 'x';
    } else if (p2Wins) {
      gameEnded = true;
      return 'o';
    } else if (cellsComplete) {
      gameEnded = true;
      return 'draw';
    }
  }

  return '';
}
function gameStatus(currentPlayer, winner) {
  switch (winner) {
    case 'x':
      gameStatusDiv.innerText = 'Player One wins!';
      player1_score++;
      p1ScoreDiv.textContent = player1_score;
      break;
    case 'o':
      gameStatusDiv.innerText = 'Player Two wins!';
      player2_score++;
      p2ScoreDiv.innerText = player2_score;
      break;
    case 'draw':
      gameStatusDiv.innerHTML = 'Draw!';
      break;
    default:
      gameStatusDiv.innerText = `${
        currentPlayer === 'x' ? 'Player one' : 'Player two'
      }'s turn`;
      break;
  }
}

function restartGame() {
  boxesArray.forEach((element) => (element.innerText = ''));
  currentPlayer = 'x';
  player1_moves = [];
  player2_moves = [];
  gameEnded = false;
  visited = [];
}

restartButton.addEventListener('click', restartGame);
restartGame();

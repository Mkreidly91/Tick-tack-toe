const boxes = document.getElementsByClassName('block');
const arrayOfBoxes = Array.from(boxes);

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
let gameEnded = false;
let visited = [];

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
  checkWinner();
  currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
}

function checkWinner() {
  const cellsComplete = visited.length === 9;
  for (let i = 0; i < winningCombinations.length; i++) {
    const p1Wins = winningCombinations[i].every((element) =>
      player1_moves.includes(element)
    );
    const p2Wins = winningCombinations[i].every((element) =>
      player2_moves.includes(element)
    );
    console.log(p1Wins, p2Wins);
    if (p1Wins) {
      gameEnded = true;
      console.log('X wins');
      return 'Player one wins';
    } else if (p2Wins) {
      gameEnded = true;
      console.log('O wins');
      return 'Player two wins';
    } else if (cellsComplete) {
      gameEnded = true;
      console.log('draw');
      return 'Draw';
    }
    return '';
  }
}
function restartGame() {
  arrayOfBoxes.forEach((box, index) => {
    box.id = index;
    box.addEventListener('click', updateBlock);
  });
  currentPlayer = 'x';
  player1_moves = [];
  player2_moves = [];
  gameEnded = false;
  visited = [];
}
restartGame();

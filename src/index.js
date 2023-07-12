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

let turn = 'x';
let player1_moves = [];
let player2_moves = [];
let gameEnded = false;
let visited = [];

function updateBlock(e) {
  if (gameEnded) return;
  const target = e.target;
  const cellId = Number(target.id);
  if (visited.includes(cellId)) return;
  visited.push(cellId);
  if (turn === 'x') {
    player1_moves.push(cellId);
    target.innerText = 'x';
  } else {
    player2_moves.push(cellId);
    target.innerText = 'o';
  }
  checkWinner();
  turn = turn === 'x' ? 'o' : 'x';
}
function checkWinner() {
  console.log(player1_moves);
  console.log(player2_moves);
  for (let i = 0; i < winningCombinations.length; i++) {
    const p1Wins = winningCombinations[i].every((element) =>
      player1_moves.includes(element)
    );
    const p2Wins = winningCombinations[i].every((element) =>
      player2_moves.includes(element)
    );
    console.log(p1Wins, p2Wins);
    if (p1Wins) {
      console.log('Player 1 wins,game ended');
      gameEnded = true;
    }
    if (p2Wins) {
      console.log('Player 2 wins,game ended');
      gameEnded = true;
    }
  }
}
function restartGame() {
  arrayOfBoxes.forEach((box, index) => {
    box.id = index;
    box.addEventListener('click', updateBlock);
  });
  turn = 'x';
  player1_moves = [];
  player2_moves = [];
  gameEnded = false;
  visited = [];
}
restartGame();
// // vs AI
// function addTack(id) {
//   const unvisited = visited.filter((element) => element !== id);
//   //choose a random element in unvisited
//   const randomIndex = Math.floor(Math.random() * array.length);
//   visited.push();
//   boxes[randomIndex].innerHTML = tick;
// }

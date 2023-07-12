let boxes = document.getElementsByClassName('block');

for (let i = 0; i < boxes.length; i++) {
  boxes[i].id = i;
  // boxes[i].innerText = i;
}

const winningCombinations = [
  // '012',
  // '345',
  // '678',
  // '036',
  // '147',
  // '258',
  // '048',
  // '246',
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

let visited = [];

function updateBlock(e) {
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
      console.log('Player 1 wins');
    }
    if (p2Wins) {
      console.log('Player 2 wins');
    }
  }

  //   if (player1_moves.includes(winningCombinations[i])) {
  //   } else if (player2_moves.includes(winningCombinations[i])) {
  //   }
  // }
}
function gameStatus() {}

document.addEventListener('click', updateBlock);
// // vs AI
// function addTack(id) {
//   const unvisited = visited.filter((element) => element !== id);
//   //choose a random element in unvisited
//   const randomIndex = Math.floor(Math.random() * array.length);
//   visited.push();
//   boxes[randomIndex].innerHTML = tick;
// }

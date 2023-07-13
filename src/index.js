const game_status_div = document.getElementById('status');
const p1_score_div = document.getElementById('playerOneScore');
const p2_score_div = document.getElementById('playerTwoScore');
const boxes = document.querySelectorAll('.block');
const restart_button = document.getElementById('restart');

const winning_combinations = [
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

let current_player = 'x';
let player1_moves = [];
let player2_moves = [];
let player1_score = 0;
let player2_score = 0;
let game_ended = false;
let visited = [];

boxes.forEach((box, index) => {
  box.id = index;
  box.addEventListener('click', updateBlock);
});

//Updates block on click,  keeps track of player's moves, and checks for a winner on each click
function updateBlock(e) {
  if (game_ended) return;
  const target = e.target;
  const cell_id = Number(target.id);
  if (visited.includes(cell_id)) return;
  visited.push(cell_id);
  if (current_player === 'x') {
    player1_moves.push(cell_id);
    target.innerText = 'x';
  } else {
    player2_moves.push(cell_id);
    target.innerText = 'o';
  }
  const winner = checkWinner();
  current_player = current_player === 'x' ? 'o' : 'x';
  gameStatus(current_player, winner);
}

function checkWinner() {
  const blocks_filled = visited.length === 9;
  let p1Wins;
  let p2Wins;
  for (let i = 0; i < winning_combinations.length; i++) {
    p1Wins = winning_combinations[i].every((element) =>
      player1_moves.includes(element)
    );
    p2Wins = winning_combinations[i].every((element) =>
      player2_moves.includes(element)
    );
    if (p1Wins) {
      game_ended = true;
      return 'x';
    } else if (p2Wins) {
      game_ended = true;
      return 'o';
    }
  }
  if (blocks_filled) {
    game_ended = true;
    return 'draw';
  }
  return '';
}
function gameStatus(current_player, winner) {
  switch (winner) {
    case 'x':
      game_status_div.innerText = 'Player One wins!';
      player1_score++;
      p1_score_div.textContent = player1_score;
      break;
    case 'o':
      game_status_div.innerText = 'Player Two wins!';
      player2_score++;
      p2_score_div.innerText = player2_score;
      break;
    case 'draw':
      game_status_div.innerHTML = 'Draw!';
      break;
    default:
      game_status_div.innerText = `${
        current_player === 'x' ? 'Player one' : 'Player two'
      }'s turn`;
      break;
  }
}

function restartGame() {
  boxes.forEach((element) => (element.innerText = ''));
  current_player = 'x';
  player1_moves = [];
  player2_moves = [];
  game_ended = false;
  visited = [];
}

restart_button.addEventListener('click', restartGame);
restartGame();

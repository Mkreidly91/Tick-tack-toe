let boxes = document.getElementsByClassName('block');

for (let i = 0; i < boxes.length; i++) {
  boxes[i].id = i;
  // boxes[i].innerText = i;
}

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

let visited = [];
let Tick = [];
let Tack = [];
function addTick(e) {
  const target = e.value.target;
  visited.push(target.id);

  addTack(target.id);
}

// vs AI
function addTack(id) {
  const unvisited = visited.filter((element) => element !== id);
  //choose a random element in unvisited
  const randomIndex = Math.floor(Math.random() * array.length);
  visited.push();
  boxes[randomIndex].innerHTML = tick;
}

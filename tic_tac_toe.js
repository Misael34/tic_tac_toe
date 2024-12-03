const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart');

let isXTurn = true; // X empieza
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Inicializar el juego
function startGame() {
  isXTurn = true;
  messageElement.textContent = '¡Es el turno de X!';
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
}

// Manejar clic en una celda
function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'x' : 'o';
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

// Colocar marca en la celda
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();
}

// Verificar si hay un ganador
function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

// Verificar si es empate
function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

// Terminar el juego
function endGame(draw) {
  if (draw) {
    messageElement.textContent = '¡Es un empate!';
  } else {
    messageElement.textContent = `¡${isXTurn ? 'X' : 'O'} gana!`;
  }
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

// Cambiar turno
function swapTurns() {
  isXTurn = !isXTurn;
  messageElement.textContent = `¡Es el turno de ${isXTurn ? 'X' : 'O'}!`;
}

// Reiniciar el juego
restartButton.addEventListener('click', startGame);

// Comenzar el juego al cargar la página
startGame();
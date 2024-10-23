const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const resultado = document.getElementById('resultado');
let currentPlayer = "X";

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!cell.textContent && currentPlayer === "X") {
            cell.textContent = currentPlayer;
            cell.style.color = "red"; // Color rojo para el jugador
            if (checkWin()) {
                resultado.textContent = "Ganaste!!";
                document.getElementById("audioGanador").play();
                return;
            }
            currentPlayer = 'O';
            setTimeout(() => {
                playComputerTurn();
            }, 500); // Espero medio segundo antes de que juegue la computadora
        }
    });
});

function playComputerTurn() {
    const emptyCells = Array.from(cells).filter(cell => !cell.textContent);
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerCell = emptyCells[randomIndex];
        computerCell.textContent = currentPlayer;
        computerCell.style.color = "lime"; // Color verde para la computadora
        if (checkWin()) {
            resultado.textContent = "Perdiste!!";
            document.getElementById("audioPerdedor").play();
        } else if (isDraw()) {
            resultado.textContent = "¡Empate!";
            document.getElementById("audioEmpate").play();
        } else {
            currentPlayer = "X";
        }
    }
}

function checkWin() {
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

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return cells[a].textContent && 
               cells[a].textContent === cells[b].textContent &&
               cells[a].textContent === cells[c].textContent;
    });
}

function isDraw() {
    return Array.from(cells).every(cell => cell.textContent);
}

resetButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = ""; // Borra color de las celdas
    });
    currentPlayer = 'X';
    resultado.textContent = ""; // Limpia el mensaje de resultado
});

// Seleccionamos los elementos del DOM que vamos a utilizar.
const playBroad = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score');
const higScoreElement = document.querySelector('.high-score');
const controls = document.querySelectorAll('.controls i');

// Inicializamos las variables del juego.
let gameOver = false;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem('high-score') || 0;

// Mostramos el puntaje más alto en el DOM.
higScoreElement.textContent = `High Score: ${highScore}`;

// Inicializamos las variables de la comida y la serpiente.
let foodX,
    foodY;

let snakeX = 5,
    snakeY = 10,
    snakeBody = [];

let velocityX = 0,
    velocityY = 0;

// Función para cambiar la posición de la comida de forma aleatoria.
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

// Definimos las direcciones posibles para la serpiente.
const direcciones = {
    ARROWUP: 'ArrowUp',
    ARROWLEFT: 'ArrowLeft',
    ARROWDOWN: 'ArrowDown',
    ARROWRIGHT: 'ArrowRight'
};

// Función para manejar el fin del juego.
const handleGameOver = () => {
    alert('game Over! por favor preciona ok para una nueva partida');
    clearInterval(setIntervalId);
    location.reload();
};

// Función principal del juego.
const initGame = () => {
    // Si el juego terminó, manejamos el fin del juego.
    if (gameOver) return handleGameOver();

    // Inicializamos el marcado HTML del tablero de juego.
    let htmlMarkup = `<div class='food' style='grid-area: ${foodX} / ${foodY}'></div>`;

    /* Si la serpiente come la comida, cambiamos la posición de la comida,  aumentamos el tamaño de la serpiente y actualizamos los puntajes. */
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();

        snakeBody.push([foodX, foodY]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem('high-score', highScore);

        scoreElement.textContent = `Score: ${score}`;
        higScoreElement.textContent = `High Score ${highScore}`;
    };

    // Actualizamos la posición de la serpiente.
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeY, snakeX];

    snakeX += velocityX;
    snakeY += velocityY;

    // Si la serpiente sale del tablero, terminamos el juego.
    if (snakeX <= 0 || snakeY > 30 || snakeY <= 0 || snakeY > 30) gameOver = true;

    // Actualizamos el marcado HTML del tablero de juego con la serpiente.
    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class='head' style='grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}'></div>`;

        // Si la serpiente se choca consigo misma, terminamos el juego.
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && i !== 0 && snakeBody[0][0] === snakeBody[i][0]) gameOver = true;
    };

    // Actualizamos el tablero de juego en el DOM.
    playBroad.innerHTML = htmlMarkup;
};

// Función para cambiar la dirección de la serpiente.
const changeDirection = (e) => {
    const { key } = e;

    // Cambiamos la velocidad de la serpiente basado en la tecla presionada,  Evitamos que la serpiente se mueva en la dirección opuesta instantáneamente.
    if (key === direcciones.ARROWUP && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (key === direcciones.ARROWDOWN && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    } else if (key === direcciones.ARROWLEFT && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (key === direcciones.ARROWRIGHT && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    };
};

// Añadimos un evento de click a cada control para cambiar la dirección de la serpiente.
[...controls].map(key => {
    key.addEventListener('click', () => changeDirection({ key: key.dataset.key }));
});

// Inicializamos la posición de la comida y empezamos el juego.
changeFoodPosition();
setIntervalId = setInterval(initGame, 125);
// Añadimos un evento de tecla presionada para cambiar la dirección de la serpiente.
document.addEventListener('keydown', changeDirection);
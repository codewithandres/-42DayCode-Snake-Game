
const playBroad = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score');
const higScoreElement = document.querySelector('.high-score');

let gameOver = false;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem('high-score') || 0;

higScoreElement.textContent = `High Score: ${highScore}`;

let foodX,
    foodY;

let snakeX = 5,
    snakeY = 10,
    snakeBody = [];

let velocityX = 0,
    velocityY = 0;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const direcciones = {
    ARROWUP: 'ArrowUp',
    ARROWLEFT: 'ArrowLeft',
    ARROWDOWN: 'ArrowDown',
    ARROWRIGHT: 'ArrowRight'
};

const handleGameOver = () => {
    alert('game Over! por favor preciona ok para una nueva partida');
    clearInterval(setIntervalId);
    location.reload();
};

const initGame = () => {
    if (gameOver) return handleGameOver();

    let htmlMarkup = `<div class='food' style='grid-area: ${foodX} / ${foodY}'></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();

        snakeBody.push([foodX, foodY]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem('high-score', highScore);

        scoreElement.textContent = `Score: ${score}`;
        higScoreElement.textContent = `High Score ${highScore}`;
    };

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeY, snakeX];

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeY > 30 || snakeY <= 0 || snakeY > 30) gameOver = true;

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class='head' style='grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}'></div>`;

        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && i !== 0 && snakeBody[0][0] === snakeBody[i][0]) gameOver = true;
    };

    playBroad.innerHTML = htmlMarkup;
};

const changeDirection = (e) => {
    const { key } = e;

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

changeFoodPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener('keydown', changeDirection);
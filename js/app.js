
const playBroad = document.querySelector('.play-board');

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

const initGame = () => {
    let htmlMarkup = `<div class='food' style='grid-area: ${foodX} / ${foodY}'></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition()
        snakeBody.push([foodX, foodY]);
        console.log({ snakeBody })
    };

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeY, snakeX];

    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class='head' style='grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}'></div>`;
    };

    playBroad.innerHTML = htmlMarkup;
};

const changeDirection = (e) => {
    const { key } = e;

    if (key === direcciones.ARROWUP) {
        velocityX = -1;
        velocityY = 0;
    } else if (key === direcciones.ARROWDOWN) {
        velocityX = 1;
        velocityY = 0;
    } else if (key === direcciones.ARROWLEFT) {
        velocityX = 0;
        velocityY = -1;
    } else if (key === direcciones.ARROWRIGHT) {
        velocityX = 0;
        velocityY = 1;
    };
};

changeFoodPosition();
setInterval(initGame, 125);
document.addEventListener('keydown', changeDirection);
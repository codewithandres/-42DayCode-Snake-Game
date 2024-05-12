
const playBroad = document.querySelector('.play-board');

let foodX,
    foodY;

let snakeX = 5,
    snakeY = 10;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const initGame = () => {
    let htmlMarkup = `<div class='food' style='grid-area: ${foodX} / ${foodY}'></div>`;
    htmlMarkup += `<div class='head' style='grid-area: ${snakeX} / ${snakeY}'></div>`;

    playBroad.innerHTML = htmlMarkup;

};

changeFoodPosition();
initGame();
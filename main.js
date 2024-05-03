const LeftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const startBtn = document.querySelector(".start-btn");
const startScreen = document.querySelector(".start");

// CONSTANTS
const SPEED = 30;
const LEFT_LIMIT = 120;
const RIGHT_LIMIT = 570;

// VARIABLES
let started = false;
let moveLeftTimer;
let moveRightTimer;
let gameTimer;
const audio = new Audio("./game-music.mp3");

document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowLeft") {
    moveLeft()
  } else if (event.key == "ArrowRight") {
    moveRight()
  }
});

const board = document.querySelector(".board");
let scrollValue = 10;
setInterval(() => {
  scrollValue = scrollValue + 5;
  board.style.backgroundPosition = "0 " + scrollValue;
}, 20);


startBtn.addEventListener("click", () => {
  started = true;
  board.style.display = "block";
  startScreen.style.display = "none";
  resumeGame();
});

LeftBtn.addEventListener("touchstart", function (e) {
  e.preventDefault();
  moveLeftTimer = setInterval(() => {
    moveLeft()
  }, 100);
});

LeftBtn.addEventListener("touchend", function (e) {
  e.preventDefault();
  clearInterval(moveLeftTimer);
});

LeftBtn.addEventListener("mousedown", function (e) {
  e.preventDefault();
  moveLeftTimer = setInterval(() => {
    moveLeft()
  }, 100);
});

LeftBtn.addEventListener("mouseup", function (e) {
  e.preventDefault();
  clearInterval(moveLeftTimer);
});


rightBtn.addEventListener("touchstart", function (e) {
  e.preventDefault();
  moveRightTimer = setInterval(() => {
    moveRight()
  }, 100);
});

rightBtn.addEventListener("touchend", function (e) {
  e.preventDefault();
  clearInterval(moveRightTimer);
});

rightBtn.addEventListener("mousedown", function (e) {
  e.preventDefault();
  moveRightTimer = setInterval(() => {
    moveRight()
  }, 100);
});

rightBtn.addEventListener("mouseup", function (e) {
  e.preventDefault();
  clearInterval(moveRightTimer);
});


function moveLeft(){
  let turtle = document.querySelector(".turtle");
  if (turtle.offsetLeft - SPEED < 120) {
    return;
  }
  turtle.style.left = turtle.offsetLeft - SPEED;
}

function moveRight(){
  let turtle = document.querySelector(".turtle");
  if (turtle.offsetLeft + SPEED > 570) {
    return;
  }
  turtle.style.left = turtle.offsetLeft + SPEED;
}


// stopGame on window blur
window.addEventListener("blur", () => {
  pauseGame();
});

// resumeGame on window focus
window.addEventListener("focus", () => {
  resumeGame();
});


// UTILS

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function increaseScore() {
  const score = document.querySelector(".score");
  score.innerText = parseInt(score.innerText) + 1;
}

function increaseSpeed() {
  SPEED += 5;
}

function removeCarElement(car) {
  car.offsetParent.removeChild(car);
}

function resumeGame() {
  startMusic();
  gameTimer = setInterval(() => {
    createEnemyCar();
  }, 2000);
}

function pauseGame() {
  clearInterval(gameTimer);
  stopMusic();
}

function createEnemyCar() {
  const car = document.createElement("div");
  car.classList.add("car");
  board.appendChild(car);
  car.style.left = getRandomNumber(120, 540);
  let interval = setInterval(() => {
    car.style.top = car.offsetTop + 5;
    if (car.offsetTop > board.offsetHeight) {
      removeCarElement(car);
      increaseScore();
      clearInterval(interval);
    }
  }, 10);
}


function startMusic() {
  audio.loop = true;
  audio.play();
}

function stopMusic() {
  audio.pause();
}

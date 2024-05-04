const LeftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const startBtn = document.querySelector(".start-btn");
const startScreen = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause-btn");
const timer = document.querySelector(".timer");
const gameOverScreen = document.querySelector(".game-over");
const restartBtn = document.querySelector(".restart-btn");

// CONSTANTS
const SPEED = 30;
const LEFT_LIMIT = 120;
const RIGHT_LIMIT = 570;

// VARIABLES
let started = false;
let moveLeftTimer;
let moveRightTimer;
let gameTimer;
let time = 0;
let startTime = 0;
let intervals = [];
let carSpeed = 10;
let addNewCarInterval = 2000;
let increaseSpeedInterval;

const audio = new Audio("./game-music.mp3");

document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowLeft") {
    moveLeft();
  } else if (event.key == "ArrowRight") {
    moveRight();
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
    moveLeft();
  }, 100);
});

LeftBtn.addEventListener("touchend", function (e) {
  e.preventDefault();
  clearInterval(moveLeftTimer);
});

LeftBtn.addEventListener("mousedown", function (e) {
  e.preventDefault();
  moveLeftTimer = setInterval(() => {
    moveLeft();
  }, 100);
});

LeftBtn.addEventListener("mouseup", function (e) {
  e.preventDefault();
  clearInterval(moveLeftTimer);
});

rightBtn.addEventListener("touchstart", function (e) {
  e.preventDefault();
  moveRightTimer = setInterval(() => {
    moveRight();
  }, 100);
});

rightBtn.addEventListener("touchend", function (e) {
  e.preventDefault();
  clearInterval(moveRightTimer);
});

rightBtn.addEventListener("mousedown", function (e) {
  e.preventDefault();
  moveRightTimer = setInterval(() => {
    moveRight();
  }, 100);
});

rightBtn.addEventListener("mouseup", function (e) {
  e.preventDefault();
  clearInterval(moveRightTimer);
});

restartBtn.addEventListener("click", () => {
  gameOverScreen.style.display = "none";
  board.style.display = "block";
  const score = document.querySelector(".score");
  score.innerText = 0;
  const timer = document.querySelector(".timer");
  timer.innerText = "0:0:0";
  started = true;
  SPEED = 30;
  resumeGame();
});

function moveLeft() {
  let turtle = document.querySelector(".turtle");
  if (turtle.offsetLeft - SPEED < 120) {
    return;
  }
  turtle.style.left = turtle.offsetLeft - SPEED;
}

function moveRight() {
  let turtle = document.querySelector(".turtle");
  if (turtle.offsetLeft + SPEED > 570) {
    return;
  }
  turtle.style.left = turtle.offsetLeft + SPEED;
}

// // stopGame on window blur
// window.addEventListener("blur", () => {
//   pauseGame();
// });

// // resumeGame on window focus
// window.addEventListener("focus", () => {
//   resumeGame();
// });

pauseBtn.addEventListener("click", () => {
  pauseGame();
  startScreen.style.display = "block";
  board.style.display = "none";
  started = false;
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
  startTime = new Date().getTime();
  gameTimer = setInterval(() => {
    createEnemyCar();
  }, addNewCarInterval);
  setInterval(() => {
    updateTimer();
    // increase car speed every 10 seconds
    if (time % 10000 === 0) {
      increaseCarSpeed();
    }
    // reduce new car interval every 20 seconds
    if (time % 20000 === 0) {
      reduceNewCarInterval();
    }
  }, 10);
}

function pauseGame() {
  clearInterval(gameTimer);
  stopMusic();
}

function createEnemyCar() {
  const car = document.createElement("div");
  car.classList.add("car");
  board.appendChild(car);
  car.style.left = getRandomNumber(160, 540);
  let interval = setInterval(() => {
    car.style.top = car.offsetTop + carSpeed;
    checkCollision();
    if (car.offsetTop > board.offsetHeight) {
      removeCarElement(car);
      increaseScore();
      clearInterval(interval);
    }
  }, 20);
  intervals.push(interval);
}

function startMusic() {
  audio.play();
  audio.loop = true;
}

function stopMusic() {
  audio.pause();
}

function updateTimer() {
  const currentTime = new Date().getTime();
  time = currentTime - startTime;
  timer.innerText = formatTimer(time);
}

function formatTimer(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);
  return `${minutes}:${seconds}:${milliseconds}`;
}

function checkCollision() {
  const turtle = document.querySelector(".turtle");
  const cars = document.querySelectorAll(".car");
  cars.forEach((car) => {
    if (isColliding(turtle, car)) {
      playCrashSound();
      gameOver();
    }
  });
}
function isColliding(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();
  const tolerance = 10;
  return !(
    aRect.top + aRect.height - tolerance < bRect.top ||
    aRect.top + tolerance > bRect.top + bRect.height ||
    aRect.left + aRect.width - tolerance < bRect.left ||
    aRect.left + tolerance > bRect.left + bRect.width
  );
}

function gameOver() {
  clearInterval(gameTimer);
  clearInterval(moveLeftTimer);
  clearInterval(moveRightTimer);
  intervals.forEach((interval) => {
    clearInterval(interval);
  });
  stopMusic();
  gameOverScreen.style.display = "block";
  board.style.display = "none";
  started = false;
  const finalScore = document.querySelector(".final-score");
  finalScore.innerText = document.querySelector(".score").innerText;
}

function playCrashSound() {
  const audio = new Audio("./clank-car-crash-collision.mp3");
  audio.play();
}

function increaseCarSpeed() {
  carSpeed += 1;
}


function reduceNewCarInterval() {
  addNewCarInterval -= 100;
}

function getCurrentHighScore() {
  return localStorage.getItem("high-score") || 0;
}

function setHighScore(score) {
  localStorage.setItem("high-score", score);
}

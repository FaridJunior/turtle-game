const LeftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const startBtn = document.querySelector(".start-btn");
const startScreen = document.querySelector(".start");

// CONSTANTS
const SPEED = 30;

// VARIABLES
let started = false;
let moveLeftTimer;
let moveRightTimer;

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
});

rightBtn.addEventListener("touchstart", function (e) {
  moveLeftTimer = setInterval(() => {
    moveLeft()
  }, 100);
});

LeftBtn.addEventListener("touchend", function (e) {
  clearInterval(moveLeftTimer);
});

LeftBtn.addEventListener("mousedown", function (e) {
  moveLeftTimer = setInterval(() => {
    moveLeft()
  }, 100);
});

LeftBtn.addEventListener("mouseup", function (e) {
  clearInterval(moveLeftTimer);
});


rightBtn.addEventListener("touchstart", function (e) {
  moveRightTimer = setInterval(() => {
    moveRight()
  }, 100);
});

rightBtn.addEventListener("touchend", function (e) {
  clearInterval(moveRightTimer);
});

rightBtn.addEventListener("mousedown", function (e) {
  moveRightTimer = setInterval(() => {
    moveRight()
  }, 100);
});

rightBtn.addEventListener("mouseup", function (e) {
  clearInterval(moveRightTimer);
});

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(() => {
  const car = document.createElement("div");
  car.classList.add("car");
  board.appendChild(car);
  car.style.left = getRandomNumber(150, 540);

  setInterval(() => {
    car.style.top = car.offsetTop + 5;
    if (car.offsetTop > board.offsetHeight) {
      car.offsetParent.removeChild(car);
    }
  }, 10);
}, 5000);



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


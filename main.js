let started = false;
let scorevalue = 0;

document.addEventListener("keydown", (event) => {
  let turtle = document.querySelector(".turtle");
  let score = document.querySelector("h2");
  let turtleRect = turtle.getBoundingClientRect();

  console.log({ turtleRect });
  scorevalue = scorevalue + 1;

  score.innerHTML = "score: " + scorevalue;
  if (event.key == "ArrowLeft") {
    console.log(turtle.offsetLeft);
    if (turtle.offsetLeft - 10 < 100) {
      return;
    }
    turtle.style.left = turtle.offsetLeft - 10;
    turtle.style.transform = "rotateY(180deg)";
  } else if (event.key == "ArrowRight") {
    if (turtle.offsetLeft + 10 > 570) {
      return;
    }
    turtle.style.left = turtle.offsetLeft + 10;
    turtle.style.transform = "rotateY(0deg";
  }
});

const board = document.querySelector(".board");
let scrollValue = 10;
setInterval(() => {
  scrollValue = scrollValue + 5;
  board.style.backgroundPosition = "0 " + scrollValue;
}, 20);

const startBtn = document.querySelector(".start-btn");
const startScreen = document.querySelector(".start");

startBtn.addEventListener("click", () => {
  started = true;
  board.style.display = "block";
  startScreen.style.display = "none";
});

const LeftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");

LeftBtn.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  let turtle = document.querySelector(".turtle");
  let score = document.querySelector("h2");
  let turtleRect = turtle.getBoundingClientRect();

  console.log({ turtleRect });
  scorevalue = scorevalue + 1;
  score.innerHTML = "score: " + scorevalue;
  if (turtle.offsetLeft - 10 < 100) {
    return;
  }
  turtle.style.left = turtle.offsetLeft - 10;
  turtle.style.transform = "rotateY(180deg)";
});

rightBtn.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  let turtle = document.querySelector(".turtle");
  let score = document.querySelector("h2");
  let turtleRect = turtle.getBoundingClientRect();

  console.log({ turtleRect });
  scorevalue = scorevalue + 1;
  score.innerHTML = "score: " + scorevalue;
  if (turtle.offsetLeft + 10 > 570) {
    return;
  }
  turtle.style.left = turtle.offsetLeft + 10;
  turtle.style.transform = "rotateY(0deg";
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
    car.style.top = car.offsetTop + 10;
    let turtle = document.querySelector(".turtle");
    if (car.offsetTop > board.offsetHeight) {
      car.offsetParent.removeChild(car);
    }
  }, 20);
}, 5000);

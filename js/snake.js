const canvas = document.getElementById("game"),
  ctx = canvas.getContext("2d"),
  ground = new Image(),
  foodImg = new Image();

ground.src = "img/field.png";
foodImg.src = "img/strawberry_my.png";

// create the unit and score
const box = 32;
let score = 0;
let dir;

let dead = new Audio();
let down = new Audio();
let eat = new Audio();
let left = new Audio();
let right = new Audio();
let up = new Audio();

dead.src = "audio/dead.mp3";
down.src = "audio/down.mp3";
eat.src = "audio/eat.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
up.src = "audio/up.mp3";

// create the snake
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

// create the food random position
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

document.addEventListener("keydown", direction);

function direction(event) {
  let key = event.keyCode;

  if (key == 37 && dir != "right") {
    dir = "left";
    left.play();
  } else if (key == 38 && dir != "down") {
    dir = "up";
    up.play();
  } else if (key == 39 && dir != "left") {
    dir = "right";
    right.play();
  } else if (key == 40 && dir != "up") {
    dir = "down";
    down.play();
  }
}
// check collision function
function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      return true;
    }
  }
  return false;
}

//draw everything to the canvas

function drawGame() {
  ctx.drawImage(ground, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "#CE593F" : "#FFFF00";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

  }

  ctx.drawImage(foodImg, food.x, food.y);

  ctx.fillStyle = "rgb(229, 248, 59)";
  ctx.font = "50px Arial";
  ctx.fillText(score, box * 2.5, box * 1.7);

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // if snake eats the food
  if (snakeX == food.x && snakeY == food.y) {
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
    score++;
    eat.play();
    // we don't remove the tail
  } else {
    // remove the tail
    snake.pop();
  }

  // direction
  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;

  //add new head
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  // game over
  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 17 * box ||
    eatTail(newHead, snake)) {
    clearInterval(game);
    dead.play();
  }
  snake.unshift(newHead);
}

// call draw function every 100ms
let game = setInterval(drawGame, 100);
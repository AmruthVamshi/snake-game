let direction = 'right'
document.addEventListener('keydown', event => {
  if (event.keyCode == 37 && direction != 'right') direction = 'left'
  if (event.keyCode == 38 && direction != 'down') direction = 'up'
  if (event.keyCode == 39 && direction != 'left') direction = 'right'
  if (event.keyCode == 40 && direction != 'up') direction = 'down'
})
const canvas = document.querySelector('canvas.canv')
const score_tag = document.getElementById('score')
const ctx = canvas.getContext('2d')
const background = new Image()
background.src = 'snakeback.jpg'
var box; var snake; var bait; var score = 0; var gameState; var bait_cordinates
class food {
  	rand_food () {
  		return Math.floor(Math.random() * (19)) * 32
  	}
}
function intialSetup () {
  box = { width: 32, height: 32 }
  snake = []
  snake[0] = { x: box.width, y: box.height }
  snake[1] = { x: snake[0].x - box.width, y: box.height }
  bait = new food()
  bait_cordinates = { x: bait.rand_food(), y: bait.rand_food() }
  score = 0
  gameState = 'playing'
  direction = 'right'
}
intialSetup()
function drawSnake () {
  for (i = 0; i < snake.length; i++) {
  		ctx.beginPath()
    	ctx.fillStyle = i == 0 ? 'yellow' : 'white'
    	ctx.fillRect(snake[i].x, snake[i].y, box.width, box.height)
    	ctx.strokeStyle = 'red'
    	ctx.strokeRect(snake[i].x, snake[i].y, box.width, box.height)
    	ctx.closePath()
  }
}
function drawBait () {
  ctx.beginPath()
  	ctx.fillStyle = 'red'
  	ctx.fillRect(bait_cordinates.x, bait_cordinates.y, box.width, box.height)
  	ctx.strokeStyle = 'white'
  	ctx.strokeRect(bait_cordinates.x, bait_cordinates.y, box.width, box.height)
  	ctx.closePath()
}
function move () {
  if (direction == 'right') {
    snake.unshift({ x: snake[0].x + 32, y: snake[0].y })
    snake.pop()
  }
  if (direction == 'left') {
    snake.unshift({ x: snake[0].x - 32, y: snake[0].y })
    snake.pop()
  }
  if (direction == 'up') {
    snake.unshift({ x: snake[0].x, y: snake[0].y - 32 })
    snake.pop()
  }
  if (direction == 'down') {
    snake.unshift({ x: snake[0].x, y: snake[0].y + 32 })
    snake.pop()
  }
}
const extendSnake = () => {
  if (direction == 'right') {
    snake.unshift({ x: snake[0].x + 32, y: snake[0].y })
  }
  if (direction == 'left') {
    snake.unshift({ x: snake[0].x - 32, y: snake[0].y })
  }
  if (direction == 'up') {
    snake.unshift({ x: snake[0].x, y: snake[0].y - 32 })
  }
  if (direction == 'down') {
    snake.unshift({ x: snake[0].x, y: snake[0].y + 32 })
  }
}
function foodEaten () {
  if (snake[0].x == bait_cordinates.x && snake[0].y == bait_cordinates.y) {
    score++
    bait = new food()
    bait_cordinates = { x: bait.rand_food(), y: bait.rand_food() }
    extendSnake()
  }
}
function gameEnded () {
  if (snake[0].x >= 608 || snake[0].y >= 608 || snake[0].x < 0 || snake[0].y < 0) {
    return true
  }
  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      return true
    }
  }
  return false
}
var interval
function start () {
  interval = setInterval(() => {
  		ctx.drawImage(background, 0, 0)
  		drawSnake()
  		drawBait()
  		move()
  		if (gameEnded()) {
  			gameState = 'ended'
  			clearInterval(interval)
  		}
  		foodEaten()
  		score_tag.innerHTML = `<p>${score}</p>`
  }, 100)
}
start()
function startagain () {
  intialSetup()
  start()
}
function pause () {
  clearInterval(interval)
}
function resume () {
  start()
}

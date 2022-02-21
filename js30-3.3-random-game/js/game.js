const scoreView = document.querySelector('.header__score-text')
const scoresView = document.querySelector('.scores')
const gameOverView = document.querySelector('.game-over')

const scoresBtn = document.querySelector('.header__btn-scores')
const resetBtn = document.querySelector('.header__btn-reset')
const scoresCloseBtn = scoresView.querySelector('.scores__btn-close')

const gameBox = document.querySelector('.game-box')
const ctx = gameBox.getContext('2d');

const ground = new Image()
ground.src = './img/canvas-background.png'

const food = new Image()
food.src = './img/apple-24.png'

const cellSize = 24

let score = 0

const getFoodXY = (coord) => {
    if (coord === 'x') {
        return Math.floor(Math.random() * 16 + 1) * cellSize
    }

    if (coord === 'y') {
        return Math.floor(Math.random() * 16 + 1) * cellSize
    }
}

const foodXY = {
    x: getFoodXY('x'),
    y: getFoodXY('y'),
}

let snakeXY = []

snakeXY[0] = {
    x: 8 * cellSize,
    y: 8 * cellSize,
}

let dir

const direction = (key) => {
    if (key === 'ArrowLeft' && dir !== 'ArrowRight') {
        dir = key
    }

    if (key === 'ArrowUp' && dir !== 'ArrowDown') {
        dir = key
    }

    if (key === 'ArrowRight' && dir !== 'ArrowLeft') {
        dir = key
    }

    if (key === 'ArrowDown' && dir !== 'ArrowUp') {
        dir = key
    }
}

document.addEventListener('keydown', (e) => direction(e.key))

const eatTail = (head, bodyArray) => {
    bodyArray.forEach(body => {
        if (head.x === body.x && head.y === body.y) {
            clearInterval(game)
        }
    })
}

const drawGame = () => {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(food, foodXY.x, foodXY.y)

    snakeXY.forEach((snake, index) => {
        ctx.fillStyle = index === 0 ? 'red' : 'green'
        ctx.fillRect(snake.x, snake.y, cellSize, cellSize)
    })

    scoreView.textContent = score.toString()

    let snakeX = snakeXY[0].x
    let snakeY = snakeXY[0].y

    if (snakeX === foodXY.x && snakeY === foodXY.y) {
        score++
        foodXY.x = getFoodXY('x')
        foodXY.y = getFoodXY('y')
    } else {
        snakeXY.pop()
    }

    if (snakeX <  cellSize || snakeX > cellSize * 16 || snakeY < cellSize || snakeY > cellSize * 16) {
        clearInterval(game)
    }

    if (dir === 'ArrowLeft') snakeX -= cellSize
    if (dir === 'ArrowRight') snakeX += cellSize
    if (dir === 'ArrowUp') snakeY -= cellSize
    if (dir === 'ArrowDown') snakeY += cellSize

    const newHeadSnakeXY = {
        x: snakeX,
        y: snakeY,
    }

    eatTail(newHeadSnakeXY, snakeXY)

    snakeXY.unshift(newHeadSnakeXY)
}

const game = setInterval(drawGame, 200)


scoresBtn.addEventListener('click', () => {
    scoresView.style.display = 'flex'
})

scoresCloseBtn.addEventListener('click', () => {
    scoresView.style.display = 'none'
})

resetBtn.addEventListener('click', () => {
    location.reload()
})
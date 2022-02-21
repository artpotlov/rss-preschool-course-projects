const container = document.querySelector('.container')
const scoreView = container.querySelector('.header__score-text')

const scoresBtn = container.querySelector('.header__btn-scores')
const resetBtn = container.querySelector('.header__btn-reset')

const gameBox = container.querySelector('.game-box')
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
            saveScores(score)
            clearInterval(game)
            showGameOverView(score)
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
        saveScores(score)
        clearInterval(game)
        showGameOverView(score)
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

const game = setInterval(drawGame, 170)

const getScores = () => {
    if (!!localStorage.getItem('gameScores')) {
        const arr = []
        localStorage.gameScores.split(',').forEach(e => {
            arr.push(Number(e))
        })
        return arr
    } else {
        return []
    }
}

const saveScores = (score) => {
    if (score > 0) {
        const name = 'gameScores'
        let arr = []
        
        if (!localStorage.getItem('gameScores')) {
            localStorage.setItem(name, score)
            return
        }

        if (localStorage.getItem(name).length > 1) {
            localStorage.getItem(name).split(',').forEach(e => {
                arr.push(Number(e))
            })
            arr.push(score)
        }

        if (localStorage.getItem(name).length === 1) {
            arr.push(Number(localStorage.getItem(name)))
            arr.push(score)
        }

        arr.sort((a, b) => b - a)

        if (arr.length > 10) {
            arr = arr.slice(0, 10)
        }

        localStorage.removeItem(name)
        localStorage.setItem(name, arr.toString())
    }
}

const showScoresView = () => {
    const scores = getScores();
    let items = '<li class="scores__item">The best players not found</li>'
    if (scores.length > 0) {
        items = scores.map(e => `<li class="scores__item">${e} ${e === 1 ? 'point' : 'points'}</li>`).join('\n')
    }
    const scoresViewTemplate = 
    `<div class="scores">
    <h2 class="scores__title">Scores</h2>
    <ul class="scores__items">
        ${items}
    </ul>
    <button class="scores__btn-close">Close</button>
    </div>`
    container.insertAdjacentHTML('beforeend', scoresViewTemplate)

    const scoresCloseBtn = container.querySelector('.scores__btn-close')
    scoresCloseBtn.addEventListener('click', () => {
        container.querySelector('.scores').remove()
    })
}

const showGameOverView = (score) => {
    const gameOverView = 
        `<div class="game-over">
        <h2 class="game-over__title">Game over</h2>
        <h3 class="game-over__text">Your points: ${score}</h3>
        <button class="game-over__btn-play">Play again</button>
        </div>`

        container.insertAdjacentHTML('beforeend', gameOverView)

        const playAgainBtn = container.querySelector('.game-over__btn-play')
        playAgainBtn.addEventListener('click', () => {
            location.reload()
        })
}


scoresBtn.addEventListener('click', () => {
    showScoresView()
})

resetBtn.addEventListener('click', () => {
    saveScores(score)
    location.reload()
})
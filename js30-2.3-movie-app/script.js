const toggleCardDesc = (card) => {
    const cardDescription = card.querySelector('.card__description')
    if (!cardDescription.classList.contains("card__description--on")) {
        cardDescription.classList.add('card__description--on')
    } else {
        cardDescription.classList.remove('card__description--on')
    }
}

const getMovies = async(url) => {
    const res = await fetch(url)
    return res.json()
}

const createCard = (cardsContainer, imageUrl, title, vote, description) => {
    const card = `<div class="card cards__item">
                    <img src="https://image.tmdb.org/t/p/w1280/${imageUrl}" alt="${title} poster" class="card__poster">
                    <div class="card__header">
                        <h3 class="card__title">${title}</h3>
                        <div class="card__raiting"><span>${vote}</span></div>
                    </div>
                    <div class="card__description">
                        <h4>Overview</h4>
                        <p>${description}</p>
                    </div>
                </div>`
    cardsContainer.insertAdjacentHTML('beforeend', card)
}

const cardsContainter = document.querySelector('.cards')

getMovies('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c')
    .then(data => {
        data.results.map(movie => {
            createCard(cardsContainter, movie.backdrop_path, movie.title, movie.vote_average, movie.overview)
    })

    const cards = document.querySelectorAll('.card')
    cards.forEach(card => card.addEventListener('mouseover', () => toggleCardDesc(card)))
    cards.forEach(card => card.addEventListener('mouseout', () => toggleCardDesc(card)))
})

const inputSearchField = document.querySelector('.header__input')
const inputSearchButton = document.querySelector('.header__btn-search')

const removeCards = (cards) => {
    cards.forEach(card => {
        card.remove()
    })
}

inputSearchButton.addEventListener('click', () => {
    if(inputSearchField.value !== ''){
        const request = `https://api.themoviedb.org/3/search/movie?query=${inputSearchField.value}&api_key=3fd2be6f0c70a2a598f084ddfb75487c`
        getMovies(request).then(data => {
            if(data.results.length > 0) {
                const card = document.querySelectorAll('.card')
                removeCards(card)
                data.results.map(movie => {
                    createCard(cardsContainter, movie.backdrop_path, movie.title, movie.vote_average, movie.overview)
                })
                const cards = document.querySelectorAll('.card')
                cards.forEach(card => card.addEventListener('mouseover', () => toggleCardDesc(card)))
                cards.forEach(card => card.addEventListener('mouseout', () => toggleCardDesc(card)))
            } else {
                alert('Ничего не найдено')
            }
        })
    }
})

inputSearchField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if(inputSearchField.value !== ''){
            const request = `https://api.themoviedb.org/3/search/movie?query=${inputSearchField.value}&api_key=3fd2be6f0c70a2a598f084ddfb75487c`
            getMovies(request).then(data => {
                if(data.results.length > 0) {
                    const card = document.querySelectorAll('.card')
                    removeCards(card)
                    data.results.map(movie => {
                        createCard(cardsContainter, movie.backdrop_path, movie.title, movie.vote_average, movie.overview)
                    })
                    const cards = document.querySelectorAll('.card')
                    cards.forEach(card => card.addEventListener('mouseover', () => toggleCardDesc(card)))
                    cards.forEach(card => card.addEventListener('mouseout', () => toggleCardDesc(card)))
                } else {
                    alert('Ничего не найдено')
                }
            })
        }
    }
})








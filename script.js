const board = document.querySelector('.board')
const cards = document.querySelectorAll('.card')
const playerElement = document.querySelector('.player')
const scoreboard = document.querySelector('.scoreboard')
const resetButton = document.querySelector('.resetButton')
const winner = document.querySelector('.winner')

let player = 'x'
let count = 0
const cardsMatch = [ [0,1,2], [3,4,5], [6,7,8],
                     [0,3,6], [1,4,7], [2,5,8],
                     [0,4,8], [2,4,6] ];


resetButton.addEventListener('click', reset)

function reset() {
    count = 0
    player = 'x'
    playerElement.innerText = player  
    cards.forEach( card => {
        card.innerHTML = ''
        card.classList.remove('active')
    })
    board.addEventListener('click', handleBoardClick)
    scoreboard.style.display = 'none'   
}

function handleBoardClick(card) {
    const playerO = '<span class="fontawesome-circle-blank player-o"></span>'
    const playerX = '<span class="fontawesome-remove player-x"></span>'

    if(card.target.className === 'card'){
        card.target.innerHTML = (player === 'x') ? playerX : playerO
        card.target.classList.add('active')
        count++

        (!isWinner()) && (player = (player === 'x') ? 'o' : 'x')
        playerElement.innerText = player  
    }
}

function checkCardsMatch() {
    let match = false
    cardsMatch.forEach( sequence => {
        if(cards[sequence[0]].innerHTML === '') return

        if (cards[sequence[0]].innerHTML === cards[sequence[1]].innerHTML && 
            cards[sequence[0]].innerHTML === cards[sequence[2]].innerHTML) {

            cards[sequence[0]].firstChild.classList.add('match')
            cards[sequence[1]].firstChild.classList.add('match')
            cards[sequence[2]].firstChild.classList.add('match')
                
            match = true
        }
    })
    return match  
}

function isWinner() {
    const match = checkCardsMatch()
    const tied = (count === 9 && !match)

    if(match || tied) {
        board.removeEventListener('click', handleBoardClick)
        scoreboard.style.display = 'flex'
        winner.innerText = match ? `Vencedor: Jogador ${player}` : 'Empate' 
        return true
    }
    return false
}

reset();
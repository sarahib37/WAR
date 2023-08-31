const cardsContainer = document.getElementById('cards')
const titleEl = document.getElementById('title')
const computerScore = document.getElementById('computer-score')
const myScore = document.getElementById('my-score')
let deckId
let deckValue1
let deckValue2
let computer = 0
let player = 0


document.addEventListener('click', (e) => {
    if(e.target.id == 'new-deck'){
        newDeck()
    }

    if(e.target.id == 'draw-btn'){
        drawBtn()
    }
})



async function newDeck(){
    const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    const data = await res.json()
    document.getElementById('remaining').innerText = `Remaining cards: ${data.remaining}`
    deckId = data.deck_id
    document.getElementById('draw-btn').disabled = false
}



async function drawBtn(){
    
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    const dataCards = data.cards
    cardsContainer.children[0].innerHTML = `
        <img src=${dataCards[0].image} class='card-img'>
    `
    cardsContainer.children[1].innerHTML = `
        <img src=${dataCards[1].image} class='card-img'>
    `
    deckValue1 = dataCards[0].value
    deckValue2 = dataCards[1].value

    document.getElementById('remaining').innerText = `Remaining cards: ${data.remaining}`
    checkWinner()
    if(!data.remaining){
        const roundResult = deckValue1 > deckValue2 ? "Computer Wins!" : deckValue1 < deckValue2 ? "You Win!" : "It's a tie!"
        titleEl.innerText = roundResult
        document.getElementById('draw-btn').disabled = true
    }
}


function checkWinner(){
    deckValue1 == "JACK" ? deckValue1 = 11 : deckValue1 == "QUEEN" ? deckValue1 = 12 : deckValue1 == "KING" ? deckValue1 = 13 : 
    deckValue1 == "ACE" ? deckValue1 = 14 : deckValue1 == Number(deckValue1)

    deckValue2 == "JACK" ? deckValue2 = 11 : deckValue2 == "QUEEN" ? deckValue2 = 12 : deckValue2 == "KING" ? deckValue2 = 13 : 
    deckValue2 == "ACE" ? deckValue2 = 14 : deckValue2 == Number(deckValue2)

    if(deckValue1 > deckValue2){
        computer++
    } 
    else if(deckValue1 < deckValue2){
        player++
    }

    computerScore.innerText = `Computer Score: ${computer}`
    myScore.innerText = `My Score: ${player}`

    
}
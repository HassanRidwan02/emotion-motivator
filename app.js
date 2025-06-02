import { quotesData } from "/data.js";

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
uuidv4();

let emotionDiv = document.getElementById('emotion-div')
const getEmotionBtn = document.getElementById('get-emotion')
let quoteModal = document.getElementById("quote-modal")
let formData = document.getElementById('form-data')

// const userName = new FormData(formData).get('fullName')
// console.log(userName)

function getEmotions(quotes) {
    let quotesArray = []
    for (let eachQuote of quotes){
        for (let emotions of eachQuote.emotionTags){
            if(!quotesArray.includes(emotions)){
                quotesArray.push(emotions)
            }
        }
    }
    return quotesArray
}

function render(){
    let html = ``
    const emotionArray = getEmotions(quotesData)
    for (let emotion of emotionArray){
        html += `
            <div class='emotion-list'>
                <label for="${emotion}">${emotion}</label>
                <input 
                type='radio'
                name='emotions'
                id='${emotion}'
                value=${emotion}>
            </div>
        `
    }
    emotionDiv.innerHTML = html
    
    
}

render()


getEmotionBtn.addEventListener('click', getMatchEmotion)

function getMatchEmotion(){
    const userName = new FormData(formData).get('fullName')
    const selected = document.querySelector('input[type="radio"]:checked')
    if (selected){
        const selectedEmotion = selected.value
        const matchArray = quotesData.filter(quote => {
            return quote.emotionTags.includes(selectedEmotion)
        })
        if (matchArray.length == 1){
            const oneQuote = matchArray[0].quote
            quoteModal.innerHTML = `
            <p>Na'am, ${userName}</p>
            <p>${oneQuote}</p>
            <button id='close-btn'>Close btn</button>`
            quoteModal.style.display = 'block'
        }
        else {
            let randomNumber = Math.floor(Math.random() * matchArray.length)
            const oneRandomQuote =  matchArray[randomNumber].quote
             quoteModal.innerHTML = `
             <p>Na'am, ${userName}</p>
             <p>${oneRandomQuote}</p>
             <button id='close-btn'>Close btn</button>`
             quoteModal.style.display = 'block'
        }


    }
    
    let closeBtn = document.getElementById('close-btn')
    closeBtn.addEventListener('click', ()=>{
        quoteModal.style.display = 'none'
    })
}




'use strict'

const CLICK_EVENT_NAME = 'click';
const KEYPRESS_EVENT_NAME = 'keypress';

const CARD_BACK_DIRECTORY = './img/card-back/';
const CARD_FRONT_DIRECTORY = './img/card-front/';

const RECORD_LIST_KEY_IN_LOCAL_STORAGE = 'RecordList';

const CARD_BACK = {
    BLACK_WHITE: CARD_BACK_DIRECTORY + 'black-white.png',
    HEARTSTONE_GOLD: CARD_BACK_DIRECTORY + 'heartstone-gold.png',
    LAVA_FUNNEL: CARD_BACK_DIRECTORY + 'lava-funnel.jpg',
    RED_WHITE: CARD_BACK_DIRECTORY + 'red-white.png',
    ROBOT: CARD_BACK_DIRECTORY + 'robot.jpg'
}

const CARD_POOL = [];
for(let i = 1; i <= 18; i++){
    CARD_POOL[i-1] = i;
}

class Difficulty{
    constructor(name, width, height, element){
        this.name = name;
        this.width= width;
        this.height = height;
        this.element = element;
    }
}

class Player{
    constructor(firstName, secondName, email){
        this.firstName = firstName;
        this.secondName = secondName;
        this.email = email;
    }
}

class Result{
    constructor(player, difficulty, time){
        this.player = player;
        this.difficulty = difficulty;
        this.time = time;
    }
}

class Card{
    constructor(divId, url, value){
        this.divId = 'card-' + divId;
        this.url = url;
        this.value = value;
        this.isInGame = true;
    }
}

const DIFFICULTY = {
    LOW: new Difficulty('low', 5, 2, document.getElementById('low')),
    MEDIUM: new Difficulty('medium', 6, 3, document.getElementById('medium')),
    HIGH: new Difficulty('high', 9, 4, document.getElementById('high'))
}



let setRecordsArraysToLocalStorage = (difficulty) => {
    if(!window.localStorage.getItem(difficulty + RECORD_LIST_KEY_IN_LOCAL_STORAGE)){
        window.localStorage.setItem(difficulty + RECORD_LIST_KEY_IN_LOCAL_STORAGE, JSON.stringify([]));
    }
}

for (let key in DIFFICULTY){
    setRecordsArraysToLocalStorage(DIFFICULTY[key].name);
}

let currentCardBack = CARD_BACK.RED_WHITE;
let currentDifficulty = DIFFICULTY.LOW;
let currentPlayer;
let firstCard, secondCard;
let cards = [];
let clickable = true;


//menu buttons

let setMenuButtonsListeners = (event, elementId, fn, targetId) => {
    let element = document.getElementById(elementId);
    element.addEventListener(event, fn.bind(null, targetId));
}

let toggleHiddenClassInMenu = (itemId) => {
    let menu = document.getElementById('welcome-menu');
    let item = document.getElementById(itemId);
    menu.classList.toggle('hidden');
    item.classList.toggle('hidden');
};

setMenuButtonsListeners(CLICK_EVENT_NAME, 'rules-menu-item', toggleHiddenClassInMenu, 'rules-popup');
setMenuButtonsListeners(CLICK_EVENT_NAME, 'back-from-rules', toggleHiddenClassInMenu, 'rules-popup');
setMenuButtonsListeners(KEYPRESS_EVENT_NAME, 'rules-menu-item', toggleHiddenClassInMenu, 'rules-popup');
setMenuButtonsListeners(KEYPRESS_EVENT_NAME, 'back-from-rules', toggleHiddenClassInMenu, 'rules-popup');

setMenuButtonsListeners(CLICK_EVENT_NAME, 'new-game-menu-item', toggleHiddenClassInMenu, 'new-game-popup');
setMenuButtonsListeners(CLICK_EVENT_NAME, 'back-from-new-game', toggleHiddenClassInMenu, 'new-game-popup');
setMenuButtonsListeners(KEYPRESS_EVENT_NAME, 'new-game-menu-item', toggleHiddenClassInMenu, 'new-game-popup');
setMenuButtonsListeners(KEYPRESS_EVENT_NAME, 'back-from-new-game', toggleHiddenClassInMenu, 'new-game-popup');

setMenuButtonsListeners(CLICK_EVENT_NAME, 'records-menu-item', toggleHiddenClassInMenu, 'records-popup');
setMenuButtonsListeners(CLICK_EVENT_NAME, 'back-from-records', toggleHiddenClassInMenu, 'records-popup');
setMenuButtonsListeners(KEYPRESS_EVENT_NAME, 'records-menu-item', toggleHiddenClassInMenu, 'records-popup');
setMenuButtonsListeners(KEYPRESS_EVENT_NAME, 'back-from-records', toggleHiddenClassInMenu, 'records-popup');

let renderRecords = (difficulty) => {
    let recordsElement = document.getElementById( difficulty + '-records');

    recordsElement.innerHTML = '';
    
    let p = document.createElement('p');
    p.id = difficulty + '-records-p';
    p.innerText = difficulty;

    recordsElement.appendChild(p);

    let recordsKey = difficulty + RECORD_LIST_KEY_IN_LOCAL_STORAGE;
    let records = JSON.parse(window.localStorage.getItem(recordsKey));

    for(let record of records){
        let div = document.createElement('div');
        div.innerHTML = `
            <div class="record-player-name">
                ${record.player.firstName} ${record.player.secondName}
            </div>
            <div class="record-player-time">
                ${convertSecondsToMinutesWithSeconds(record.time)}
            </div>
        `;
        recordsElement.appendChild(div);
    }
}

document.getElementById('records-menu-item').addEventListener(CLICK_EVENT_NAME, () => {
    for (let key in DIFFICULTY){
        renderRecords(DIFFICULTY[key].name);
    }
});


//difficulty

let setDifficultyListeners = () =>{
    for(let key in DIFFICULTY){

        let difficulty = DIFFICULTY[key];

        currentDifficulty.element.classList.add('selected-difficulty');
    
        difficulty.element.addEventListener(CLICK_EVENT_NAME, () => {
            changeCurrentDifficulty(difficulty);
        });

        function changeCurrentDifficulty(difficulty){
            toggleCurrentDifficultyClass();
            currentDifficulty = difficulty;
            toggleCurrentDifficultyClass();
        }

        function toggleCurrentDifficultyClass(){
            document.getElementById(currentDifficulty.element.id).classList.toggle('selected-difficulty');
        }
    }
}
setDifficultyListeners();


//card back

let setCardBackForGame = () => document.getElementById('current-card-back').style.backgroundImage = 'url(' + currentCardBack + ')';

let setCardsBack = () => {
    let i = 0;
    let elements = document.getElementsByClassName('pick-card-back');
    for(let key in CARD_BACK){

        let element = elements[i++];

        element.style.backgroundImage = 'url(' + CARD_BACK[key] + ')';

        element.addEventListener(CLICK_EVENT_NAME, ()=>{
            currentCardBack = CARD_BACK[key];
            setCardBackForGame();
        });
    }
}

setCardBackForGame();
setCardsBack();

//render field

let renderField = () => {
    
    let id = 1;
    for (let i = 0; i < (currentDifficulty.width*currentDifficulty.height)/2; i++){

        let url = CARD_FRONT_DIRECTORY + (i+1) + '.png';

        cards.push(new Card(id++, url, CARD_POOL[i]));
        cards.push(new Card(id++, url, CARD_POOL[i]));
    }

    let createCard = (cardObject, fieldWidth) => {

        let cardHTML = `
            <div id="${cardObject.divId}" class="card">
                <div id="${cardObject.divId}-front" class="card-face card-face--front"></div>
                <div id="${cardObject.divId}-back"class="card-face card-face--back"></div>
            </div>
        `;

        let card = document.createElement('div');
        card.innerHTML = cardHTML;
        card.className = 'card-scene';
        card.style.cssFloat = 'left';

                
        card.style.width =  fieldWidth + 'px';
        card.style.height = 10 * fieldWidth / 8 + 'px';

        card.children[0].children[0].style.backgroundImage = 'url(' + cardObject.url + ')';
        card.children[0].children[1].style.backgroundImage = 'url(' + currentCardBack + ')';

        card.addEventListener(CLICK_EVENT_NAME, () => {

            let firstElem, secondElem;

            if(clickable && cardObject.isInGame){
                
                if(!firstCard){

                    firstCard = cardObject;
                    firstCard.isInGame = false;

                    firstElem = document.getElementById(firstCard.divId);
                    firstElem.classList.add('is-flipped');

                } else {

                    clickable = false;

                    secondCard = cardObject;
                    secondCard.isInGame = false;

                    firstElem = document.getElementById(firstCard.divId);
                    secondElem = document.getElementById(secondCard.divId);

                    secondElem.classList.add('is-flipped');

                                        
                    if(firstCard.value == secondCard.value){

                        setTimeout(function(){
                            secondElem.style.opacity = '0';
                            firstElem.style.opacity = '0';
    
                            firstCard = null;
                            secondCard = null;

                            clickable = true;
                            
                        }, 600);

                        

                    } else {

                        setTimeout(function(){
                            secondElem.classList.remove('is-flipped');
                            firstElem.classList.remove('is-flipped');

                            firstCard.isInGame = true;
                            secondCard.isInGame = true;

                            firstCard = null;
                            secondCard = null;

                            clickable = true;
                    
                        }, 600);

                        
                    }
                    
                }

            }          

        });
        
        return card;
            
    };

    let field = document.getElementById('card-field');
    field.innerHTML = '';

    let shuffle = (a) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    shuffle(cards);

    let w = parseFloat(getComputedStyle(document.getElementById('card-field')).width)/currentDifficulty.width - 25 ;

    for (let key in cards){
        field.appendChild(createCard(cards[key], w));
    }

    


    


}

//start game

let startGame = () => {
    
    let time = 0;

    cards = [];

    document.getElementById('game-timer').innerHTML = '00:00';

    let timer = setInterval(()=>{
        ++time;

        document.getElementById('game-timer').innerHTML = convertSecondsToMinutesWithSeconds(time);

        if(cards.every((card) => !card.isInGame)){
            clearInterval(timer);

            let result = new Result(currentPlayer, currentDifficulty, time);

            let recordsKey = currentDifficulty.name + RECORD_LIST_KEY_IN_LOCAL_STORAGE;

            let records = JSON.parse(window.localStorage.getItem(recordsKey));

            if (records.length < 10){
                records.push(result);
                records.sort((r1, r2)=> r1.time - r2.time);
            } else {

                for (let i = 0; i < records.length; i++){
                    if(result.time <= records[i]){
                        records.splice(i, 1, result);
                        break;
                    }
                }
    
                if(records.length > 10){
                    records.splice(-1, 1);
                }

            }

            

            window.localStorage.setItem(recordsKey, JSON.stringify(records));

            document.getElementById('card-field').innerHTML = '<h1>You are the winner!</h1>';

        }

        
    }, 1000);

    document.getElementById('restart-game').addEventListener(CLICK_EVENT_NAME, () => {
        clearInterval(timer);
        startGame();
    });

    document.getElementById('new-game').addEventListener(CLICK_EVENT_NAME, () => {
        clearInterval(timer);
        document.getElementById('game-field').classList.add('hidden');
        document.getElementById('new-game-popup').classList.remove('hidden');
    });

    document.getElementById('back-from-game').addEventListener(CLICK_EVENT_NAME, () => {
        clearInterval(timer);
        document.getElementById('game-field').classList.add('hidden');
        document.getElementById('welcome-menu').classList.remove('hidden');
    });

    renderField();
}

//submit new game

let setSubmitNewGameListener = () =>{
    let element = document.getElementById('submit-new-game');

    let fn = () => {
        let firstName = document.getElementById('first-name-input');
        if (!firstName.validity.valid){
            firstName.value = '';
            return;
        }
        let secondName = document.getElementById('second-name-input');
        if (!secondName.validity.valid){
            secondName.value = '';
            return;
        }
        let email = document.getElementById('email-input');
        if (!email.validity.valid){
            email.value = '';
            return;
        }

        currentPlayer = new Player(firstName.value, secondName.value, email.value);

        document.getElementById('new-game-popup').classList.toggle('hidden');
        document.getElementById('game-field').classList.toggle('hidden');

        startGame();

    }

    element.addEventListener(CLICK_EVENT_NAME, fn);
    element.addEventListener(KEYPRESS_EVENT_NAME, fn);

    
}
setSubmitNewGameListener();


function convertSecondsToMinutesWithSeconds(time){

    let minutes = Math.floor(time/60);
    let seconds = time%60;

    return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
}







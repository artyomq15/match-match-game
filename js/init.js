'use strict';

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

const DIFFICULTY = {
    LOW: new Difficulty('low', 5, 2, document.getElementById('low')),
    MEDIUM: new Difficulty('medium', 6, 3, document.getElementById('medium')),
    HIGH: new Difficulty('high', 9, 4, document.getElementById('high'))
}


let currentCardBack = CARD_BACK.RED_WHITE;
let currentDifficulty = DIFFICULTY.LOW;
let currentPlayer;
let firstCard, secondCard;
let cards = [];
let clickable = true;

const CARD_POOL = [];

function setRecordsArraysToLocalStorage(difficulty){
    if(!window.localStorage.getItem(difficulty + RECORD_LIST_KEY_IN_LOCAL_STORAGE)){
        window.localStorage.setItem(difficulty + RECORD_LIST_KEY_IN_LOCAL_STORAGE, JSON.stringify([]));
    }
}

function convertSecondsToMinutesWithSeconds(time){

    let minutes = Math.floor(time/60);
    let seconds = time%60;

    return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
}

function init(){

    for(let i = 1; i <= 18; i++){
        CARD_POOL[i-1] = i;
    }
    
    for (let key in DIFFICULTY){
        setRecordsArraysToLocalStorage(DIFFICULTY[key].name);
    }

}






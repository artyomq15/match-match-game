'use strict';

import { CLICK_EVENT_NAME, KEYPRESS_EVENT_NAME, DIFFICULTY, CARD_BACK } from './constants';
import { global as _ } from './init';
import { Player } from './domain/Player';
import { renderRecords } from './records';
import { startGame } from './game';

function setMenuListeners(){

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
    
        
    document.getElementById('records-menu-item').addEventListener(CLICK_EVENT_NAME, () => {
        for (let key in DIFFICULTY){
            renderRecords(DIFFICULTY[key].name);
        }
    });

}

function setDifficultyListeners(){

    for(let key in DIFFICULTY){
        let difficulty = DIFFICULTY[key];
        _.currentDifficulty.element.classList.add('selected-difficulty');
    
        difficulty.element.addEventListener(CLICK_EVENT_NAME, changeCurrentDifficulty.bind(null, difficulty));
    }
}

function changeCurrentDifficulty(difficulty){
    toggleCurrentDifficultyClass();
    _.currentDifficulty = difficulty;
    toggleCurrentDifficultyClass();
}

function toggleCurrentDifficultyClass(){
    document.getElementById(_.currentDifficulty.element.id).classList.toggle('selected-difficulty');
}

//submit new game

function setSubmitNewGameListener(){
    let element = document.getElementById('submit-new-game');

    element.addEventListener(CLICK_EVENT_NAME, submitNewGame);
    element.addEventListener(KEYPRESS_EVENT_NAME, submitNewGame);   
}

function submitNewGame(){
    let firstName = document.getElementById('first-name-input');
    let secondName = document.getElementById('second-name-input');
    let email = document.getElementById('email-input');

    if (isValidInput(firstName, secondName, email)){
        _.currentPlayer = new Player(firstName.value, secondName.value, email.value);

        document.getElementById('new-game-popup').classList.toggle('hidden');
        document.getElementById('game-field').classList.toggle('hidden');

        startGame();
    }
}

function isValidInput(firstName, secondName, email){
    
    if (!firstName.validity.valid){
        firstName.value = '';
        return false;
    }
    
    if (!secondName.validity.valid){
        secondName.value = '';
        return false;
    }
    
    if (!email.validity.valid){
        email.value = '';
        return false;
    }
    return true;
}

//card back

let setCardBackForGame = () => document.getElementById('current-card-back').style.backgroundImage = 'url(' + _.currentCardBack + ')';

let setCardsBack = () => {
    let i = 0;
    let elements = document.getElementsByClassName('pick-card-back');
    for(let key in CARD_BACK){

        let element = elements[i++];

        element.style.backgroundImage = 'url(' + CARD_BACK[key] + ')';

        element.addEventListener(CLICK_EVENT_NAME, ()=>{
            _.currentCardBack = CARD_BACK[key];
            setCardBackForGame();
        });
    }
}


export function setListeners(){
    setMenuListeners();
    setDifficultyListeners();
    setSubmitNewGameListener();
    setCardBackForGame();
    setCardsBack();
}



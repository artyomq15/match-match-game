'use strict';

import { CARD_BACK, DIFFICULTY, RECORD_LIST_KEY_IN_LOCAL_STORAGE, CARD_POOL } from './constants';

export let global = {
    currentCardBack: CARD_BACK.RED_WHITE,
    currentDifficulty: DIFFICULTY.LOW,
    currentPlayer: null,
    firstCard: null,
    secondCard: null,
    cards: [],
    clickable: true,
}


function setRecordsArraysToLocalStorage(difficulty){
    if(!window.localStorage.getItem(difficulty + RECORD_LIST_KEY_IN_LOCAL_STORAGE)){
        window.localStorage.setItem(difficulty + RECORD_LIST_KEY_IN_LOCAL_STORAGE, JSON.stringify([]));
    }
}

export function convertSecondsToMinutesWithSeconds(time){
    let minutes = Math.floor(time/60);
    let seconds = time%60;
    return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
}

export function init(){
    for(let i = 1; i <= 18; i++){
        CARD_POOL[i-1] = i;
    }
    
    for (let key in DIFFICULTY){
        setRecordsArraysToLocalStorage(DIFFICULTY[key].name);
    }
}






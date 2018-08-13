'use strict';

//menu buttons

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

//submit new game

function setSubmitNewGameListener(){
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


function setListeners(){
    setMenuListeners();
    setDifficultyListeners();
    setSubmitNewGameListener();
    setCardBackForGame();
    setCardsBack();
}



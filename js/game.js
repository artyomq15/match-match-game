'use strict';

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
                    if(result.time <= records[i].time){
                        records.splice(i, 0, result);
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

'use strict';

function renderRecords(difficulty) {
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

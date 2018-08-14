'use strict';

//export 
class Card{
    constructor(divId, url, value){
        this.divId = 'card-' + divId;
        this.url = url;
        this.value = value;
        this.isInGame = true;
    }
}
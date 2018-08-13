'use strict';

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
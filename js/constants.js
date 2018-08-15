'use strict';

import { Difficulty } from './domain/Difficulty';

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

const CARD_POOL = [];

const CARD_FLIP_CLASS = 'is-flipped';
const CARD_FLIP_TIME = 600;

export { CLICK_EVENT_NAME,
    KEYPRESS_EVENT_NAME,
    CARD_BACK_DIRECTORY,
    CARD_FRONT_DIRECTORY,
    RECORD_LIST_KEY_IN_LOCAL_STORAGE,
    CARD_BACK,
    DIFFICULTY,
    CARD_POOL,
    CARD_FLIP_TIME,
    CARD_FLIP_CLASS
}
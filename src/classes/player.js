// player.js
import { Gameboard } from './gameboard.js';

export class Player {
    constructor(type) {
        this.type = type;
        this.gb = new Gameboard();
    }
}
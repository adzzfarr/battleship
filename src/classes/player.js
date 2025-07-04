// player.js
import { Gameboard } from './gameboard.js';

export class Player {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.gb = new Gameboard();
    }
}
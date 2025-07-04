// script.js
import { Player } from './classes/player.js';
import { GameController } from './classes/controller.js';

(() => {
    const playerOne = new Player('One', 'real');
    const playerTwo = new Player('Two', 'computer');
    const controller = new GameController(playerOne, playerTwo);

    controller.playGame();
})();
// script.js
import { Player } from './classes/player.js';
import { Ship } from './classes/ship.js';
import { renderGameboard } from './ui/render-gameboard.js';

function startGame() {
    const playerOne = new Player('real');
    const playerTwo = new Player('computer');

    // Each player has a fleet of five ships. These ships have different lengths: 
    // one carrier (5 squares), one battleship (4 squares), one cruiser (3 squares), one submarine (3 squares), and one destroyer (2 squares). 

    // [0, 0] ... [0, 4]
    playerOne.gb.placeShip(new Ship(5), 'horizontal', [0, 0]);
    playerTwo.gb.placeShip(new Ship(5), 'horizontal', [0, 0]);

    // [1, 1] ... [1, 4]
    playerOne.gb.placeShip(new Ship(4), 'horizontal', [1, 1]);
    playerTwo.gb.placeShip(new Ship(4), 'horizontal', [1, 1]);

    // [4, 4] ... [6, 4]
    playerOne.gb.placeShip(new Ship(3), 'vertical', [4, 4]);
    playerTwo.gb.placeShip(new Ship(3), 'vertical', [4, 4]);

    // [4, 6] ... [6, 6]
    playerOne.gb.placeShip(new Ship(3), 'vertical', [4, 6]);
    playerTwo.gb.placeShip(new Ship(3), 'vertical', [4, 6]);

    // [7, 7] ... [8, 7]
    playerOne.gb.placeShip(new Ship(2), 'horizontal', [7, 7]);
    playerTwo.gb.placeShip(new Ship(2), 'horizontal', [7, 7]);

    // Render the gameboards
    const playerOneGameboard = renderGameboard(playerOne.gb);
    const playerTwoGameboard = renderGameboard(playerTwo.gb);

    const gameboardsContainer = document.getElementById('gameboards');
    gameboardsContainer.appendChild(playerOneGameboard);
    gameboardsContainer.appendChild(playerTwoGameboard);
}

startGame();
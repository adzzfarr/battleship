// controller.js
import { Ship } from './ship.js';
import { renderGameboard } from '../ui/render-gameboard.js';
import { renderActivePlayer } from '../ui/render-active-player.js';

export class GameController {
    constructor(playerOne, playerTwo) {
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.active = playerOne;
        this.inactive = playerTwo;
    }

    playGame() {
        this.placeShips();
        this.renderGameboards(() => this.turnHandler());
        renderActivePlayer(this.active);
    }

    placeShips() {
        // Each player has a fleet of five ships. These ships have different lengths: 
        // one carrier (5 squares), one battleship (4 squares), one cruiser (3 squares), one submarine (3 squares), and one destroyer (2 squares). 

        // [0, 0] ... [0, 4]
        this.playerOne.gb.placeShip(new Ship(5), 'horizontal', [0, 0]);
        this.playerTwo.gb.placeShip(new Ship(5), 'horizontal', [0, 0]);

        // [1, 1] ... [1, 4]
        this.playerOne.gb.placeShip(new Ship(4), 'horizontal', [1, 1]);
        this.playerTwo.gb.placeShip(new Ship(4), 'horizontal', [1, 1]);

        // [4, 4] ... [6, 4]
        this.playerOne.gb.placeShip(new Ship(3), 'vertical', [4, 4]);
        this.playerTwo.gb.placeShip(new Ship(3), 'vertical', [4, 4]);

        // [4, 6] ... [6, 6]
        this.playerOne.gb.placeShip(new Ship(3), 'vertical', [4, 6]);
        this.playerTwo.gb.placeShip(new Ship(3), 'vertical', [4, 6]);

        // [7, 7] ... [8, 7]
        this.playerOne.gb.placeShip(new Ship(2), 'horizontal', [7, 7]);
        this.playerTwo.gb.placeShip(new Ship(2), 'horizontal', [7, 7]);
    }
    
    renderGameboards(attackHandler) {
        const gameboardsContainer = document.getElementById('gameboards');

        const playerOneRealGameboard = renderGameboard(false, this.playerOne.gb, attackHandler);
        playerOneRealGameboard.className = 'gameboard player-one';
        const playerOneDummyGameboard = renderGameboard(true, this.playerOne.gb);
        playerOneDummyGameboard.className = 'gameboard player-one';
        const playerTwoRealGameboard = renderGameboard(false, this.playerTwo.gb, attackHandler);
        playerTwoRealGameboard.className = 'gameboard player-two';
        const playerTwoDummyGameboard = renderGameboard(true, this.playerTwo.gb);
        playerTwoDummyGameboard.className = 'gameboard player-two';

        if (!gameboardsContainer.hasChildNodes()) {
            // Initial render
            gameboardsContainer.appendChild(playerOneDummyGameboard);
            gameboardsContainer.appendChild(playerTwoRealGameboard);
            return;
        }

        const playerOneGameboardSelector = document.querySelector('.gameboard.player-one');
        const playerTwoGameboardSelector = document.querySelector('.gameboard.player-two');

        if (this.active === this.playerOne) {
            // playerOne has the dummy gameboard
            playerOneGameboardSelector.replaceWith(playerOneDummyGameboard);
            // playerTwo has the real gameboard
            playerTwoGameboardSelector.replaceWith(playerTwoRealGameboard);
        } else {
            // playerOne has the real gameboard
            playerOneGameboardSelector.replaceWith(playerOneRealGameboard);
            // playerTwo has the dummy gameboard
            playerTwoGameboardSelector.replaceWith(playerTwoDummyGameboard);
        }  
    }

    turnHandler() {
        // Check if opponent's ships are all sunk
        if (this.inactive.gb.allShipsSunk()) {
            alert(`${this.active.name} wins!`);
            return;
        }

        // Switch turns
        [this.active, this.inactive] = [this.inactive, this.active];

        // Update active player display
        renderActivePlayer(this.active);

        // Re-render gameboards
        this.renderGameboards(() => this.turnHandler());
     }
}
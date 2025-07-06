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
    
    renderGameboards(turnHandler) {
        const gameboardsContainer = document.getElementById('gameboards');

        const playerOneRealGameboard = renderGameboard(this.playerOne.type, false, this.playerOne.gb, turnHandler);
        playerOneRealGameboard.className = 'gameboard player-one';
        const playerOneDummyGameboard = renderGameboard(this.playerOne.type, true, this.playerOne.gb);
        playerOneDummyGameboard.className = 'gameboard player-one';
        const playerTwoRealGameboard = renderGameboard(this.playerTwo.type, false, this.playerTwo.gb, turnHandler);
        playerTwoRealGameboard.className = 'gameboard player-two';
        const playerTwoDummyGameboard = renderGameboard(this.playerTwo.type, true, this.playerTwo.gb);
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
            renderActivePlayer(this.active, true);
            return;
        }

        // Switch turns
        [this.active, this.inactive] = [this.inactive, this.active];

        // Update active player display
        renderActivePlayer(this.active, false);

        // Re-render gameboards
        this.renderGameboards(() => this.turnHandler());

        // If the active player is a computer, make them attack
        if (this.active.type === 'computer') {
            setTimeout(() => {
                this.computerAttack(this.inactive);

                // Activate the turn handler again
                this.turnHandler();
            }, 1000)
        }
    }

    computerAttack(target) {
        let randomRow;
        let randomColumn;

        do {
            randomRow = Math.round(Math.random() * 9);
            randomColumn = Math.round(Math.random() * 9);
        } while (target.gb.hit[randomRow][randomColumn])

        target.gb.receiveAttack([randomRow, randomColumn]);
    }
}
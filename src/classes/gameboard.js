// gameboard.js

export class Gameboard {
    constructor() {
        // this.grid contains either null entries or references to a particular ship
        this.grid = Array.from(Array(10), () => new Array(10).fill(null));
        // this.hit tracks the coordinates of wherever an attack was received, regardless if it hit a ship or not. 
        this.hit = Array.from(Array(10), () => new Array(10).fill(false));
        // this.missed array is simply kept to display the missed attacks in chronological order on the UI.
        this.missed = [];
        // this.ships stores references to all the ships on a board, to check if they have sunk or not
        this.ships = [];
    }

    placeShip(ship, orientation, location) {
        const [chosenRow, chosenColumn] = location;

        if (orientation === 'vertical') {
            let [startRow, endRow] = [chosenRow, chosenRow + ship.length - 1];

            // Handle overflows
            if (endRow > 9) {
                throw new Error('Ship placement out of bounds');
            }
            
            // Check for overlapping ships
            for (let i = startRow; i < endRow + 1; i++) {
                if (this.grid[i][chosenColumn]) throw new Error('Ship overlap')
            }
            
            // Replace the grid elements with references to the ship
            for (let i = startRow; i < endRow + 1; i++) {
                this.grid[i][chosenColumn] = ship; 
            }

            this.ships.push(ship);
        } else if (orientation === 'horizontal') {
            let [startColumn, endColumn] = [chosenColumn, chosenColumn + ship.length - 1];

            // Handle overflows
            if (endColumn > 9) {
                throw new Error('Ship placement out of bounds');
            }

            // Check for overlapping ships
            for (let i = startColumn; i < endColumn + 1; i++) {
                if (this.grid[chosenRow][i]) throw new Error('Ship overlap');
            }

            // Replace the grid elements with references to the ship
            for (let i = startColumn; i < endColumn + 1; i++) {
                this.grid[chosenRow][i] = ship;
            } 

            this.ships.push(ship);
        } else {
            throw new Error('Orientation not recognised');
        }
    }

    receiveAttack(location) {
        const [row, column] = location;

        if (this.hit[row][column]) throw new Error('Location already hit');

        this.hit[row][column] = true;

        if (!this.grid[row][column]) {
            // Missed attack
            this.missed.push(location);
        } else {
            // Hit a ship
            const target = this.grid[row][column];
            target.hit();
        }
    }

    allShipsSunk() {
        for (let ship of this.ships) {
            if (!ship.isSunk()) return false;
        }

        return true;
    }
}

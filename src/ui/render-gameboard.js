// render-gameboard.js
export function renderGameboard(playerType, isDummy, gb, turnHandler) {
    const gameboardContainer = document.createElement('div');
    gameboardContainer.className = 'gameboard';

    if (isDummy) {
        gameboardContainer.classList.add('disabled');
    }

    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid';

    for (let row = 0; row < gb.grid.length; row++) {
        for (let column = 0; column < gb.grid[row].length; column++) {
            
            const square = renderSquare(playerType, isDummy, gb, row, column, turnHandler);
            gridContainer.appendChild(square);
        }
    }

    gameboardContainer.appendChild(gridContainer);

    return gameboardContainer;
}

function renderSquare(playerType, isDummy, gb, row, column, turnHandler) {
    const square = document.createElement('div');
    square.className = 'square';

    // Check if that location has been hit or not
    if (gb.hit[row][column]) {
        // If it has been hit, check whether it is a ship (successful hit) or empty area (miss) and render accordingly.
        if (!gb.grid[row][column]) {
            square.classList.add('missed');
        } else {
            square.classList.add('hit-ship');
        }
        // In either case, these squares should no longer be clickable, thus we do not add any event listeners in this if block.
    } else {
        // If it has not been hit, render a blank square.
        square.classList.add('blank');

        if (!isDummy) {
            // This square can be attacked.
            square.addEventListener('click', () => attack(row, column));
            
        } else {
            // The active player is clicking their own board, which is not allowed.
            square.addEventListener('click', onClickOwnBoard);
        }

        function attack(row, column) {
            gb.receiveAttack([row, column]);

            // Re-render the square
            const newSquare = renderSquare(playerType, isDummy, gb, row, column, turnHandler);
            square.replaceWith(newSquare);  

            // Fire the turn handler
            turnHandler();
        }

        function onClickOwnBoard() {
            console.log("Please click the opponent's board.");
        }
    }      
    
    return square;
}

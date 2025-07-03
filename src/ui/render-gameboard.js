// render-gameboard.js
export function renderGameboard(gb) {
    const gameboardContainer = document.createElement('div');
    gameboardContainer.className = 'gameboard';

    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid';

    for (let row = 0; row < gb.grid.length; row++) {
        for (let column = 0; column < gb.grid[row].length; column++) {
            const square = renderSquare(gb, row, column);
            gridContainer.appendChild(square);
        }
    }

    gameboardContainer.appendChild(gridContainer);

    return gameboardContainer;
}

function renderSquare(gb, row, column) {
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
        // If it has not been hit, render a blank square that is clickable (to be attacked).
        square.classList.add('blank');
        square.addEventListener('click', onClick);
    }

    return square;

    function onClick() {
        gb.receiveAttack([row, column]);

        // Re-render the square
        const newSquare = renderSquare(gb, row, column);
        square.replaceWith(newSquare);
    }
}
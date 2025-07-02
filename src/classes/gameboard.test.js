const Gameboard = require('./gameboard');
const Ship = require('./ship');

test('Place a 5-long ship vertically at [5, 5]', () => {
    const gb = new Gameboard();
    const ship = new Ship(5);

    gb.placeShip(ship, 'vertical', [5, 5]);
    
    // [5, 5] ... [9, 5] should contain references to ship
    for (let i = 5; i < 10; i++) {
        expect(gb.grid[i][5]).toBe(ship);
    }

    // Ensure cells above, and to the left and right of [5, 5] are still null
    expect(gb.grid[5][4]).toBe(null);
    expect(gb.grid[4][5]).toBe(null);
    expect(gb.grid[5][6]).toBe(null);
});

test('Place a 5-long ship horizontally at [5, 5]', () => {
    const gb = new Gameboard();
    const ship = new Ship(5);

    gb.placeShip(ship, 'horizontal', [5, 5]);
    
    // [5, 5] ... [5, 9] should contain references to ship
    for (let i = 5; i < 10; i++) {
        expect(gb.grid[5][i]).toBe(ship);
    }

    // Ensure cells above, below, and to the left of [5, 5] are still null
    expect(gb.grid[4][5]).toBe(null);
    expect(gb.grid[5][4]).toBe(null);
    expect(gb.grid[6][5]).toBe(null);
});

test('Ship out of bounds', () => {
    const gb = new Gameboard();
    const ship = new Ship(5);

    expect(() => gb.placeShip(ship, 'horizontal', [5, 6])).toThrow('Ship placement out of bounds');
});

test('Overlapping ships', () => {
    const gb = new Gameboard();
    const ship1 = new Ship(5);
    const ship2 = new Ship(5);

    gb.placeShip(ship1, 'vertical', [3, 5]);

    expect(() => gb.placeShip(ship2, 'horizontal', [5, 3])).toThrow('Ship overlap');
});

test('Attack hit a ship', () => {
    const gb = new Gameboard();
    const ship = new Ship(5);

    gb.placeShip(ship, 'vertical', [3, 5]);
    gb.receiveAttack([5, 5]);

    expect(ship.hits).toBe(1);
    expect(gb.hit[5][5]).toBe(true);
});

test('Attacks sank a ship', () => {
    const gb = new Gameboard();
    const ship = new Ship(5);

    gb.placeShip(ship, 'vertical', [3, 5]);

    for (let i = 3; i < 8; i++) {
        gb.receiveAttack([i, 5]);
    }

    expect(ship.isSunk()).toBe(true);
});

test('Attacking the same location twice', () => {
    const gb = new Gameboard();
    const ship = new Ship(5);

    gb.placeShip(ship, 'vertical', [3, 5]);

    gb.receiveAttack([3, 5]);

    expect(() => gb.receiveAttack([3, 5])).toThrow('Location already hit');
});

test('Tracks missed attacks', () => {
    const gb = new Gameboard();
    const ship = new Ship(5);

    gb.placeShip(ship, 'vertical', [3, 5]);

    gb.receiveAttack([3, 6]);
    gb.receiveAttack([3, 7]);
    gb.receiveAttack([3, 8]);

    expect(gb.missed).toStrictEqual([[3, 6], [3, 7], [3, 8]]);
});

test('All ships have been sunk', () => {
    const gb = new Gameboard();
    const ship1 = new Ship(5);
    const ship2 = new Ship(4);
    const ship3 = new Ship(3);

    // [3, 5] ... [7, 5]
    gb.placeShip(ship1, 'vertical', [3, 5]);
    for (let i = 3; i < 8; i++) {
        gb.receiveAttack([i, 5]);
    }

    // [1, 1] ... [1, 4]
    gb.placeShip(ship2, 'horizontal', [1, 1])
    for (let i = 1; i < 5; i++) {
        gb.receiveAttack([1, i]);
    }

    // [6, 7] ... [8, 7]
    gb.placeShip(ship3, 'vertical', [6, 7]);
    for (let i = 6; i < 9; i++) {
        gb.receiveAttack([i, 7]);
    }

    expect(gb.allShipsSunk()).toBe(true);
});
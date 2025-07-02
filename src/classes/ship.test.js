const Ship = require('./ship');

test('Create a new ship', () => {
    const ship = new Ship(5);

    expect(ship.length).toBe(5);
    expect(ship.hits).toBe(0);
});

test('Hit a ship', () => {
    const ship = new Ship(3);

    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
});

test('Sink a ship', () => {
    const ship = new Ship(2);

    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});
const Gameboard = require("./gameboard");

class Player {
    constructor(type) {
        this.type = type;
        this.gb = new Gameboard();
    }
}

module.exports = Player;
class XAxisDateEveryGame {
    constructor() {
        this.previousGame = null;
        this.game = null;
    }

    addGame(game) {
        this.previousGame = this.game;
        this.game = game;
    }

    getX() {
        return this.game.date;
    }

    popLast() {
        return false;
    }

    getName() {
        return 'Date';
    }
}
class PlayerStats {
    constructor(playerId) {
        this.player = playerId;
        this.games = [];
        this.wins = 0;
        this.losses = 0;

    }

    addGame(game) {
        this.games.push(game.id);

        if (game.winners.includes(this.player)) {
            this.wins++;
        } else {
            this.losses++;
        }
    }
}
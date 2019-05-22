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

class PlayerStatsWinPercentage {
    constructor(playerId) {
        this.player = playerId;
        this.games = 0;
        this.wins = 0;
    }

    getName() {
        return 'Win percentage';
    }

    addGame(game) {
        this.games++;

        if (game.winners.includes(this.player)) {
            this.wins++;
        }
    }

    getValue() {
        return (this.wins / this.games * 100).toFixed(1);
    }
}
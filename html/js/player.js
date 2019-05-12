class Player {
    constructor(object) {
        // constructor from API object
        this.id = object.id;
        this.name = object.name;
        this.rank = object.rank;
        this.score = object.score;

        // alltime stats are season 0
        this.seasons = {
            0: new PlayerStats()
        };
    }

    addGame(game) {
        // add to alltime stats
        this.seasons[0].addGame(game);

        if (!this.seasons.hasOwnProperty(game.season)) {
            this.seasons[game.season] = new PlayerStats();
        }

        this.seasons[game.season].addGame(game);
    }

    renderTableRow() {
        // renders player row in table

        return $('<tr>', {
            'data-no-rank': this.rank === null,
            html: [
                $('<td>', {
                    html: $('<img>', {
                        src:
                            this.rank !== null
                                ? 'img/numerical_ranks/' + this.rank.numerical_value + '.png'
                                : '',
                        title:
                            this.rank !== null
                                ? this.rank.name
                                : ''
                    })
                }),
                $('<td>', {
                    text: this.name
                }),
                $('<td>', {
                    text: this.score
                })
            ]
        });
    }

    renderDialog(seasonId) {
        // renders player stats dialog content
        var stats = this.seasons[seasonId];
    }
}

class PlayerStats {
    constructor() {
        this.games = 0;
        this.wins = 0;
        this.losses = 0;
    }

    addGame(game) {
        this.games++;
    }
}
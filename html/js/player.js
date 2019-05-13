class Player {
    constructor(object) {
        // constructor from API object
        this.id = object.id;
        this.name = object.name;
        this.rank = object.rank;
        this.score = object.score;

        // alltime stats are season 0
        this.seasons = {
            0: new PlayerStats(this.id)
        };

        this.dialog = null;
    }

    addGame(game) {
        // add to alltime stats
        this.seasons[0].addGame(game);

        if (!this.seasons.hasOwnProperty(game.season)) {
            this.seasons[game.season] = new PlayerStats(this.id);
        }

        this.seasons[game.season].addGame(game);
    }

    renderTableRow(seasonId) {
        // renders player row in table

        let player = this;
        let stats = this.seasons[seasonId];

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
                }),
                $('<td>', {
                    html: $('<button>', {
                        class: 'btn btn-primary',
                        text: 'Stats',
                        click: function () {
                            player.openDialog(fbc.base.parameters.currentSeason);
                        }
                    })
                })
            ]
        });
    }

    openDialog(seasonId) {
        // renders player stats dialog content
        let stats = this.seasons[seasonId];

        this.dialog = new Dialog({
            header: this.name,
            body: [
                Dialog.renderStatsRow('Games', stats.games),
                Dialog.renderStatsRow('Wins', stats.wins),
                Dialog.renderStatsRow('Losses', stats.losses)
            ]
        });

        this.dialog.open();
    }

    changeDialogSeason(seasonId) {
        var stats = this.seasons[seasonId];

        // TODO: OPEN DIALOG STATS
    }
}

class PlayerStats {
    constructor(playerId) {
        this.player = playerId;
        this.games = 0;
        this.wins = 0;
        this.losses = 0;
    }

    addGame(game) {
        this.games++;

        if (game.winners.includes(this.player)) {
            this.wins++;
        } else {
            this.losses++;
        }
    }
}
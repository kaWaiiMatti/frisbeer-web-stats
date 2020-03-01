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

        let chartRow = Dialog.renderChartRow();
        let options = {
            title: {
                display: true,
                text: 'Win percentage'
            },
            scales: {
                xAxes: [{
                    id: 'Date',
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                }],
                yAxes: [{
                    id: 'ZeroToHundred',
                    type: 'linear',
                    ticks: {
                        min: 0,
                        max: 100,
                        stepSize: 20
                    }
                }]
            },
            legend: {
                display: false
            }
        };

        let games = stats.games.map(gameId => fbc.data.games[gameId]);
        games.sort(fbc.base.sorting.date);

        var stat = new PlayerWinPercentage(this, new XAxisDateEveryGame());

        games.forEach(game => {
            stat.addGame(game);
        })

        let dataSet1 = stat.getDataSet();

        let winPercentageChart = new Chart(chartRow.find('canvas').first(), {
            type: 'line',
            data: {
                datasets: [dataSet1]
            },
            options: options
        });

        this.dialog = new Dialog({
            header: this.name,
            body: [
                Dialog.renderStatsRow('Games', stats.games.length),
                Dialog.renderStatsRow('Wins', stats.wins),
                Dialog.renderStatsRow('Losses', stats.losses),
                chartRow
            ],
            dialogShown: function () {

            }
        });

        this.dialog.open();
    }

    changeDialogSeason(seasonId) {
        var stats = this.seasons[seasonId];

        // TODO: OPEN DIALOG STATS
    }
}
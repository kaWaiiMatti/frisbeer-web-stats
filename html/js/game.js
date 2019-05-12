class Game {
    constructor(object) {
        // constructor from API object
        this.id = object.id;
        this.name = object.name;
        this.season = object.season;
        this.location = object.location;
        this.date = new Date(object.date);
        this.approved = object.state > 2;
        this.clean_win = object.team1_score === 0 || object.team2_score === 0;

        let winning_team = object.team1_score === 2 ? 1 : 2;
        let team1 = [];
        let team2 = [];

        object.players.forEach(function (player) {
            if (player.team === 1) {
                team1.push(player.id);
            } else {
                team2.push(player.id);
            }
        });

        this.winning_team = winning_team;
        this.winners = this.winning_team === 1 ? team1 : team2;
        this.losers = this.winning_team !== 1 ? team1 : team2;
        this.team1 = team1;
        this.team2 = team2;
    }

    renderTableRow() {
        let team1_score = this.winning_team === 1 ? 2 : this.clean_win ? 0 : 1;
        let team2_score = this.winning_team === 2 ? 2 : this.clean_win ? 0 : 1;

        return $('<tr>', {
            html: [
                $('<td>', {
                    text: this.date.toLocaleString()
                }),
                $('<td>', {
                    text: this.location !== null
                        ? fbc.data.locations[this.location].name :
                        ''
                }),
                $('<td>', {
                    html: this.renderTablePlayerNames()
                }),
                $('<td>', {
                    text: team1_score + '-' + team2_score
                })
            ]
        });
    }

    renderTablePlayerNames() {
        return [
            $('<p>', {
                text: 'Team 1'
            }),
            $('<ul>', {
                html: this.team1.map(player => $('<li>', {
                    text: fbc.data.players[player].name
                }))
            }),
            $('<p>', {
                text: 'Team 2'
            }),
            $('<ul>', {
                html: this.team2.map(player => $('<li>', {
                    text: fbc.data.players[player].name
                }))
            })
        ];
    }
}
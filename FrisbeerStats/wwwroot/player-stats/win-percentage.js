class PlayerWinPercentage {
    constructor(player, xAxis) {
        this.player = player;
        this.wins = 0;
        this.losses = 0;
        this.data = [];
        this.xAxis = xAxis;
    }

    getName() {
        return 'Win percentage';
    }

    addGame(game) {
        let addData = false;

        if (game.losers.includes(this.player.id)) {
            this.losses++;
            addData = true;
        }

        if (game.winners.includes(this.player.id)) {
            this.wins++;
            addData = true;
        }

        if (!addData) {
            return;
        }

        this.xAxis.addGame(game);

        if (this.xAxis.popLast()) {
            this.data.pop();
        }

        this.data.push({
            x: this.xAxis.getX(),
            y: this.getValue()
        })
    }

    getValue() {
        return (this.wins / (this.wins + this.losses) * 100).toFixed(1);
    }

    getDataSet() {
        return {
            label: this.player.name,
            data: this.data,
            fill: false,
            borderColor: "#3e95cd",
            yAxisID: 'ZeroToHundred',
            xAxisID: this.xAxis.getName()
        };
    }
}
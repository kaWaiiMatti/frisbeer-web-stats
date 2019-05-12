(function (fbc) {
    fbc.games = {
        updateTable: function () {
            var games = Object.values(fbc.data.games).filter(game => game.season == fbc.base.parameters.currentSeason);

            games.sort(fbc.base.sorting.date);
            games.reverse();

            $('#games-table')
                .children('tbody')
                .first()
                .html(
                    $.map(games, function (game) {
                        return game.renderTableRow()
                    })
                );
        }
    };
})(fbc);
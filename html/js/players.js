(function (fbc) {
    fbc.players = {
        initialize: function () {
            ///<summary>Players initialization</summary>
            var showNoRank = fbc.base.cookies.get('fbc.players.show-no-rank');

            if (showNoRank !== '') {
                fbc.players.setShowNoRank(showNoRank === 'true', false);
            }

            $('#refresh-players').click(function () {
                fbc.base.updateData();
            });

            $('#show-players-without-rank').click(function () {
                fbc.players.toggleShowNoRank();
            });

            $('#players-table')
                .find('thead > tr > th[data-sort-type]')
                .click(function () {
                    // TODO: UPDATE URL BASED ON CLICKED ELEMENT
                });

            $('#refresh-players').click();
        },
        updateTable: function () {
            ///<summary>Update #Players table</summary>
            let players = Object.values(fbc.data.players);
            players.sort(fbc.base.sorting.score);
            players.reverse();

            $('#players-table')
                .children('tbody')
                .first()
                .html(players.map(player => player.renderTableRow(fbc.base.parameters.currentSeason)));
        },
        toggleShowNoRank: function () {
            var currentState =
                $('#players-table').attr('data-show-no-rank') === 'true';
            fbc.players.setShowNoRank(!currentState, true);
        },
        setShowNoRank: function (state, setCookie) {
            $('#show-players-without-rank')
                .children('span')
                .first()
                .toggleClass('glyphicon-check', state)
                .toggleClass('glyphicon-unchecked', !state);

            fbc.base.cookies.set('fbc.players.show-no-rank', state, 365);
            $('#players-table').attr('data-show-no-rank', state);
        }
    };
})(fbc);

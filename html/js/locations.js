(function (fbc) {
    fbc.locations = {
        initialize: function () {
        },
        updateTable: function () {
            ///<summary>Update locations table</summary>
            let locations = Object.values(fbc.data.locations);

            locations.sort(fbc.base.sorting.name);

            let content = locations.map(location => location.renderTableRow());

            $('#locations-table')
                .children('tbody')
                .first()
                .html(content);
        }
    };
})(fbc);

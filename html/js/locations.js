(function(fbc) {
    fbc.locations = {
        dict: {},
        getList: function() {
            var locations = $.map(fbc.locations.dict, function(location) {
                return location;
            });

            locations.sort(fbc.base.sorting.name);
            return locations;
        },
        initialize: function() {
            $('#refresh-locations').click(function() {
                fbc.locations.update(fbc.locations.updateTable);
            });

            $('#refresh-locations').click();
        },
        update: function(successCallback, errorCallback) {
            ///<summary>Update fbc.locations.dict from server</summary>
            $.ajax({
                url: fbc.base.parameters.server + 'API/locations/',
                method: 'GET',
                beforeSend: function() {
                    fbc.base.loader.set('locations');
                },
                complete: function() {
                    fbc.base.loader.remove('locations');
                },
                success: function(data) {
                    locationObject = {};
                    for (var i = 0; i < data.length; i++) {
                        locationObject[data[i].id] = data[i];
                    }
                    fbc.locations.dict = locationObject;

                    if ($.isFunction(successCallback)) {
                        successCallback(data);
                    }
                },
                error: function(xhr, status, error) {
                    if ($.isFunction(errorCallback)) {
                        errorCallback(xhr, status, error);
                    }
                }
            });
        },
        updateTable: function() {
            ///<summary>Update locations table</summary>
            var locations = fbc.locations.getList().slice();

            locations.sort(fbc.base.sorting.name);

            $('#locations-table')
                .children('tbody')
                .first()
                .html(
                    $.map(locations, function(elem) {
                        return $('<tr>', {
                            html: [
                                $('<td>', {
                                    text: elem.name
                                }),
                                $('<td>', {
                                    text:
                                        elem.latitude.length > 0 &&
                                        elem.longitude.length > 0
                                            ? 'lat:' +
                                              elem.latitude +
                                              ' long:' +
                                              elem.longitude
                                            : ''
                                }),
                                $('<td>', {
                                    html: $('<button>', {
                                        class: 'btn btn-primary',
                                        text: 'Show on map',
                                        click: function() {
                                            fbc.locations.showOnMap(elem);
                                        }
                                    })
                                })
                            ]
                        });
                    })
                );
        },
        showOnMap: function(location) {
            if (typeof location === 'number') {
                location = fbc.locations.dict[location];
            }

            fbc.base.openMapDialog({
                header: location.name,
                center: {
                    latitude: Number(location.latitude),
                    longitude: Number(location.longitude)
                },
                markCenter: true,
                closeButton: 'Close'
            });
        }
    };
})(fbc);

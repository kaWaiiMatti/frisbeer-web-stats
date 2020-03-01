class Location {
    constructor(object) {
        // constructor from API object
        this.id = object.id;
        this.name = object.name;

        this.coordinates = object.longitude !== null && object.latitude !== null
            ? {
                longitude: object.longitude,
                latitude: object.latitude
            }
            : null;
    }

    openDialog() {
        fbc.base.openMapDialog({
            header: this.name,
            center: {
                latitude: Number(this.coordinates.latitude),
                longitude: Number(this.coordinates.longitude)
            },
            markCenter: true,
            closeButton: 'Close'
        });
    }

    renderTableRow() {
        let location = this;

        return $('<tr>', {
            html: [
                $('<td>', {
                    text: this.name
                }),
                $('<td>', {
                    text: this.coordinates !== null ?
                        'long:' + this.coordinates.longitude + ' lat:' + this.coordinates.latitude
                        : ''
                }),
                $('<td>', {
                    html: this.coordinates !== null
                        ? $('<button>', {
                            class: 'btn btn-primary',
                            text: 'Show on map',
                            click: function () {
                                location.openDialog();
                            }
                        })
                        : ''
                })
            ]
        });
    }
}
class Dialog {
    constructor(options) {
        this.header = options.header;
        this.body = options.body;
        this.dialogShown = options.dialogShown;
        this.element = $('<div>', {
            class: 'modal fade',
            html: $('<div>', {
                class: 'modal-dialog',
                html: $('<div>', {
                    class: 'modal-content',
                    html: [
                        $('<div>', {
                            class: 'modal-header',
                            html: [
                                $('<button>', {
                                    type: 'button',
                                    class: 'close',
                                    'data-dismiss': 'modal',
                                    html: '&times;'
                                }),
                                $('<h4>', {
                                    class: 'modal-title',
                                    text: this.header
                                })
                            ]
                        }),
                        $('<div>', {
                            class: 'modal-body',
                            html: this.body
                        }),
                        $('<div>', {
                            class: 'modal-footer',
                            html: [
                                $('<button>', {
                                    type: 'button',
                                    class: 'btn btn-danger float-right',
                                    'data-dismiss': 'modal',
                                    text: 'Close'
                                })
                            ]
                        })
                    ]
                })
            })
        });

        let dialog = this;

        if ($.isFunction(this.dialogShown)) {
            this.element.one('shown.bs.modal', function () {
                dialog.dialogShown();
            });
        }

        this.element.one('hidden.bs.modal', function () {
            dialog.element.remove();
        });
    }

    open() {
        $('body').append(this.element);
        this.element.modal();
    }

    static renderStatsRow(text, value) {
        return $('<div>', {
            'class': 'row',
            html: [
                $('<div>', {
                    'class': 'col-xs-6',
                    html: $('<p>', {
                        text: text
                    })
                }),
                $('<div>', {
                    'class': 'col-xs-6',
                    html: $('<p>', {
                        text: value
                    })
                })
            ]
        })
    }
}

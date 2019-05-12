const fbc = {};

$(document).ready(function () {
    $.each(fbc, function () {
        if (
            this.hasOwnProperty('initialize') &&
            $.isFunction(this['initialize'])
        ) {
            this['initialize']();
        }
    });
});

(function (fbc) {

    fbc.data = {
        players: {},
        games: {},
        locations: {},
        seasons: {},
        updateStats: function () {
            fbc.players.updateTable();
            fbc.games.updateTable();
            fbc.locations.updateTable();
        }
    };

    fbc.base = {
        parameters: {
            server: 'https://api.frisbeer.win/API/',
            currentSeason: 4
        },

        ol: {
            zoom: 15,
            marker: $('<span>', {
                class: 'glyphicon glyphicon-map-marker'
            })[0]
        },

        initialize: function () {
            ///<summary>Common initializations</summary>
            $('.container-fluid')
                .children()
                .hide();

            $('[data-open-menu="true"]').click(fbc.base.menu.open);
            $('[data-toggle-menu="true"]').click(fbc.base.menu.toggle);
            $('[data-close-menu="true"]').click(fbc.base.menu.close);

            $('.side-menu > ul.menu-items').on(
                'click',
                'li > a',
                null,
                fbc.base.menu.click
            );

            var params = fbc.base.query.get();

            // Show tab based on url param or first as default
            if (
                params.hasOwnProperty('tab') &&
                $('.side-menu > ul.menu-items > li').find(
                    'a[data-target-tab="' + params['tab'] + '"]'
                ).length > 0
            ) {
                $('.side-menu > ul.menu-items > li')
                    .find('a[data-target-tab="' + params['tab'] + '"]')
                    .click();
            } else {
                $('.side-menu > ul.menu-items > li > a')
                    .first()
                    .click();
            }
        },

        updateData: function () {
            $.ajax({
                url: fbc.base.parameters.server + 'games/',
                method: 'GET',
                error: function () {
                    console.log('error loading games');
                },
                success: function (games) {
                    $.ajax({
                        url: fbc.base.parameters.server + 'players/',
                        method: 'GET',
                        error: function () {
                            console.log('error loading players');
                        },
                        success: function (players) {
                            $.ajax({
                                url: fbc.base.parameters.server + 'locations/',
                                method: 'GET',
                                error: function () {
                                    console.log('error loading locations');
                                },
                                success: function (locations) {

                                    locationsObject = {};
                                    locations.forEach(function (location) {
                                        locationsObject[location.id] = new Location(location);
                                    });

                                    playersObject = {};
                                    players.forEach(function (player) {
                                        playersObject[player.id] = new Player(player);
                                    });

                                    gamesObject = {};
                                    games.filter(game => game.state > 1).forEach(function (game) {
                                        gamesObject[game.id] = new Game(game);
                                    });

                                    fbc.data.locations = locationsObject;
                                    fbc.data.players = playersObject;
                                    fbc.data.games = gamesObject;

                                    fbc.data.updateStats();
                                }
                            });
                        }
                    });
                }
            });
        },

        menu: {
            open: function () {
                $('.side-menu').addClass('open');
            },
            close: function () {
                $('.side-menu').removeClass('open');
            },
            toggle: function () {
                $('.side-menu').toggleClass('open');
            },
            click: function (e) {
                var targetTabData = $(e.target).data();
                if (targetTabData.hasOwnProperty('targetTab')) {
                    var targetTab = targetTabData['targetTab'];

                    $('.container-fluid')
                        .children()
                        .hide();
                    var $target = $('.container-fluid').children(
                        '#' + targetTab
                    );
                    fbc.base.query.updateUrl({ tab: targetTab });
                    $target.show();
                }
                fbc.base.menu.close();
            }
        },

        cookies: {
            // found at http://www.w3schools.com/js/js_cookies.asp
            set: function (cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
                var expires = 'expires=' + d.toUTCString();
                document.cookie = cname + '=' + cvalue + '; ' + expires;
            },
            get: function (cname) {
                var name = cname + '=';
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return '';
            }
        },

        showDialog: function (options) {
            options = options || {};

            if (!options.hasOwnProperty('header')) {
                options.header = '';
            }

            if (!options.hasOwnProperty('body')) {
                options.body = [];
            }

            if (!options.hasOwnProperty('buttons')) {
                options.buttons = [];
            }

            if (!options.hasOwnProperty('closeButton')) {
                options.closeButton = null;
            }

            if (!options.hasOwnProperty('modalClasses')) {
                options.modalClasses = [];
            }

            if (!options.hasOwnProperty('dialogShown')) {
                options.dialogShown = null;
            }

            if (options.closeButton !== null) {
                options.buttons.push(
                    $('<button>', {
                        type: 'button',
                        class: 'btn btn-danger float-right',
                        'data-dismiss': 'modal',
                        text: options.closeButton
                    })
                );
            }

            var dialog = $('<div>', {
                class: 'modal fade',
                html: $('<div>', {
                    class: 'modal-dialog ' + options.modalClasses.join(' '),
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
                                        text: options.header
                                    })
                                ]
                            }),
                            $('<div>', {
                                class: 'modal-body',
                                html: [
                                    $('<div>', {
                                        html: options.body
                                    })
                                ]
                            }),
                            $('<div>', {
                                class: 'modal-footer',
                                html: [
                                    $('<div>', {
                                        html: options.buttons
                                    })
                                ]
                            })
                        ]
                    })
                })
            });

            if ($.isFunction(options.dialogShown)) {
                dialog.one('shown.bs.modal', function () {
                    options.dialogShown();
                });
            }

            dialog.one('hidden.bs.modal', function () {
                dialog.remove();
            });

            $('body').append(dialog);
            dialog.modal();
        },

        openMapDialog: function (options) {
            options = options || {};

            if (!options.hasOwnProperty('center')) {
                options.center = {
                    latitude: fbc.base.ol.defaultCenter.latitude,
                    longitude: fbc.base.ol.defaultCenter.longitude
                };
            }

            if (!options.hasOwnProperty('markCenter')) {
                options.overlayCoords = false;
            }

            if (!options.hasOwnProperty('modalClasses')) {
                options.modalClasses = ['modal-lg'];
            }

            var $map = $('<div>');

            if (!options.hasOwnProperty('dialogShown')) {
                options.dialogShown = function () {
                    var coords = ol.proj.fromLonLat([
                        options.center.longitude,
                        options.center.latitude
                    ]);

                    var map = new ol.Map({
                        layers: [
                            new ol.layer.Tile({
                                source: new ol.source.OSM()
                            })
                        ],
                        target: $map[0],
                        controls: ol.control.defaults({
                            attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                                collapsible: false
                            })
                        }),
                        view: new ol.View({
                            center: coords,
                            zoom: fbc.base.ol.zoom
                        })
                    });

                    if (options.markCenter) {
                        map.addOverlay(
                            new ol.Overlay({
                                position: coords,
                                positioning: 'bottom-center',
                                element: fbc.base.ol.marker,
                                stopEvent: false
                            })
                        );
                    }

                    if (
                        options.hasOwnProperty('mapClick') &&
                        $.isFunction(options.mapClick)
                    ) {
                        map.on('click', options.mapClick);
                    }
                };
            }

            var body = [];

            if (options.hasOwnProperty('beforeMap')) {
                $.each(options.beforeMap, function (index, element) {
                    body.push(element);
                });
            }

            body.push($map);

            if (options.hasOwnProperty('afterMap')) {
                $.each(options.afterMap, function (index, element) {
                    body.push(element);
                });
            }
            options.body = body;

            fbc.base.showDialog(options);
        },

        sorting: {
            score: function (a, b) {
                return a.score - b.score;
            },
            name: function (a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            },
            date: function (a, b) {
                return new Date(a.date) - new Date(b.date);
            }
        },

        query: {
            defaults: {
                tab: 'players',
                psort: 'score'
            },
            get: function (stringify) {
                var params = {};
                stringify = stringify || false;

                if (location.search.length > 0) {
                    $.each(location.search.substr(1).split('&'), function () {
                        var temp = this.split('=');
                        params[temp[0]] = temp[1];
                    });
                }

                return stringify
                    ? $.map(params, function (value, key) {
                        return key + '=' + value;
                    }).join('&')
                    : params;
            },
            updateUrl: function (parameters, callback) {
                if (typeof history.pushState !== 'undefined') {
                    return;
                }
                // TODO: SET PARAMETERS TO URL
                //location.search = '?' + $.param(params);

                var pageName = location.pathname.substr(
                    location.pathname.lastIndexOf('/') + 1
                );
                var updatedSearch = getSearchParameters(paramUpdate, true);

                var obj = {
                    search: updatedSearch,
                    page: pageName,
                    url: pageName + '?' + updatedSearch
                };
                history.pushState(obj, obj.page, obj.url);

                if ($.isFunction(callback)) {
                    callback(parameters);
                }
            }
        }
    };
})(fbc);

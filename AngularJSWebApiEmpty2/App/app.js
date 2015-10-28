var app;
(function () {
    'use strict';

    app = angular.module('app', [
        // Angular modules
        'ngAnimate',
        'ngRoute',
        'ui.select'

        // Custom modules

        // 3rd Party Modules
        
    ]);

    app.controller('playlistController', PlaylistController);

})();

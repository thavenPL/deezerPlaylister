/// <reference path="../Scripts/typings/angularjs/angular.d.ts"/>
var playlistController = (function () {
    function playlistController($scope) {
        this.availableSources = [new playlistSource('LP3 Top', 1), new playlistSource('LP3 all', 2)];
        $scope.ctrl = this;
        //$scope.availableSources = this.availableSources;
        //$scope.selectedSource = this.selectedSource; 
    }
    return playlistController;
})();
var playlistSource = (function () {
    function playlistSource(name, id) {
        this.name = name;
        this.id = id;
    }
    return playlistSource;
})();
//# sourceMappingURL=playlistController.js.map
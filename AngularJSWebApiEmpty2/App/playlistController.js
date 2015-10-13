/// <reference path="../Scripts/typings/angularjs/angular.d.ts"/>
var PlaylistController = (function () {
    function PlaylistController($http) {
        var _this = this;
        this.availableSources = [new PlaylistSource('LP3 Top', 1), new PlaylistSource('LP3 all', 2)];
        this.http = $http;
        this.http.get("/api/PlaylistCollection").success(function (data) { return _this.availableSources = data; });
    }
    PlaylistController.prototype.ItemSelected = function () {
        var _this = this;
        this.http.get("/api/PlaylistCollection", {
            params: { Id: this.selectedSource }
        }).success(function (data) { _this.pageSource = data; });
    };
    return PlaylistController;
})();
var PlaylistSource = (function () {
    function PlaylistSource(name, id) {
        this.Name = name;
        this.Id = id;
    }
    return PlaylistSource;
})();
//# sourceMappingURL=playlistController.js.map
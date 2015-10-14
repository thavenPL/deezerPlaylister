/// <reference path="../Scripts/typings/angularjs/angular.d.ts"/>
var PlaylistController = (function () {
    function PlaylistController($http) {
        var _this = this;
        this.AvailableSources = [new PlaylistSource('LP3 Top', 1), new PlaylistSource('LP3 all', 2)];
        this.http = $http;
        this.http.get("/api/PlaylistCollection").success(function (data) { return _this.AvailableSources = data; });
    }
    PlaylistController.prototype.ItemSelected = function () {
        var _this = this;
        this.http.get("/api/PlaylistCollection", {
            params: { Id: this.SelectedSource }
        }).success(function (data) {
            var html = jQuery.parseHTML(data);
            _this.PlaylistElements = $(html).find('#divCenter .boxNotowanie .BoxTrack').map(function (item, element) {
                var auth = $(element).find('.bArtist a').text();
                var tit = $(element).find('.bTitle a').text();
                var obj = { author: auth, title: tit };
                return obj;
            }).toArray();
        });
    };
    return PlaylistController;
})();
var PlaylistElement = (function () {
    function PlaylistElement() {
    }
    return PlaylistElement;
})();
var PlaylistSource = (function () {
    function PlaylistSource(name, id) {
        this.Name = name;
        this.Id = id;
    }
    return PlaylistSource;
})();
//# sourceMappingURL=playlistController.js.map
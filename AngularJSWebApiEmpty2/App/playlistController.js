/// <reference path="../Scripts/typings/angularjs/angular.d.ts"/>
var PlaylistController = (function () {
    function PlaylistController($http, $q) {
        var _this = this;
        this.AvailableSources = [new PlaylistSource('LP3 Top', 1), new PlaylistSource('LP3 all', 2)];
        this.http = $http;
        this.q = $q;
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
                var obj = new PlaylistElement(tit, auth);
                return obj;
            }).toArray();
            _this.PlaylistElements.forEach(function (value, index) {
                value.IsLoading = true;
                DZ.api('/search/track?q=' + encodeURI(value.Title) + '&strict=on', function (response) {
                    if (response != null && response.data != null && response.data.length > 0) {
                        response.data.forEach(function (item) { return value.DeezerItems.push(new DeezerItem(item.title, item.artist.name)); });
                        value.WasFound = true;
                        value.IsLoading = false;
                    }
                    else {
                        value.IsLoading = false;
                    }
                });
            });
        });
    };
    return PlaylistController;
})();
var PlaylistElement = (function () {
    function PlaylistElement(title, artist) {
        this.Selected = false;
        this.Title = title;
        this.Artist = artist;
        this.DeezerItems = new Array();
    }
    return PlaylistElement;
})();
var DeezerItem = (function () {
    function DeezerItem(artist, title) {
        this.Artist = artist;
        this.Title = title;
    }
    return DeezerItem;
})();
var PlaylistSource = (function () {
    function PlaylistSource(name, id) {
        this.Name = name;
        this.Id = id;
    }
    return PlaylistSource;
})();
//# sourceMappingURL=playlistController.js.map
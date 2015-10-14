/// <reference path="../Scripts/typings/angularjs/angular.d.ts"/>

class PlaylistController {
    AvailableSources: Array<PlaylistSource> = [new PlaylistSource('LP3 Top', 1), new PlaylistSource('LP3 all', 2)];
    SelectedSource: string;
    PageSource: string;

    http: angular.IHttpService;

    constructor($http: angular.IHttpService) {
        this.http = $http;

        this.http.get("/api/PlaylistCollection").success((data: Array<PlaylistSource>) => this.AvailableSources = data);
    }

    ItemSelected() {
        this.http.get("/api/PlaylistCollection", {
            params: { Id: this.SelectedSource }
        }).success((data: string) => {
            var html = jQuery.parseHTML(data);
            this.PlaylistElements = $(html).find('#divCenter .boxNotowanie .BoxTrack').map((item, element) => {
                var auth = $(element).find('.bArtist a').text();
                var tit = $(element).find('.bTitle a').text();
                var obj = { author: auth, title: tit };
                return obj;
            }).toArray();
        });
    }

    PlaylistElements: Array<PlaylistElement>;
}

class PlaylistElement {
    Title: string;
    Artist: string;
}

class PlaylistSource {
    Name: string;
    Id: number;
    Parser: string;

    constructor(name: string, id: number) {
        this.Name = name;
        this.Id = id;
    }
}

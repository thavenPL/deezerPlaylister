﻿/// <reference path="../Scripts/typings/angularjs/angular.d.ts"/>
declare var DZ;

class PlaylistController {
    AvailableSources: Array<PlaylistSource> = [new PlaylistSource('LP3 Top', 1), new PlaylistSource('LP3 all', 2)];
    SelectedSource: string;
    PageSource: string;

    http: angular.IHttpService;
    q: angular.IQService;

    constructor($http: angular.IHttpService, $q: angular.IQService) {
        this.http = $http;
        this.q = $q;

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
                var obj = new PlaylistElement(tit, auth);
                return obj;
            }).toArray();

            this.PlaylistElements.forEach((value, index) =>
            {
                value.IsLoading = true;
                DZ.api('/search/track?q=' + encodeURI(value.Title) + '&strict=on', function (response) {
                    if (response != null && response.data != null && response.data.length > 0) {
                        response.data.forEach(item => value.DeezerItems.push(new DeezerItem(item.title, item.artist.name)));
                        value.WasFound = true;
                        value.IsLoading = false;
                    }
                    else {
                        value.IsLoading = false;
                    }
                });
            });
        });
    }

    PlaylistElements: Array<PlaylistElement>;
}

class PlaylistElement {
    constructor(title: string, artist: string) {
        this.Title = title;
        this.Artist = artist;
        this.DeezerItems = new Array<DeezerItem>();
    }

    Title: string;
    Artist: string;
    Selected: boolean = false;
    DeezerItems: Array<DeezerItem>;
    SelectedItemId: number;
//    DeezerTitle: string;
//    DeezerArtist: string;
    IsLoading: boolean;
    WasFound: boolean;
}

class DeezerItem {
    Id: number;
    Artist: string;
    Title: string; 
    ImageUrl: string;
    
    constructor(artist: string, title: string) {
        this.Artist = artist;
        this.Title = title;
    } 
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

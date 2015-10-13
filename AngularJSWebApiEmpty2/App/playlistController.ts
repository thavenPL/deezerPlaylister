/// <reference path="../Scripts/typings/angularjs/angular.d.ts"/>

class PlaylistController {
    availableSources: Array<PlaylistSource> = [new PlaylistSource('LP3 Top', 1), new PlaylistSource('LP3 all', 2)]
    selectedSource: string
    pageSource: string

    http: angular.IHttpService;

    constructor($http: angular.IHttpService) {
        this.http = $http;

        this.http.get("/api/PlaylistCollection").success((data: Array<PlaylistSource>) => this.availableSources = data);
    }

    ItemSelected() {
        this.http.get("/api/PlaylistCollection", {
            params: { Id: this.selectedSource }
        }).success((data: string) => { this.pageSource = data })
    }
}

class PlaylistSource {
    Name: string;
    Id: number;

    constructor(name: string, id: number) {
        this.Name = name;
        this.Id = id; 
    }
}

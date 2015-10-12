/// <reference path="../Scripts/typings/angularjs/angular.d.ts"/>

class playlistController {
    availableSources: Array<playlistSource> = [new playlistSource('LP3 Top',1), new playlistSource('LP3 all',2)]
    selectedSource: playlistSource

    constructor($scope) {
        $scope.ctrl = this;
        //$scope.availableSources = this.availableSources;
        //$scope.selectedSource = this.selectedSource; 
    }
}

class playlistSource {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id; 
    }
}

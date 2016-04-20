"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require('angular2/http');
var core_1 = require('angular2/core');
var GifSearch = (function () {
    function GifSearch(http) {
        this.http = http;
        this.numberOfScrollRequests = 1;
    }
    GifSearch.prototype.searchForGif = function () {
        var _this = this;
        this.numberOfScrollRequests += 1;
        var search = new http_1.URLSearchParams();
        search.set('q', "" + this.searchParameter);
        search.set('api_key', 'dc6zaTOxFJmzC');
        search.set('offset', "" + this.numberOfScrollRequests * 100);
        search.set('limit', '100');
        this.http.get('http://api.giphy.com/v1/gifs/search?', { search: search })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { _this.gifs = data; }, function (err) { return console.error(err); }, function () { return console.log('done'); });
    };
    GifSearch.prototype.getSearchResults = function (searchTerms) {
        this.searchParameter = searchTerms;
        this.searchForGif();
    };
    GifSearch = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GifSearch);
    return GifSearch;
}());
exports.GifSearch = GifSearch;

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
var ionic_angular_1 = require('ionic-angular');
var http_1 = require('angular2/http');
require('rxjs/add/operator/map');
var gif_details_1 = require('../gif-details/gif-details');
var gif_search_service_1 = require('../../search/gif-search.service');
var gif_trending_service_1 = require('../../trending/gif-trending.service');
var GifListPage = (function () {
    function GifListPage(nav, navParams, http, _gifSearch, _trendingGifs) {
        this.nav = nav;
        this.http = http;
        this._gifSearch = _gifSearch;
        this._trendingGifs = _trendingGifs;
        this.numberOfScrollRequests = 1;
        this.getUnicorns();
    }
    GifListPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            _this.getUnicorns();
        }, 500);
    };
    GifListPage.prototype.getUnicorns = function () {
        this._gifSearch.getSearchResults('unicorns');
    };
    GifListPage.prototype.searchGiphy = function (searchbar) {
        this._gifSearch.getSearchResults(searchbar.value);
    };
    GifListPage.prototype.searchForTrendingGifs = function () {
        this._trendingGifs.getTrendingGifs();
    };
    GifListPage.prototype.gifTapped = function (event, gif) {
        this.nav.push(gif_details_1.GifDetailsPage, {
            gif: gif
        });
    };
    GifListPage = __decorate([
        ionic_angular_1.Page({
            selector: 'GifListPage',
            templateUrl: 'build/pages/gifs/gif-list/gif-list.html',
            providers: [gif_search_service_1.GifSearch, gif_trending_service_1.TrendingGifs]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.NavParams, http_1.Http, gif_search_service_1.GifSearch, gif_trending_service_1.TrendingGifs])
    ], GifListPage);
    return GifListPage;
}());
exports.GifListPage = GifListPage;

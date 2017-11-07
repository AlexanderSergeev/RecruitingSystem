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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var WishListService = /** @class */ (function () {
    function WishListService(http) {
        this.http = http;
    }
    WishListService.prototype.getWishList = function () {
        return this.http
            .get('/api/wishlist')
            .map(function (res) { return res.json(); });
    };
    WishListService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    WishListService.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return Observable_1.Observable.throw(error.message || error);
    };
    WishListService.prototype.addToWishList = function (idCar) {
        var body = {
            CarId: idCar
        };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('/api/wishlist', body, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    };
    WishListService.prototype.deleteFromWishList = function (idCar) {
        return this.http.delete('/api/wishlist/' + idCar)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    };
    WishListService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], WishListService);
    return WishListService;
}());
exports.WishListService = WishListService;
//# sourceMappingURL=wishlist.service.js.map
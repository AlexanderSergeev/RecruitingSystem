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
var DemandsService = /** @class */ (function () {
    function DemandsService(http) {
        this.http = http;
    }
    DemandsService.prototype.getDemands = function () {
        return this.http
            .get('/api/demands')
            .map(function (res) { return res.json(); });
    };
    DemandsService.prototype.getDemand = function (id) {
        return this.http
            .get('/api/demands/' + id)
            .map(function (res) {
            return res.json();
        });
    };
    DemandsService.prototype.addDemand = function (name, demandStatus, demandLocation) {
        var json = JSON.stringify({
            Name: name,
            DemandStatus: demandStatus,
            DemandLocation: demandLocation
        });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post('/api/demands', json, { headers: headers })
            .map(function (resp) { return resp.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    DemandsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], DemandsService);
    return DemandsService;
}());
exports.DemandsService = DemandsService;
//# sourceMappingURL=demands.service.js.map
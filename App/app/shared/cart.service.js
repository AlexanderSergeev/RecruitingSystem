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
require("rxjs/add/operator/map");
var CartService = /** @class */ (function () {
    function CartService(http) {
        this.http = http;
    }
    CartService.prototype.getCart = function () {
        return this.http
            .get('/api/cart')
            .map(function (res) { return res.json(); });
    };
    CartService.prototype.addToCart = function (idCar) {
        var xhr = new XMLHttpRequest();
        var json = JSON.stringify({
            CarId: idCar
        });
        xhr.open('POST', '/api/cart', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4)
                return;
            if (xhr.status === 200 || xhr.status === 204) {
                alert("Adding successful");
            }
            else {
                alert(xhr.status + ': ' + xhr.statusText);
            }
        };
    };
    CartService.prototype.clearCart = function () {
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/api/cart/', true);
        xhr.send();
    };
    CartService.prototype.deleteFromCart = function (idCar, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/api/cart/' + idCar, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4)
                return;
            if (xhr.status === 200 || xhr.status === 204) {
                callback();
            }
            else {
                alert(xhr.status + ': ' + xhr.statusText);
            }
        };
    };
    CartService.prototype.addToPurchase = function (name, address, callback) {
        var xhr = new XMLHttpRequest();
        var json = JSON.stringify({
            Name: name,
            OrderAddress: address
        });
        xhr.open('POST', '/api/cart/purchase', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4)
                return;
            if (xhr.status === 200 || xhr.status === 204) {
                alert("Purchase successful");
                callback();
            }
            else {
                alert(xhr.status + ': ' + xhr.statusText);
            }
        };
    };
    CartService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], CartService);
    return CartService;
}());
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map
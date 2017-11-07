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
var demands_service_1 = require("../shared/demands.service");
var router_1 = require("@angular/router");
var cart_service_1 = require("../shared/cart.service");
var wishlist_service_1 = require("../shared/wishlist.service");
var DemandComponent = /** @class */ (function () {
    function DemandComponent(demandsService, cartService, wishListService, route, router) {
        this.demandsService = demandsService;
        this.cartService = cartService;
        this.wishListService = wishListService;
        this.route = route;
        this.router = router;
        this.candidates = [];
    }
    DemandComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.demandsService.getDemand(id).subscribe(function (res) {
                _this.candidates = res;
            });
        });
    };
    DemandComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    DemandComponent.prototype.addToCart = function (idCar) {
        this.cartService.addToCart(idCar);
    };
    DemandComponent.prototype.addToWishList = function (idCar) {
        this.wishListService.addToWishList(idCar).subscribe(function () {
            alert("Adding successful");
        });
    };
    DemandComponent = __decorate([
        core_1.Component({
            selector: 'demand',
            template: "\n    <div class=\"panel\">\n        <table class=\"table table-striped\">\n            <thead>\n                <tr>\n                    <th>\u0418\u043C\u044F</th>\n                    <th>\u0424\u0430\u043C\u0438\u043B\u0438\u044F</th> \n                    <th>\u041E\u0442\u0447\u0435\u0441\u0442\u0432\u043E</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let candidate of candidates\">\n                    <td>{{candidate.Name}}</td>\n                    <td>{{candidate.Surname}}</td>\n                    <td>{{candidate.Patronym}}</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>",
            providers: [demands_service_1.DemandsService, cart_service_1.CartService, wishlist_service_1.WishListService]
        }),
        __metadata("design:paramtypes", [demands_service_1.DemandsService, cart_service_1.CartService, wishlist_service_1.WishListService, router_1.ActivatedRoute, router_1.Router])
    ], DemandComponent);
    return DemandComponent;
}());
exports.DemandComponent = DemandComponent;
//# sourceMappingURL=demand.component.js.map
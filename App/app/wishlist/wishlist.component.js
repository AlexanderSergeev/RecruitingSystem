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
var cart_service_1 = require("../shared/cart.service");
var wishlist_service_1 = require("../shared/wishlist.service");
var WishListComponent = /** @class */ (function () {
    function WishListComponent(wishListService, cartService) {
        this.wishListService = wishListService;
        this.cartService = cartService;
        this.wishList = [];
    }
    WishListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.wishListService.getWishList().subscribe(function (res) {
            _this.wishList = res;
        });
    };
    WishListComponent.prototype.remove = function (carId) {
        var wishListComponent = this;
        this.wishListService.deleteFromWishList(carId).subscribe(function () {
            var index = wishListComponent.wishList.findIndex(function (car) { return car.Id === carId; });
            wishListComponent.wishList.splice(index, 1);
        });
    };
    WishListComponent.prototype.addToCart = function (idCar) {
        this.cartService.addToCart(idCar);
    };
    WishListComponent = __decorate([
        core_1.Component({
            selector: 'list-wish',
            template: "\n    <div class=\"panel\">\n        <table class=\"table table-striped\">\n            <thead>\n                <tr>\n                    <th>\u2116</th> \n                    <th>Picture</th>\n                    <th>Name</th> \n                    <th>VehiclePower</th>\n                    <th>MaximumSpeed</th>\n                    <th>Price</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let car of wishList; let i = index\">\n                    <td>{{i+1}}</td>\n                    <td><img src = \"{{car.Picture}}\" width=\"100\" height=\"80\"></td>\n                    <td>{{car.Name}}</td>\n                    <td>{{car.VehiclePower}} PS</td>\n                    <td>{{car.MaximumSpeed}} km/h</td>\n                    <td>{{car.Price}} $</td>\n                    <td><a (click)=\"addToCart(car.Id)\" class=\"btn btn-success\" role=\"button\">Add to cart</a>\n                        <a (click)=\"remove(car.Id)\" class=\"btn btn-info\" role=\"button\">Remove</a></td>\n                </tr>\n            </tbody>\n        </table>\n    </div>",
            providers: [cart_service_1.CartService, wishlist_service_1.WishListService]
        }),
        __metadata("design:paramtypes", [wishlist_service_1.WishListService, cart_service_1.CartService])
    ], WishListComponent);
    return WishListComponent;
}());
exports.WishListComponent = WishListComponent;
//# sourceMappingURL=wishlist.component.js.map
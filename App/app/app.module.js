"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var demands_component_1 = require("./demands/demands.component");
var demand_component_1 = require("./demands/demand.component");
var app_routes_1 = require("./app.routes");
var demands_service_1 = require("./shared/demands.service");
var cart_service_1 = require("./shared/cart.service");
var wishlist_service_1 = require("./shared/wishlist.service");
var app_component_1 = require("./app.component");
var cart_component_1 = require("./cart/cart.component");
var wishlist_component_1 = require("./wishlist/wishlist.component");
var demandForm_component_1 = require("./demands/demandForm.component");
var forms_1 = require("@angular/forms");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, app_routes_1.appRouterModule, forms_1.FormsModule],
            declarations: [demands_component_1.DemandsComponent, demand_component_1.DemandComponent, wishlist_component_1.WishListComponent, cart_component_1.CartComponent, app_component_1.AppComponent, demandForm_component_1.DemandFormComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [demands_service_1.DemandsService, cart_service_1.CartService, wishlist_service_1.WishListService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
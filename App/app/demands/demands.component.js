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
var DemandsComponent = /** @class */ (function () {
    function DemandsComponent(demandsService) {
        this.demandsService = demandsService;
        this.demands = [];
    }
    DemandsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.demandsService.getDemands().subscribe(function (res) {
            _this.demands = res;
        });
    };
    DemandsComponent = __decorate([
        core_1.Component({
            selector: 'list-demands',
            template: " \n    <div style=\"overflow:auto; height:480px;\" id=\"list-demands\" class=\"panel\">\n        <table class=\"table table-striped\">\n            <thead>\n                <tr>\n                    <th>\u0418\u043C\u044F</th>\n                    <th>\u0421\u0442\u0430\u0442\u0443\u0441</th>\n                    <th>\u041B\u043E\u043A\u0430\u0446\u0438\u044F</th> \n                    <th></th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let demand of demands\">\n                    <td>{{demand.Name}}</td>\n                    <td>{{demand.DemandStatus}}</td>\n                    <td>{{demand.DemandLocation}}</td>\n                    <td><a [routerLink]=\"['/demands', demand.Id] \">\u0421\u043F\u0438\u0441\u043E\u043A \u043A\u0430\u043D\u0434\u0438\u0434\u0430\u0442\u043E\u0432</a></td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n    <button [routerLink]=\"['/demands/form']\" class=\"btn btn-success\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>\n    <div id=\"popup\">\n        <router-outlet></router-outlet>\n    </div>",
            providers: [demands_service_1.DemandsService]
        }),
        __metadata("design:paramtypes", [demands_service_1.DemandsService])
    ], DemandsComponent);
    return DemandsComponent;
}());
exports.DemandsComponent = DemandsComponent;
//# sourceMappingURL=demands.component.js.map
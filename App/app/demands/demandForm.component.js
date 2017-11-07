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
var demands_component_1 = require("./demands.component");
var DemandFormComponent = /** @class */ (function () {
    function DemandFormComponent(demandsService, demandsComponent) {
        this.demandsService = demandsService;
        this.demandsComponent = demandsComponent;
    }
    DemandFormComponent.prototype.addDemand = function (name, demandStatus, demandLocation) {
        var _this = this;
        this.demandsService.addDemand(name, demandStatus, demandLocation).subscribe(function (data) {
            _this.demandsComponent.demands.push(data);
            var listDemands = document.getElementById('list-demands');
            listDemands.scrollTop = listDemands.scrollHeight + 1;
        });
    };
    DemandFormComponent = __decorate([
        core_1.Component({
            template: "\n    <form #myForm=\"ngForm\" novalidate>\n        <div class=\"row\">\n            <div class=\"col-md-4\">\n                  <h4>\u041D\u043E\u0432\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441</h4>\n                  <br>\n                  <div class=\"form-group\">\n                     <label class=\"col-md-6 control-label\">\u0418\u043C\u044F: </label>\n                     <div class=\"col-md-10\">\n                        <input class=\"form-control\" name=\"Name\" [(ngModel)]=\"Name\" required />\n                     </div>\n                 </div>\n                 <div class=\"form-group\">\n                    <label class=\"col-md-6 control-label\">\u0421\u0442\u0430\u0442\u0443\u0441: </label>\n                    <div class=\"col-md-10\">\n                        <input class=\"form-control\" name=\"DemandStatus\" [(ngModel)]=\"DemandStatus\" required />\n                    </div>\n                 </div>\n                <div class=\"form-group\">\n                    <label class=\"col-md-6 control-label\">\u041B\u043E\u043A\u0430\u0446\u0438\u044F: </label>\n                    <div class=\"col-md-10\">\n                        <input class=\"form-control\" name=\"DemandLocation\" [(ngModel)]=\"DemandLocation\" />\n                    </div>\n                 </div>\n                <div class=\"form-group\">\n                    <div class=\"col-md-10\">\n                        <br>\n                        <button [routerLink]=\"['/demands']\" [disabled]=\"myForm.invalid\" (click)=\"addDemand(Name, DemandStatus, DemandLocation)\" class=\"btn btn-primary\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>",
            providers: [demands_service_1.DemandsService]
        }),
        __metadata("design:paramtypes", [demands_service_1.DemandsService, demands_component_1.DemandsComponent])
    ], DemandFormComponent);
    return DemandFormComponent;
}());
exports.DemandFormComponent = DemandFormComponent;
//# sourceMappingURL=demandForm.component.js.map
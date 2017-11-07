"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var demand_component_1 = require("./demands/demand.component");
var demands_component_1 = require("./demands/demands.component");
var demandForm_component_1 = require("./demands/demandForm.component");
var routes = [
    {
        path: '', redirectTo: 'demands', pathMatch: 'full'
    },
    {
        path: 'demands', component: demands_component_1.DemandsComponent,
        children: [
            {
                path: 'form', component: demandForm_component_1.DemandFormComponent,
            },
        ]
    },
    {
        path: 'demands/:id', component: demand_component_1.DemandComponent,
    },
    {
        path: '**', redirectTo: 'demands', pathMatch: 'full'
    }
];
exports.appRouterModule = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map
import { Component, OnInit } from '@angular/core';
import { DemandsService } from '../shared/demands.service';
import { Demand } from '../shared/demand';

@Component({
    selector: 'list-demands',
    template: ` 
    <div style="overflow:auto; height:480px;" id="list-demands" class="panel">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Статус</th>
                    <th>Локация</th> 
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let demand of demands">
                    <td>{{demand.Name}}</td>
                    <td>{{demand.DemandStatus}}</td>
                    <td>{{demand.DemandLocation}}</td>
                    <td><a [routerLink]="['/demands', demand.Id] ">Список кандидатов</a></td>
                </tr>
            </tbody>
        </table>
    </div>
    <button [routerLink]="['/demands/form']" class="btn btn-success">Добавить</button>
    <div id="popup">
        <router-outlet></router-outlet>
    </div>`,
    providers: [DemandsService]
})
export class DemandsComponent implements OnInit {

    demands: Array<Demand> = [];

    constructor(private demandsService: DemandsService) { }
    ngOnInit() {
        this.demandsService.getDemands().subscribe(res => {
            this.demands = res;
        });
    }
}

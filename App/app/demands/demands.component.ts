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
                    <th>Название</th>
                    <th>Локация</th>
                    <th></th> 
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let demand of demands">
                    <td>{{demand.Name}}</td>
                    <td *ngIf="demand.DemandLocation==null || demand.DemandLocation=='';else unset">
                        N/А
                    </td>
                    <ng-template #unset>  
                        <td>{{demand.DemandLocation}}</td>  
                    </ng-template>
                    <td><a [routerLink]="['/demands', demand.Id]">Сотрудники</a></td>
                    <td>
                        <button (click)="convertToVacancy(demand);" class="btn btn-success">Конвертировать в вакансию</button>
                        <button (click)="popUpShow();" [routerLink]="['/demands/form', demand.Id]" style="margin-left:5px;" class="btn btn-info">Редактировать</button>
                        <button (click)="remove(demand.Id);" style="margin-left:5px;" class="btn btn-danger">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <button (click)="popUpShow();" [routerLink]="['/demands/form', 0]" class="btn btn-primary">Добавить</button>
	
	<div hidden="hidden" class="b-popup" id="popup1">
		<div class="b-popup-content">
			<router-outlet></router-outlet>
		</div>
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
	
	popUpShow() {
        document.getElementById("popup1").style.display = "block";
    }

    remove(id: number) {
        const demandsComponent = this;
        this.demandsService.remove(id).subscribe(function () {
            let index = demandsComponent.demands.findIndex(d => d.Id == id);
            demandsComponent.demands.splice(index, 1);
        });
    }

    convertToVacancy(demand: Demand) {
        const demandsComponent = this;
        this.demandsService.convertToVacancy(demand).subscribe(function () {
            let index = demandsComponent.demands.findIndex(d => d.Id == demand.Id);
            demandsComponent.demands.splice(index, 1);
        });
    }
}

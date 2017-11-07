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
    <button (click)="popUpShow();" [routerLink]="['/demands/form']" class="btn btn-success">Добавить</button>
	
	<style>
	  .b-popup {
		width: 100%;
		min-height: 100%;
		background-color: rgba(0,0,0,0.5);
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10000;
	}

	.b-popup .b-popup-content {
		margin: 200px auto 0 auto;
		height: 100%;
		max-width: 350px;
		max-height: 400px;
		padding: 8px;
		background-color: #ffffff;
		border-radius: 5px;
		box-shadow: 0 0 10px #000;
	}
	</style>
	
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
}

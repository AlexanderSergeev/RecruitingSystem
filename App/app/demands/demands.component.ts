import { Component, OnInit } from '@angular/core';
import { DemandsService } from '../shared/demands.service';
import { Demand } from '../shared/demand';
import { LoginService } from '../shared/login.service';

@Component({
    selector: 'list-demands',
    template: ` 
    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <span *ngIf="userRole!=='Technical'">
                    <a [routerLink]="['/demands']" class="navbar-brand">Запросы</a>
                </span>
                <span *ngIf="userRole!=='Technical' && userRole!=='ProjectManager'">
                    <a [routerLink]="['/vacancies']" class="navbar-brand">Вакансии</a>
                </span>
                <span *ngIf="userRole!=='Technical' && userRole!=='ProjectManager' && userRole!=='Director'">
                    <a [routerLink]="['/staff']" class="navbar-brand">Сотрудники</a>
                </span>
                <span *ngIf="userRole!=='ProjectManager' && userRole!=='Director'">
                    <a [routerLink]="['/candidates']" class="navbar-brand">Кандидаты</a>
                </span>
                <span>
                    <a [routerLink]="['/login']" class="navbar-brand">Выйти</a>
                </span>
            </div>
        </div>
    </div> 
    <div *ngIf="userRole!=='Technical'" style="overflow:auto;" id="list-demands" class="panel">
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
                        <button *ngIf="userRole!=='HR' && userRole!=='Director'" (click)="convertToVacancy(demand);" class="btn btn-success">Конвертировать в вакансию</button>
                        <button (click)="popUpShow();" [routerLink]="['/demands/form', demand.Id]" style="margin-left:5px;" class="btn btn-info">Редактировать</button>
                        <button *ngIf="userRole!=='HR' && userRole!=='Director'" (click)="remove(demand.Id);" style="margin-left:5px;" class="btn btn-danger">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <button *ngIf="userRole!=='Technical' && userRole!=='HR' && userRole!=='Director'" (click)="popUpShow();" [routerLink]="['/demands/form', 0]" class="btn btn-primary">Добавить</button>
	
	<div hidden="hidden" class="b-popup" id="popup1">
		<div class="b-popup-content">
			<router-outlet></router-outlet>
		</div>
	</div>`,
    providers: [DemandsService]
})
export class DemandsComponent implements OnInit {

    demands: Array<Demand> = [];
    userRole: string; 

    constructor(private demandsService: DemandsService, private loginService: LoginService) { }
    ngOnInit() {
        this.loginService.getCurrentUserRole().subscribe(res => {
                this.userRole = res;
            },
            error => {
                alert(error.statusText);
            },
            () => {
                this.demandsService.getDemands().subscribe(res => {
                        this.demands = res;
                    },
                    error => {
                        alert(error.statusText);
                    });
            });
    }
	
	popUpShow() {
        document.getElementById("popup1").style.display = "block";
    }

    remove(id: number) {
        const demandsComponent = this;
        this.demandsService.remove(id).subscribe(
            result => {
            },
            error => {
                alert(error.statusText);
            },
            () => {
                let index = demandsComponent.demands.findIndex(d => d.Id == id);
                demandsComponent.demands.splice(index, 1);
            }
        );
    }

    convertToVacancy(demand: Demand) {
        const demandsComponent = this;
        this.demandsService.convertToVacancy(demand).subscribe(
            result => {
            },
            error => {
                alert(error.statusText);
            },
            () => {
                let index = demandsComponent.demands.findIndex(d => d.Id == demand.Id);
                demandsComponent.demands.splice(index, 1);
            }
        );
    }
}

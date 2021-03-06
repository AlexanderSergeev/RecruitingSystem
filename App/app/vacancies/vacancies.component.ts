﻿import { Component, OnInit } from '@angular/core';
import { VacanciesService } from '../shared/vacancies.service';
import { LoginService } from '../shared/login.service';
import { Vacancy } from '../shared/vacancy';

@Component({
    selector: 'list-vacancies',
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
    <div *ngIf="userRole!=='Technical' && userRole!=='ProjectManager'" style="overflow:auto;" id="list-vacancies" class="panel">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Статус</th>
                    <th>Локация</th> 
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let vacancy of vacancies">
                    <td>{{vacancy.Name}}</td>
                    <td>
                        <span *ngIf="vacancy.VacancyStatus===0">Открыта</span>
                        <span *ngIf="vacancy.VacancyStatus===1">Ожидает решения</span>
                        <span *ngIf="vacancy.VacancyStatus===2">Закрыта</span>
                    </td>
                    <td *ngIf="vacancy.VacancyLocation==null || vacancy.VacancyLocation=='';else unset">
                        N/А
                    </td>
                    <ng-template #unset>  
                        <td>{{vacancy.VacancyLocation}}</td>  
                    </ng-template>
                    <td><a [routerLink]="['/vacancies', vacancy.Id]">Кандидаты</a></td>
                    <td>
                        <button (click)="popUpShow();" [routerLink]="['/vacancies/form', vacancy.Id]" class="btn btn-info">Редактировать</button>
                        <button *ngIf="userRole!=='HR'" (click)="remove(vacancy.Id);" style="margin-left:5px;" class="btn btn-danger">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <button *ngIf="userRole!=='Technical' && userRole!=='ProjectManager' && userRole!=='HR'" (click)="popUpShow();" [routerLink]="['/vacancies/form', 0]" class="btn btn-primary">Добавить</button>
	
	<div hidden="hidden" class="b-popup" id="popupVacancy">
		<div class="b-popup-content">
			<router-outlet></router-outlet>
		</div>
	</div>`,
    providers: [VacanciesService]
})
export class VacanciesComponent implements OnInit {

    vacancies: Array<Vacancy> = [];
    userRole: string; 

    constructor(private vacanciesService: VacanciesService, private loginService: LoginService) { }
    ngOnInit() {
        this.loginService.getCurrentUserRole().subscribe(res => {
                this.userRole = res;
            },
            error => {
                alert(error.statusText);
            },
            () => {
                this.vacanciesService.getVacancies().subscribe(res => {
                        this.vacancies = res;
                    },
                    error => {
                        alert(error.statusText);
                    });
            });
    }
	
	popUpShow() {
        document.getElementById("popupVacancy").style.display = "block";
    }

    remove(id: number) {
        const vacanciesComponent = this;
        this.vacanciesService.remove(id).subscribe(
            result => {
            },
            error => {
                alert(error.statusText);
            },
            () => {
                let index = vacanciesComponent.vacancies.findIndex(d => d.Id == id);
                vacanciesComponent.vacancies.splice(index, 1);
            }
        );
    }
}

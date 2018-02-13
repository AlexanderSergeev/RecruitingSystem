import { Component, OnInit } from '@angular/core';
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
                <a [routerLink]="['/demands']" class="navbar-brand">Запросы</a>
                <a [routerLink]="['/vacancies']" class="navbar-brand">Вакансии</a>
                <a [routerLink]="['/staff']" class="navbar-brand">Сотрудники</a>
                <a [routerLink]="['/candidates']" class="navbar-brand">Кандидаты</a>
            </div>
        </div>
    </div>  
    <div style="overflow:auto;" id="list-vacancies" class="panel">
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
                        <button (click)="popUpShow();" [routerLink]="['/vacancies/form', vacancy.Id]" class="btn btn-info editVacancy">Редактировать</button>
                        <button (click)="remove(vacancy.Id);" style="margin-left:5px;" class="btn btn-danger deleteVacancy">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <button (click)="popUpShow();" [routerLink]="['/vacancies/form', 0]" class="btn btn-primary addVacancy">Добавить</button>
	
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
                switch (this.userRole) {
                case "Administrator":  
                case "Director":  
                    break;
                default:
                {
                    let arr1 = document.getElementsByClassName("btn btn-info editVacancy");
                    for (let i = 0; i < arr1.length; i++) {
                        alert('edirt' + i);
                        arr1[i].setAttribute('disabled', 'disabled');
                    }
                    let arr2 = document.getElementsByClassName("addVacancy");
                    for (let i = 0; i < arr2.length; i++) {
                        alert('add'+i);
                        arr2[i].setAttribute('disabled', 'disabled');
                    }
                    let arr3 = document.getElementsByClassName("deleteVacancy");
                    for (let i = 0; i < arr3.length; i++) {
                        alert('del'+i);
                        arr3[i].setAttribute('disabled', 'disabled');
                    }
                    break;
                }
                }

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

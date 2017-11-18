import { Component, OnInit } from '@angular/core';
import { VacanciesService } from '../shared/vacancies.service';
import { Vacancy } from '../shared/vacancy';

@Component({
    selector: 'list-vacancies',
    template: ` 
    <div style="overflow:auto; height:480px;" id="list-vacancies" class="panel">
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
                    <td>{{vacancy.VacancyStatus}}</td>
                    <td *ngIf="vacancy.VacancyLocation==null || vacancy.VacancyLocation=='';else unset">
                        N/А
                    </td>
                    <ng-template #unset>  
                        <td>{{vacancy.VacancyLocation}}</td>  
                    </ng-template>
                    <td><a [routerLink]="['/vacancies', vacancy.Id] ">Список кандидатов</a></td>
                    <td>
                        <button (click)="popUpShow();" [routerLink]="['/vacancies/form', vacancy.Id]" class="btn btn-success">Редактировать</button>
                        <button (click)="remove(vacancy.Id);" style="margin-left:5px;" class="btn btn-success">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <button (click)="popUpShow();" [routerLink]="['/vacancies/form', 0]" class="btn btn-primary">Добавить</button>
	
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
	
	<div hidden="hidden" class="b-popup" id="popupVacancy">
		<div class="b-popup-content">
			<router-outlet></router-outlet>
		</div>
	</div>`,
    providers: [VacanciesService]
})
export class VacanciesComponent implements OnInit {

    vacancies: Array<Vacancy> = [];

    constructor(private vacanciesService: VacanciesService) { }
    ngOnInit() {
        this.vacanciesService.getVacancies().subscribe(res => {
            this.vacancies = res;
        });
    }
	
	popUpShow() {
        document.getElementById("popupVacancy").style.display = "block";
    }

    remove(id: number) {
        const vacanciesComponent = this;
        this.vacanciesService.remove(id).subscribe(function () {
            let index = vacanciesComponent.vacancies.findIndex(d => d.Id == id);
            vacanciesComponent.vacancies.splice(index, 1);
        });
    }
}

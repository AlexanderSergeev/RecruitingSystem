import { Component, OnInit, OnDestroy } from '@angular/core';
import { VacanciesService } from '../shared/vacancies.service';
import { Candidate } from '../shared/candidate';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'vacancy',
    template: `
    <div style="overflow:auto; height:480px;" id="list-vacancies-candidates" class="panel">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th></th>
                    <th>Имя</th>
                    <th>Фамилия</th> 
                    <th>Отчество</th>
                    <th>Резюме</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let candidate of candidates">
                    <td *ngIf="candidate.Checked!=null && candidate.Checked else unset">
                        <input type="checkbox" checked>
                    </td>
                    <ng-template #unset>  
                        <td><input type="checkbox"></td> 
                    </ng-template>
                    <td>{{candidate.Name}}</td>
                    <td>{{candidate.Surname}}</td>
                    <td *ngIf="candidate.Patronym==null || candidate.Patronym=='' else unset1">
                        N/А
                    </td>
                    <ng-template #unset1>  
                        <td>{{candidate.Patronym}}</td>  
                    </ng-template>
                    <td *ngIf="candidate.ResumePath==null || candidate.ResumePath=='' else unset2">
                        N/А
                    </td>
                    <ng-template #unset2>  
                        <td>
                            <a href="{{candidate.ResumePath}}" target='_blank' title="Нажмите, чтобы скачать резюме">Скачать</a>
                        </td>
                    </ng-template>
                    <td>
                        <button (click)="remove(candidate.Id);" style="margin-left:5px;" class="btn btn-danger">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <button (click)="popUpShow();" [routerLink]="['/vacancies/:id/candidateForm', {id: id}]" class="btn btn-primary">Добавить</button>
    <div hidden="hidden" class="b-popup" id="popupСandidateForm">
	    <div class="b-popup-content" style="max-width: 400px;">
	        <router-outlet></router-outlet>
	    </div>
	</div>`,
    providers: [VacanciesService]
})
export class VacancyComponent implements OnInit, OnDestroy {

    candidates: Candidate[] = [];
    sub: any;
    id: string;

    constructor(private vacanciesService: VacanciesService, private route: ActivatedRoute, private router: Router) { }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.vacanciesService.getVacancyCandidates(this.id).subscribe(res => {
                this.candidates = res;
            });
        });
    }

    popUpShow() {
        document.getElementById("popupСandidateForm").style.display = "block";
    }

    remove(id: number) {
        const vacancyComponent = this;
        this.vacanciesService.removeCandidateFromVacancy(id, this.id).subscribe(function () {
            let index = vacancyComponent.candidates.findIndex(c => c.Id === id);
            vacancyComponent.candidates.splice(index, 1);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { VacanciesService } from '../shared/vacancies.service';
import { Candidate } from '../shared/candidate';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'vacancy',
    template: `
    <div style="overflow:auto;" id="list-vacancies-candidates" class="panel">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Одобрение</th>
                    <th>Имя</th>
                    <th>Фамилия</th> 
                    <th>Отчество</th>
                    <th>Резюме</th>
                    <th>HR-конспект</th>
                    <th>Собеседование</th>
                    <th>Технический конспект</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let candidate of candidates">
                    <td *ngIf="candidate.Checked!=null && candidate.Checked else unset">
                        <input type="checkbox" title="Одобрен/не одобрен" (click)="check(candidate.Id, false);" checked>
                    </td>
                    <ng-template #unset>  
                        <td><input type="checkbox" title="Одобрен/не одобрен" (click)="check(candidate.Id, true);"></td> 
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
                    <td *ngIf="candidate.SummaryPath==null || candidate.SummaryPath=='' else unset3">
                        N/А
                    </td>
                    <ng-template #unset3>  
                        <td>
                            <a href="{{candidate.SummaryPath}}" target='_blank' title="Нажмите, чтобы скачать HR-конспект">Скачать</a>
                        </td>
                    </ng-template>
                    <td *ngIf="candidate.InterviewRequired!=null && candidate.InterviewRequired else unset4">
                        <input type="checkbox" title="Собеседование требуется/не требуется" (click)="checkInterview(candidate.Id, false);" checked>
                    </td>
                    <ng-template #unset4>  
                        <td><input type="checkbox" title="Собеседование требуется/не требуется" (click)="checkInterview(candidate.Id, true);"></td> 
                    </ng-template>
                    <td *ngIf="candidate.InterviewPath==null || candidate.InterviewPath=='' else unset5">
                        N/А
                    </td>
                    <ng-template #unset5>  
                        <td>
                            <a href="{{candidate.InterviewPath}}" target='_blank' title="Нажмите, чтобы скачать технический конспект">Скачать</a>
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
	    <div class="b-popup-content">
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

    check(id: number, status: boolean) {
        const vacancyComponent = this;
        this.vacanciesService.checkCandidate(id, this.id, status).subscribe(function () {
            let index = vacancyComponent.candidates.findIndex(c => c.Id === id);
            vacancyComponent.candidates[index].Checked = status;
        });
    }

    checkInterview(id: number, status: boolean) {
        const vacancyComponent = this;
        this.vacanciesService.checkCandidateInterview(id, this.id, status).subscribe(function () {
            let index = vacancyComponent.candidates.findIndex(c => c.Id === id);
            vacancyComponent.candidates[index].InterviewRequired = status;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
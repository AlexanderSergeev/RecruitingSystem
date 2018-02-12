import { Component, OnInit, OnDestroy } from '@angular/core';
import { VacanciesService } from '../shared/vacancies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../shared/candidate';
import { VacancyComponent } from './vacancy.component';

@Component({
    template: `
    <form #myForm="ngForm" novalidate>
        <div>
            <h4 style="margin-left:15px;">Кандидаты</h4>
            <div class="form-group">
                <div style="overflow:auto;" id="list-vacancies-candidates-form" class="panel">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th>Имя</th>
                                <th>Фамилия</th> 
                                <th>Отчество</th>
                                <th>Резюме</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr *ngFor="let candidate of candidates">
                                <td>{{candidate.Name}}</td>
                                <td>{{candidate.Surname}}</td>
                                <td *ngIf="candidate.Patronym==null || candidate.Patronym=='';else unset1">
                                    N/А
                                </td>
                                <ng-template #unset1>  
                                    <td>{{candidate.Patronym}}</td>  
                                </ng-template>
                                <td *ngIf="candidate.ResumePath==null || candidate.ResumePath=='';else unset2">
                                    N/А
                                </td>
                                <ng-template #unset2>  
                                    <td>
                                        <a href="{{candidate.ResumePath}}" target='_blank' title="Нажмите, чтобы скачать резюме">Скачать</a>
                                    </td>
                                </ng-template>
                                <td>
                                    <button (click)="add(candidate.Id)" class="btn btn-primary">Добавить</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <button [routerLink]="['/vacancies', idVacancy]" (click)="popUpHide()" class="btn btn-primary">Выйти</button>
                </div>
        </div>
    </form>`,
    providers: [VacanciesService]
})
export class VacancyCandidateFormComponent implements OnInit, OnDestroy {

    candidates: Candidate[] = [];
    sub: any;
    idVacancy: number;

    constructor(private vacanciesService: VacanciesService, private vacancyComponent: VacancyComponent, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.idVacancy = params['id'];
            this.vacanciesService.getOtherVacancyCandidates(this.idVacancy).subscribe(res => {
                this.candidates = res;
            },
            error => {
                alert(error.statusText);
            });
        });
    }

    add(idCandidate: number) {
        if (idCandidate != null) {
            const vacancyCandidateForm = this;
            this.vacanciesService.addVacancyCandidate(idCandidate, this.idVacancy).subscribe(
                data => {
                    this.vacancyComponent.candidates.push(data);
                    var listVacanciesCandidates = document.getElementById('list-vacancies-candidates');
                    listVacanciesCandidates.scrollTop = listVacanciesCandidates.scrollHeight;
                    let index = vacancyCandidateForm.candidates.findIndex(c => c.Id === idCandidate);
                    vacancyCandidateForm.candidates.splice(index, 1);
                },
                error => {
                    alert(error.statusText);
                });
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    popUpHide() {
        document.getElementById("popupСandidateForm").style.display = "none";
    }

}
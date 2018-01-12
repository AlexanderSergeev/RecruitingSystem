import { Component, OnInit, OnDestroy } from '@angular/core';
import { VacanciesService } from '../shared/vacancies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../shared/candidate';

@Component({
    template: `
    <form #myForm="ngForm" novalidate>
        <div>
            <h4 style="margin-left:15px;">Кандидаты</h4>
            <div class="form-group">
                    <div class="panel">
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
                    <button [routerLink]="['/vacancies', id]" (click)="popUpHide()" class="btn btn-primary">Отменить</button>
                </div>
        </div>
    </form>`,
    providers: [VacanciesService]
})
export class VacancyCandidateFormComponent implements OnInit, OnDestroy {

    candidates: Candidate[] = [];
    sub: any;
    id: string;

    constructor(private vacanciesService: VacanciesService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.vacanciesService.getOtherVacancyCandidates(this.id).subscribe(res => {
                this.candidates = res;
            });
        });
    }

    add(id: number) {
        alert(id);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    popUpHide() {
        document.getElementById("popupСandidateForm").style.display = "none";
    }

}
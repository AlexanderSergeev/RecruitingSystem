import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../shared/candidates.service';
import { Candidate } from '../shared/candidate';

@Component({
    selector: 'list-candidates',
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
    <div style="overflow:auto;" id="list-candidates" class="panel">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th> 
                    <th>Отчество</th>
                    <th>Резюме</th>
                    <th>HR-конспект</th>
                    <th>Технический конспект</th>
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
                    <td *ngIf="candidate.SummaryPath==null || candidate.SummaryPath=='' else unset3">
                        N/А
                    </td>
                    <ng-template #unset3>  
                        <td>
                            <a href="{{candidate.SummaryPath}}" target='_blank' title="Нажмите, чтобы скачать HR-конспект">Скачать</a>
                        </td>
                    </ng-template>
                    <td *ngIf="candidate.InterviewPath==null || candidate.InterviewPath=='' else unset4">
                        N/А
                    </td>
                    <ng-template #unset4>  
                        <td>
                            <a href="{{candidate.InterviewPath}}" target='_blank' title="Нажмите, чтобы скачать технический конспект">Скачать</a>
                        </td>
                    </ng-template>
                    <td>
                        <button (click)="popUpShow();" [routerLink]="['/candidates/form', candidate.Id]" style="margin-left:5px;" class="btn btn-info">Редактировать</button>
                        <button (click)="remove(candidate.Id);" style="margin-left:5px;" class="btn btn-danger">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <button (click)="popUpShow();" [routerLink]="['/candidates/form', 0]" class="btn btn-primary">Добавить</button>
	
	<div hidden="hidden" class="b-popup" id="popupCandidate">
		<div class="b-popup-content">
			<router-outlet></router-outlet>
		</div>
	</div>`,
    providers: [CandidatesService]
})
export class CandidatesComponent implements OnInit {

    candidates: Array<Candidate> = [];

    constructor(private candidatesService: CandidatesService) { }
    ngOnInit() {
        this.candidatesService.getCandidates().subscribe(res => {
            this.candidates = res;
        });
    }
	
	popUpShow() {
        document.getElementById("popupCandidate").style.display = "block";
    }

    remove(id: number) {
        const candidatesComponent = this;
        this.candidatesService.remove(id).subscribe(function () {
            let index = candidatesComponent.candidates.findIndex(d => d.Id == id);
            candidatesComponent.candidates.splice(index, 1);
        });
    }
}

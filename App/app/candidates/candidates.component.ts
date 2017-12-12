import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../shared/candidates.service';
import { Candidate } from '../shared/candidate';

@Component({
    selector: 'list-candidates',
    template: ` 
    <div style="overflow:auto; height:480px;" id="list-candidates" class="panel">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th> 
                    <th>Отчество</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let candidate of candidates">
                    <td>{{candidate.Name}}</td>
                    <td *ngIf="candidate.Surname==null || candidate.Surname=='';else unset1">
                        N/А
                    </td>
                    <ng-template #unset1>  
                        <td>{{candidate.Surname}}</td>  
                    </ng-template>
                    <td *ngIf="candidate.Patronym==null || candidate.Patronym=='';else unset2">
                        N/А
                    </td>
                    <ng-template #unset2>  
                        <td>{{candidate.Patronym}}</td>  
                    </ng-template>
                    <td>
                        <a href="/Content/sample.docx" target='_blank' title="Нажмите, чтобы посмотреть резюме">Резюме</a>
                    </td>
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

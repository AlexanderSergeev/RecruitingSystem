import { Component, OnInit, OnDestroy } from '@angular/core';
import { Candidate } from '../shared/candidate';
import { CandidatesService } from '../shared/candidates.service';
import { CandidatesComponent } from './candidates.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    template: `
    <form #myForm="ngForm" novalidate>
        <div class="row">
            <h4 style="margin-left:15px;">Кандидат</h4>
            <br>
            <div class="form-group">
                <label class="col-md-6 control-label">Имя: </label>
                <div class="col-md-10">
                    <input id="Name" class="form-control" name="Name" [(ngModel)]="Name" required />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-6 control-label">Фамилия: </label>
                <div class="col-md-10">
                    <input id="Surname" class="form-control" name="Surname" [(ngModel)]="Surname" required />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-6 control-label">Отчество: </label>
                <div class="col-md-10">
                    <input id="Patronym" class="form-control" name="Patronym" [(ngModel)]="Patronym" />
                </div>
            </div> 
            <div class="form-group">
                <label class="col-md-6 control-label">Загрузить резюме: </label>
                <div class="col-md-10">
                    <input id="Resume" type="file" class="form-control" name="Resume">
                </div>
            </div>      
            <div class="form-group">
                <div class="col-md-10">
                    <br>
                    <button [routerLink]="['/candidates']" [disabled]="myForm.invalid" (click)="addCandidate(Name, Surname, Patronym)" class="btn btn-primary">Сохранить</button>
                    <button [routerLink]="['/candidates']" (click)="popUpHide()" class="btn btn-primary">Отменить</button>
                </div>
            </div>
        </div>
    </form>`,
    providers: [CandidatesService]
})
export class CandidateFormComponent implements OnInit, OnDestroy {

    sub: any;
    Id: number;
    Name: string;
    Surname: string;
    Patronym: string;

    constructor(private candidatesService: CandidatesService, private candidatesComponent: CandidatesComponent, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = params['id'];
            if (id != 0) {
                this.candidatesService.getCandidate(id).subscribe(res => {
                    this.Id = res.Id;
                    this.Name = res.Name;
                    this.Surname = res.Surname;
                    this.Patronym = res.Patronym;
                });
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    popUpHide() {
        document.getElementById("popupCandidate").style.display = "none";
    }

    addCandidate(name: string, surname: string, patronym: string) {
        this.popUpHide();
        var id = this.Id;
        if (id != null) {
            var filePathInput: any = document.getElementById("Resume");
            var data = new FormData();
            if (filePathInput.files) {
                var file: any = filePathInput.files[0];
                data.append("file", file);
            }
            this.candidatesService.uploadResume(id, data).subscribe(
                data => {});

            this.candidatesService.editCandidate(id, name, surname, patronym).subscribe(
                data => {
                    let index = this.candidatesComponent.candidates.findIndex(d => d.Id == id);
                    this.candidatesComponent.candidates[index] = data;
                });
        }
        else {
            this.candidatesService.addCandidate(name, surname, patronym).subscribe(
                data => {
                    this.candidatesComponent.candidates.push(data);
                    var listCandidates = document.getElementById('list-candidates');
                    listCandidates.scrollTop = listCandidates.scrollHeight;
                });
        }
    }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
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
                <label class="col-md-6 control-label">Загрузить HR-конспект: </label>
                <div class="col-md-10">
                    <input id="Summary" type="file" class="form-control" name="Summary">
                </div>
            </div> 
            <div class="form-group">
                <label class="col-md-6 control-label">Загрузить технический конспект: </label>
                <div class="col-md-10">
                    <input id="Interview" type="file" class="form-control" name="Interview">
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
                this.candidatesService.getCandidate(id).subscribe(
                    res => {
                        this.Id = res.Id;
                        this.Name = res.Name;
                        this.Surname = res.Surname;
                        this.Patronym = res.Patronym;
                    },
                    error => {
                        alert(error.statusText);
                    }
                );
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

        var resumePathInput: any = document.getElementById("Resume");
        var summaryPathInput: any = document.getElementById("Summary");
        var interviewPathInput: any = document.getElementById("Interview");

        var id = this.Id;
        if (id != null) {
            this.candidatesService.editCandidate(id, name, surname, patronym).subscribe(
                data => {
                    let index = this.candidatesComponent.candidates.findIndex(d => d.Id === id);
                    this.candidatesComponent.candidates[index] = data;
                    this.uploadResume(id, resumePathInput);
                    this.uploadSummary(id, summaryPathInput);
                    this.uploadInterview(id, interviewPathInput);
                },
                error => {
                    alert(error.statusText);
                }
            );
        }
        else {
            this.candidatesService.addCandidate(name, surname, patronym).subscribe(
                data => {
                    this.candidatesComponent.candidates.push(data);
                    var listCandidates = document.getElementById('list-candidates');
                    listCandidates.scrollTop = listCandidates.scrollHeight;
                    this.uploadResume(data.Id, resumePathInput);
                    this.uploadSummary(data.Id, summaryPathInput);
                    this.uploadInterview(data.Id, interviewPathInput);
                },
                error => {
                    alert(error.statusText);
                }
            );
        }
    }

    private uploadResume(id: any, filePathInput: any) {

        if (filePathInput.files) {
            var data = new FormData();
            var file: any = filePathInput.files[0];
            data.append("file", file);
            if (file) {
                this.candidatesService.uploadResume(id, data).subscribe(
                    data => {
                        let index = this.candidatesComponent.candidates.findIndex(d => d.Id === id);
                        this.candidatesComponent.candidates[index].ResumePath = data;
                    },
                    error => {
                        alert(error.statusText);
                    });
            }
        }
    }

    private uploadInterview(id: any, filePathInput: any) {

        if (filePathInput.files) {
            var data = new FormData();
            var file: any = filePathInput.files[0];
            data.append("file", file);
            if (file) {
                this.candidatesService.uploadInterview(id, data).subscribe(
                    data => {
                        let index = this.candidatesComponent.candidates.findIndex(d => d.Id === id);
                        this.candidatesComponent.candidates[index].InterviewPath = data;
                    },
                    error => {
                        alert(error.statusText);
                    });
            }
        }
    }

    private uploadSummary(id: any, filePathInput: any) {

        if (filePathInput.files) {
            var data = new FormData();
            var file: any = filePathInput.files[0];
            data.append("file", file);
            if (file) {
                this.candidatesService.uploadSummary(id, data).subscribe(
                    data => {
                        let index = this.candidatesComponent.candidates.findIndex(d => d.Id === id);
                        this.candidatesComponent.candidates[index].SummaryPath = data;
                    },
                    error => {
                        alert(error.statusText);
                    });
            }
        }
    }
}
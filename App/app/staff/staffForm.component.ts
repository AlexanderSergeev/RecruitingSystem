import { Component, OnInit, OnDestroy } from '@angular/core';
import { StaffService } from '../shared/staff.service';
import { StaffComponent } from './staff.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    template: `
    <form #myForm="ngForm" novalidate>
        <div class="row">
            <h4 style="margin-left:15px;">Сотрудник</h4>
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
                    <input id="StaffResume" type="file" class="form-control" name="Resume">
                </div>
            </div>      
            <div class="form-group">
                <div class="col-md-10">
                    <br>
                    <button [routerLink]="['/staff']" [disabled]="myForm.invalid" (click)="addStaffMember(Name, Surname, Patronym)" class="btn btn-primary">Сохранить</button>
                    <button [routerLink]="['/staff']" (click)="popUpHide()" class="btn btn-primary">Отменить</button>
                </div>
            </div>
        </div>
    </form>`,
    providers: [StaffService]
})
export class StaffFormComponent implements OnInit, OnDestroy {

    sub: any;
    Id: number;
    Name: string;
    Surname: string;
    Patronym: string;

    constructor(private staffService: StaffService, private staffComponent: StaffComponent, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = params['id'];
            if (id != 0) {
                this.staffService.getStaffMember(id).subscribe(res => {
                    this.Id = res.Id;
                    this.Name = res.Name;
                    this.Surname = res.Surname;
                    this.Patronym = res.Patronym;
                },
                error => {
                    alert(error.statusText);
                });
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    popUpHide() {
        document.getElementById("popupStaff").style.display = "none";
    }

    addStaffMember(name: string, surname: string, patronym: string) {
        this.popUpHide();

        var filePathInput: any = document.getElementById("StaffResume");

        var id = this.Id;
        if (id != null) {
            this.staffService.editStaffMember(id, name, surname, patronym).subscribe(
                data => {
                    let index = this.staffComponent.staff.findIndex(d => d.Id === id);
                    this.staffComponent.staff[index] = data;
                    this.uploadResume(id, filePathInput);
                },
                error => {
                    alert(error.statusText);
                });
        }
        else {
            this.staffService.addStaffMember(name, surname, patronym).subscribe(
                data => {
                    this.staffComponent.staff.push(data);
                    var listStaff = document.getElementById('list-staff');
                    listStaff.scrollTop = listStaff.scrollHeight;
                    this.uploadResume(data.Id, filePathInput);
                },
                error => {
                    alert(error.statusText);
                });
        }
    }

    private uploadResume(id: any, filePathInput: any) {

        if (filePathInput.files) {
            var data = new FormData();
            var file: any = filePathInput.files[0];
            data.append("file", file);
            if (file) {
                this.staffService.uploadResume(id, data).subscribe(
                    data => {
                        let index = this.staffComponent.staff.findIndex(d => d.Id === id);
                        this.staffComponent.staff[index].ResumePath = data;
                    },
                    error => {
                        alert(error.statusText);
                    });
            }
        }
    }
}
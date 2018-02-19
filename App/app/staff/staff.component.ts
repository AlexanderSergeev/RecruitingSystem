import { Component, OnInit } from '@angular/core';
import { StaffService } from '../shared/staff.service';
import { StaffMember } from '../shared/staff';
import { LoginService } from '../shared/login.service';

@Component({
    selector: 'list-staff',
    template: ` 
    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <span *ngIf="userRole!=='Technical'">
                    <a [routerLink]="['/demands']" class="navbar-brand">Запросы</a>
                </span>
                <span *ngIf="userRole!=='Technical' && userRole!=='ProjectManager'">
                    <a [routerLink]="['/vacancies']" class="navbar-brand">Вакансии</a>
                </span>
                <span *ngIf="userRole!=='Technical' && userRole!=='ProjectManager' && userRole!=='Director'">
                    <a [routerLink]="['/staff']" class="navbar-brand">Сотрудники</a>
                </span>
                <span *ngIf="userRole!=='ProjectManager' && userRole!=='Director'">
                    <a [routerLink]="['/candidates']" class="navbar-brand">Кандидаты</a>
                </span>
                <span>
                    <a [routerLink]="['/login']" class="navbar-brand">Выйти</a>
                </span>
            </div>
        </div>
    </div> 
    <div *ngIf="userRole!=='Technical' && userRole!=='ProjectManager' && userRole!=='Director'" style="overflow:auto;" id="list-staff" class="panel">
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
                <tr *ngFor="let staffMember of staff">
                    <td>{{staffMember.Name}}</td>
                    <td>{{staffMember.Surname}}</td>
                    <td *ngIf="staffMember.Patronym==null || staffMember.Patronym=='';else unset1">
                        N/А
                    </td>
                    <ng-template #unset1>  
                        <td>{{staffMember.Patronym}}</td>  
                    </ng-template>
                    <td *ngIf="staffMember.ResumePath==null || staffMember.ResumePath=='';else unset2">
                        N/А
                    </td>
                    <ng-template #unset2>  
                        <td>
                            <a href="{{staffMember.ResumePath}}" target='_blank' title="Нажмите, чтобы скачать резюме">Скачать</a>
                        </td>
                    </ng-template>
                    <td>
                        <button (click)="popUpShow();" [routerLink]="['/staff/form', staffMember.Id]" style="margin-left:5px;" class="btn btn-info">Редактировать</button>
                        <button (click)="remove(staffMember.Id);" style="margin-left:5px;" class="btn btn-danger">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <button *ngIf="userRole!=='Technical' && userRole!=='ProjectManager' && userRole!=='Director'" (click)="popUpShow();" [routerLink]="['/staff/form', 0]" class="btn btn-primary">Добавить</button>
	
	<div hidden="hidden" class="b-popup" id="popupStaff">
		<div class="b-popup-content">
			<router-outlet></router-outlet>
		</div>
	</div>`,
    providers: [StaffService]
})
export class StaffComponent implements OnInit {

    staff: Array<StaffMember> = [];
    userRole: string; 

    constructor(private staffService: StaffService, private loginService: LoginService) { }
    ngOnInit() {
        this.loginService.getCurrentUserRole().subscribe(res => {
                this.userRole = res;
            },
            error => {
                alert(error.statusText);
            },
            () => {
                this.staffService.getStaff().subscribe(res => {
                        this.staff = res;
                    },
                    error => {
                        alert(error.statusText);
                    });
            });
    }
	
	popUpShow() {
        document.getElementById("popupStaff").style.display = "block";
    }

    remove(id: number) {
        const staffComponent = this;
        this.staffService.remove(id).subscribe(
            result => {
            },
            error => {
                alert(error.statusText);
            },
            () => {
                let index = staffComponent.staff.findIndex(d => d.Id == id);
                staffComponent.staff.splice(index, 1);
            }
        );
    }
}

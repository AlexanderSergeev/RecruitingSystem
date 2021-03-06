﻿import { Component, OnInit, OnDestroy } from '@angular/core';
import { DemandsService } from '../shared/demands.service';
import { StaffMember } from '../shared/staff';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../shared/login.service';

@Component({
    selector: 'demand',
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
    <div *ngIf="userRole!=='Technical'" style="overflow:auto;" id="list-demands-staff" class="panel">
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
                        <button *ngIf="userRole!=='Director'" (click)="remove(staffMember.Id);" style="margin-left:5px;" class="btn btn-danger">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <button *ngIf="userRole!=='Technical' && userRole!=='Director'" (click)="popUpShow();" [routerLink]="['/demands/:id/staffMemberForm', {id: id}]" class="btn btn-primary">Добавить</button>
    <div hidden="hidden" class="b-popup" id="popupStaffMemberForm">
	    <div class="b-popup-content" style="max-width: 400px;">
	        <router-outlet></router-outlet>
	    </div>
	</div>`,
    providers: [DemandsService]
})
export class DemandComponent implements OnInit, OnDestroy {

    staff: StaffMember[] = [];
    sub: any;
    id: number;
    userRole: string;

    constructor(private demandsService: DemandsService, private loginService: LoginService, private route: ActivatedRoute, private router: Router) { }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            if (!isNaN(Number(this.id))) {
                this.loginService.getCurrentUserRole().subscribe(res => {
                    this.userRole = res;
                },
                    error => {
                        alert(error.statusText);
                    },
                    () => {
                        this.demandsService.getDemandStaff(this.id).subscribe(res => {
                            this.staff = res;
                        },
                            error => {
                                alert(error.statusText);
                            });
                    });
            }
        });
    }

    popUpShow() {
        document.getElementById("popupStaffMemberForm").style.display = "block";
    }

    remove(id: number) {
        const demandComponent = this;
        this.demandsService.removeStaffMemberFromDemand(id, this.id).subscribe(
            result => {
            },
            error => {
                alert(error.statusText);
            },
            () => {
                let index = demandComponent.staff.findIndex(c => c.Id === id);
                demandComponent.staff.splice(index, 1);
            }
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
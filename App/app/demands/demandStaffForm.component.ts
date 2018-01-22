import { Component, OnInit, OnDestroy } from '@angular/core';
import { DemandsService } from '../shared/demands.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffMember } from '../shared/staff';
import { DemandComponent } from './demand.component';

@Component({
    template: `
    <form #myForm="ngForm" novalidate>
        <div>
            <h4 style="margin-left:15px;">Сотрудники</h4>
            <div class="form-group">
                <div style="overflow:auto;" id="list-demands-staff-form" class="panel">
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
                                    <button (click)="add(staffMember.Id)" class="btn btn-primary">Добавить</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <button [routerLink]="['/demands', idDemand]" (click)="popUpHide()" class="btn btn-primary">Выйти</button>
                </div>
        </div>
    </form>`,
    providers: [DemandsService]
})
export class DemandStaffFormComponent implements OnInit, OnDestroy {

    staff: StaffMember[] = [];
    sub: any;
    idDemand: number;

    constructor(private demandsService: DemandsService, private demandComponent: DemandComponent, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.idDemand = params['id'];
            this.demandsService.getOtherDemandStaff(this.idDemand).subscribe(res => {
                this.staff = res;
            });
        });
    }

    add(idStaffMember: number) {
        if (idStaffMember != null) {
            const demandStaffMemberForm = this;
            this.demandsService.addDemandStaffMember(idStaffMember, this.idDemand).subscribe(
                data => {
                    this.demandComponent.staff.push(data);
                    var listDemandsStaff = document.getElementById('list-demands-staff');
                    listDemandsStaff.scrollTop = listDemandsStaff.scrollHeight;
                    let index = demandStaffMemberForm.staff.findIndex(c => c.Id === idStaffMember);
                    demandStaffMemberForm.staff.splice(index, 1);
                });
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    popUpHide() {
        document.getElementById("popupStaffMemberForm").style.display = "none";
    }

}
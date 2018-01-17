import { Component, OnInit, OnDestroy } from '@angular/core';
import { DemandsService } from '../shared/demands.service';
import { StaffMember } from '../shared/staff';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'demand',
    template: `
    <div style="overflow:auto;" id="list-demands-staff" class="panel">
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
                        <button (click)="remove(staffMember.Id);" style="margin-left:5px;" class="btn btn-danger">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <button (click)="popUpShow();" [routerLink]="['/demands/:id/staffMemberForm', {id: id}]" class="btn btn-primary">Добавить</button>
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
    id: string;

    constructor(private demandsService: DemandsService, private route: ActivatedRoute, private router: Router) { }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.demandsService.getDemandStaff(this.id).subscribe(res => {
                this.staff = res;
            });
        });
    }

    popUpShow() {
        document.getElementById("popupStaffMemberForm").style.display = "block";
    }

    remove(id: number) {
        const demandComponent = this;
        this.demandsService.removeStaffMemberFromDemand(id, this.id).subscribe(function () {
            let index = demandComponent.staff.findIndex(c => c.Id === id);
            demandComponent.staff.splice(index, 1);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
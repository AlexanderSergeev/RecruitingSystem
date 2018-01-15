import { Component, OnInit } from '@angular/core';
import { StaffService } from '../shared/staff.service';
import { StaffMember } from '../shared/staff';

@Component({
    selector: 'list-staff',
    template: ` 
    <div style="overflow:auto; height:480px;" id="list-staff" class="panel">
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
    <button (click)="popUpShow();" [routerLink]="['/staff/form', 0]" class="btn btn-primary">Добавить</button>
	
	<div hidden="hidden" class="b-popup" id="popupStaff">
		<div class="b-popup-content">
			<router-outlet></router-outlet>
		</div>
	</div>`,
    providers: [StaffService]
})
export class StaffComponent implements OnInit {

    staff: Array<StaffMember> = [];

    constructor(private staffService: StaffService) { }
    ngOnInit() {
        this.staffService.getStaff().subscribe(res => {
            this.staff = res;
        });
    }
	
	popUpShow() {
        document.getElementById("popupStaff").style.display = "block";
    }

    remove(id: number) {
        const staffComponent = this;
        this.staffService.remove(id).subscribe(function () {
            let index = staffComponent.staff.findIndex(d => d.Id == id);
            staffComponent.staff.splice(index, 1);
        });
    }
}

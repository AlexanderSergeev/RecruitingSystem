import { Component, OnInit } from '@angular/core';
import { Demand } from '../shared/demand';
import { DemandsService } from '../shared/demands.service';
import { DemandsComponent } from './demands.component';

@Component({
    template: `
    <form #myForm="ngForm" novalidate>
        <div class="row">
            <div class="col-md-4">
                  <h4>Новый запрос</h4>
                  <br>
                  <div class="form-group">
                     <label class="col-md-6 control-label">Имя: </label>
                     <div class="col-md-10">
                        <input class="form-control" name="Name" [(ngModel)]="Name" required />
                     </div>
                 </div>
                 <div class="form-group">
                    <label class="col-md-6 control-label">Статус: </label>
                    <div class="col-md-10">
                        <input class="form-control" name="DemandStatus" [(ngModel)]="DemandStatus" required />
                    </div>
                 </div>
                <div class="form-group">
                    <label class="col-md-6 control-label">Локация: </label>
                    <div class="col-md-10">
                        <input class="form-control" name="DemandLocation" [(ngModel)]="DemandLocation" />
                    </div>
                 </div>
                <div class="form-group">
                    <div class="col-md-10">
                        <br>
                        <button [routerLink]="['/demands']" [disabled]="myForm.invalid" (click)="addDemand(Name, DemandStatus, DemandLocation)" class="btn btn-primary">Сохранить</button>
                    </div>
                </div>
            </div>
        </div>
    </form>`,
    providers: [DemandsService]
})
export class DemandFormComponent {

    constructor(private demandsService: DemandsService, private demandsComponent: DemandsComponent) { }

    addDemand(name: string, demandStatus: string, demandLocation: string) {

        this.demandsService.addDemand(name, demandStatus, demandLocation).subscribe(
            data => {
                this.demandsComponent.demands.push(data);
                var listDemands = document.getElementById('list-demands');
                listDemands.scrollTop = listDemands.scrollHeight;
            });
    }
}
﻿import { Component, OnInit, OnDestroy } from '@angular/core';
import { DemandsService } from '../shared/demands.service';
import { DemandsComponent } from './demands.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../shared/login.service';

@Component({
    template: `
    <form *ngIf="userRole!=='Technical'" #myForm="ngForm" novalidate>
        <div class="row">
            <h4 style="margin-left:15px;">Запрос на ресурс</h4>
            <br>
            <div class="form-group">
                <label class="col-md-6 control-label">Название: </label>
                <div class="col-md-10">
                    <input id="Name" class="form-control" name="Name" [(ngModel)]="Name" required />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-6 control-label">Локация: </label>
                <div class="col-md-10">
                    <input id="DemandLocation" class="form-control" name="DemandLocation" [(ngModel)]="DemandLocation" />
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-10">
                    <br>
                    <button *ngIf="userRole!=='HR' && userRole!=='Director'" [routerLink]="['/demands']" [disabled]="myForm.invalid" (click)="addDemand(Name, DemandLocation)" class="btn btn-primary">Сохранить</button>
                    <button [routerLink]="['/demands']" (click)="popUpHide()" class="btn btn-primary">Отменить</button>
                </div>
            </div>
        </div>
    </form>`,
    providers: [DemandsService]
})
export class DemandFormComponent implements OnInit, OnDestroy {

    sub: any;
    Id: number;
    Name: string;
    DemandLocation: string;
    userRole: string; 

    constructor(private demandsService: DemandsService, private loginService: LoginService, private demandsComponent: DemandsComponent, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.loginService.getCurrentUserRole().subscribe(res => {
                    this.userRole = res;
                },
                error => {
                    alert(error.statusText);
                },
                () => {
                    let id = params['id'];
                    if (id != 0) {
                        this.demandsService.getDemand(id).subscribe(res => {
                                this.Id = res.Id;
                                this.Name = res.Name;
                                this.DemandLocation = res.DemandLocation;
                            },
                            error => {
                                alert(error.statusText);
                            });
                    }
                });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    popUpHide() {
        document.getElementById("popup1").style.display = "none";
    }

    addDemand(name: string, demandLocation: string) {
        this.popUpHide();
        var id = this.Id;
        if (id != null) {
            this.demandsService.editDemand(id, name, demandLocation).subscribe(
                data => {
                    let index = this.demandsComponent.demands.findIndex(d => d.Id == id);
                    this.demandsComponent.demands[index] = data;
                },
                error => {
                    alert(error.statusText);
                });
        }
        else {
            this.demandsService.addDemand(name, demandLocation).subscribe(
                data => {
                    this.demandsComponent.demands.push(data);
                    var listDemands = document.getElementById('list-demands');
                    listDemands.scrollTop = listDemands.scrollHeight;
                },
                error => {
                    alert(error.statusText);
                });
        }
    }
}
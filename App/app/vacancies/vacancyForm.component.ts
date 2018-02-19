import { Component, OnInit, OnDestroy } from '@angular/core';
import { VacanciesService } from '../shared/vacancies.service';
import { VacanciesComponent } from './vacancies.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../shared/login.service';

@Component({
    template: `
    <form *ngIf="userRole!=='Technical' && userRole!=='ProjectManager'" #myForm="ngForm" novalidate>
        <div class="row">
            <h4 style="margin-left:15px;">Вакансия</h4>
            <br>
            <div class="form-group">
                <label class="col-md-6 control-label">Название: </label>
                <div class="col-md-10">
                    <input id="Name" class="form-control" name="Name" [(ngModel)]="Name" required />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-6 control-label">Статус: </label>
                <div class="col-md-10">
                    <select id="VacancyStatus" name="VacancyStatus" [(ngModel)]="VacancyStatus">
                        <option value="0" selected="selected">Открыта</option>
                        <option value="1">Ожидает решения</option>
                        <option value="2">Закрыта</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-6 control-label">Локация: </label>
                <div class="col-md-10">
                    <input id="VacancyLocation" class="form-control" name="VacancyLocation" [(ngModel)]="VacancyLocation" />
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-10">
                    <br>
                    <button *ngIf="userRole!=='HR'" [routerLink]="['/vacancies']" [disabled]="myForm.invalid" (click)="addVacancy(Name, VacancyStatus, VacancyLocation)" class="btn btn-primary">Сохранить</button>
                    <button [routerLink]="['/vacancies']" (click)="popUpHide()" class="btn btn-primary">Отменить</button>
                </div>
            </div>
        </div>
    </form>`,
    providers: [VacanciesService]
})
export class VacancyFormComponent implements OnInit, OnDestroy {

    sub: any;
    Id: number;
    Name: string;
    VacancyStatus: number;
    VacancyLocation: string;
    userRole: string;

    constructor(private vacanciesService: VacanciesService, private loginService: LoginService, private vacanciesComponent: VacanciesComponent, private route: ActivatedRoute, private router: Router) { }

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
                        this.vacanciesService.getVacancy(id).subscribe(res => {
                                this.Id = res.Id;
                                this.Name = res.Name;
                                this.VacancyStatus = res.VacancyStatus;
                                this.VacancyLocation = res.VacancyLocation;
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
        document.getElementById("popupVacancy").style.display = "none";
    }

    addVacancy(name: string, vacancyStatus: number, vacancyLocation: string) {
        this.popUpHide();
        var id = this.Id;
        if (id != null) {
            this.vacanciesService.editVacancy(id, name, vacancyStatus, vacancyLocation).subscribe(
                data => {
                    let index = this.vacanciesComponent.vacancies.findIndex(d => d.Id == id);
                    this.vacanciesComponent.vacancies[index] = data;
                },
                error => {
                    alert(error.statusText);
                });
        }
        else {
            this.vacanciesService.addVacancy(name, vacancyStatus, vacancyLocation).subscribe(
                data => {
                    this.vacanciesComponent.vacancies.push(data);
                    var listVacancies = document.getElementById('list-vacancies');
                    listVacancies.scrollTop = listVacancies.scrollHeight;
                },
                error => {
                    alert(error.statusText);
                });
        }
    }
}
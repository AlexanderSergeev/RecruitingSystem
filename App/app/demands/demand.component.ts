import { Component, OnInit, OnDestroy } from '@angular/core';
import { DemandsService } from '../shared/demands.service';
import { Candidate } from '../shared/candidate';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'demand',
    template: `
    <div class="panel">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th> 
                    <th>Отчество</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let candidate of candidates">
                    <td>{{candidate.Name}}</td>
                    <td>{{candidate.Surname}}</td>
                    <td>{{candidate.Patronym}}</td>
                </tr>
            </tbody>
        </table>
    </div>`,
    providers: [DemandsService]
})
export class DemandComponent implements OnInit, OnDestroy {

    candidates: Candidate[] = [];
    sub: any;

    constructor(private demandsService: DemandsService, private route: ActivatedRoute, private router: Router) { }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = params['id'];
            this.demandsService.getDemandCandidates(id).subscribe(res => {
                this.candidates = res;
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Demand } from '../shared/demand';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DemandsService {

    constructor(private http: Http) { }

    getDemands() {
        return this.http
            .get('/api/demands')
            .map(res => res.json());
    }

    getDemand(id: string) {
        return this.http
            .get('/api/demands/' + id)
            .map(res => {
                return res.json();
            });
    }

    addDemand(name: string, demandLocation: string) {
        var json = JSON.stringify({
            Name: name,
            DemandLocation: demandLocation
        });

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.post('/api/demands', json, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    editDemand(id: number, name: string, demandLocation: string) {
        var json = JSON.stringify({
            Id: id,
            Name: name,
            DemandLocation: demandLocation
        });

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.put('/api/demands/', json, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    remove(id: number) {
        return this.http.delete('/api/demands/' + id)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    convertToVacancy(demand: Demand) {
        var json = JSON.stringify({
            Id: demand.Id,
            Name: demand.Name,
            DemandLocation: demand.DemandLocation
        });

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.post('/api/demands/convert', json, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    getDemandStaff(id: string) {
        return this.http
            .get('/api/demands/staff/' + id)
            .map(res => {
                return res.json();
            });
    }

    getOtherDemandStaff(id: string) {
        return this.http
            .get('/api/demands/otherStaff/' + id)
            .map(res => {
                return res.json();
            });
    }

    removeStaffMemberFromDemand(idStaffMember: number, idDemand: string) {
        return this.http.delete('/api/demands/' + idStaffMember + '/' + idDemand)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }


    addDemandStaffMember(idStaffMember: number, idDemand: string) {
        var json = JSON.stringify({
            IdStaffMember: idStaffMember,
            IdDemand: idDemand
        });

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.post('/api/demands/staff', json, { headers: headers })
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
}
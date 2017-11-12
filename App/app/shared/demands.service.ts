import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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

    getDemandCandidates(id: string) {
        return this.http
            .get('/api/demands/candidates' + id)
            .map(res => {
                return res.json();
            });
    }

    addDemand(name: string, demandStatus: number, demandLocation: string) {
        var json = JSON.stringify({
            Name: name,
            DemandStatus: demandStatus,
            DemandLocation: demandLocation
        });

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.post('/api/demands', json, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    editDemand(id: number, name: string, demandStatus: number, demandLocation: string) {
        var json = JSON.stringify({
            Id: id,
            Name: name,
            DemandStatus: demandStatus,
            DemandLocation: demandLocation
        });

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.put('/api/demands/' + id, json, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    remove(id: number) {
        return this.http.delete('/api/demands/' + id)
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
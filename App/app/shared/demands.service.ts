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

    addDemand(name: string, demandStatus: string, demandLocation: string) {
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
}
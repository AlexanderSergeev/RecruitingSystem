import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'

@Injectable()
export class WishListService {

    constructor(private http: Http) { }

    getWishList() {
        return this.http
            .get('/api/wishlist')
            .map(res => res.json());
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }

    addToWishList(idCar: number) {

        const body = {
            CarId: idCar
        };

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/api/wishlist', body, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    deleteFromWishList(idCar: number) {

        return this.http.delete('/api/wishlist/' + idCar)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }
}
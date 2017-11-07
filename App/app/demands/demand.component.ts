import { Component, OnInit, OnDestroy } from '@angular/core';
import { DemandsService } from '../shared/demands.service';
import { Candidate } from '../shared/candidate';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { WishListService } from '../shared/wishlist.service';

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
    providers: [DemandsService, CartService, WishListService]
})
export class DemandComponent implements OnInit, OnDestroy {

    candidates: Candidate[] = [];
    sub: any;

    constructor(private demandsService: DemandsService, private cartService: CartService, private wishListService: WishListService, private route: ActivatedRoute, private router: Router) { }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = params['id'];
            this.demandsService.getDemand(id).subscribe(res => {
                this.candidates = res;
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    addToCart(idCar: number) {
        this.cartService.addToCart(idCar);
    }

    addToWishList(idCar: number) {
        this.wishListService.addToWishList(idCar).subscribe(function () {
            alert("Adding successful");
        });
    }
}
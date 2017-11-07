import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { DemandsComponent } from './demands/demands.component';
import { DemandComponent } from './demands/demand.component';
import { appRouterModule } from "./app.routes";
import { DemandsService } from "./shared/demands.service";
import { CartService } from './shared/cart.service';
import { WishListService } from './shared/wishlist.service';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { WishListComponent } from './wishlist/wishlist.component';
import { DemandFormComponent } from './demands/demandForm.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [BrowserModule, HttpModule, appRouterModule, FormsModule],
    declarations: [DemandsComponent, DemandComponent, WishListComponent, CartComponent, AppComponent, DemandFormComponent],
    bootstrap: [AppComponent],
    providers: [DemandsService, CartService, WishListService]
})
export class AppModule { }

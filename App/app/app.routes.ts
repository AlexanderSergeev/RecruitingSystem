import { Routes, RouterModule } from '@angular/router';
import { DemandComponent } from './demands/demand.component';
import { DemandsComponent } from './demands/demands.component';
import { CartComponent } from './cart/cart.component';
import { WishListComponent } from './wishlist/wishlist.component';
import { DemandFormComponent } from './demands/demandForm.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'demands', pathMatch: 'full'
    },
    {
        path: 'demands', component: DemandsComponent,
        children:
        [
            {
                path: 'form', component: DemandFormComponent,
            },
        ]
    },
    {
        path: 'demands/:id', component: DemandComponent,
    },
    {
        path: '**', redirectTo: 'demands', pathMatch: 'full'
    }
];

export const appRouterModule = RouterModule.forRoot(routes);
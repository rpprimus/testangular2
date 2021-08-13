import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreAuthGuard } from '../../utility/store-auth.guard';
import { PlaceOrderComponent } from './place-order/place-order.component';

const routes: Routes = [
  {
    path: 'revieworder',
    component: PlaceOrderComponent,
    canActivate: [StoreAuthGuard]
  },
  {
    path: 'services',
    component: PlaceOrderComponent,
    canActivate: [StoreAuthGuard]
  },
  {
    path: 'product/:id',
    component: PlaceOrderComponent,
    canActivate: [StoreAuthGuard]
  },
  {
    path: 'placeorder',
    component: PlaceOrderComponent,
    canActivate: [StoreAuthGuard]
  },
  {
    path: 'orderdetail',
    component: PlaceOrderComponent,
    canActivate: [StoreAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

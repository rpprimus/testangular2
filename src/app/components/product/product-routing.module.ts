import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthGuard } from '../../shared/services/auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductResourcesComponent } from './product-resources/product-resources.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add',
        component: AddProductComponent,
        canActivate : [AuthGuard]
      },
      {
        path: ':id',
        component: AddProductComponent,
        canActivate : [AuthGuard]
      },
      {
        path: '',
        component: ProductListComponent,
        canActivate : [AuthGuard]
      },

      {
        path: 'res',
        component: ProductResourcesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

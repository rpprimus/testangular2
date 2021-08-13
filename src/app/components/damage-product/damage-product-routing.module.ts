import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DamageProductDetailComponent } from './damage-product-detail/damage-product-detail.component';
import { DamageProductListComponent } from './damage-product-list/damage-product-list.component';
import { AuthGuard } from '../../shared/services/auth.guard';

const routes: Routes = [

  {
    path: '',
    children: [
      // {
      //   path: 'add',
      //   component: DamageProductDetailComponent,
      //   canActivate: [AuthGuard]
      // },
      {
        path: ':id',
        component: DamageProductDetailComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        component: DamageProductListComponent,
        canActivate: [AuthGuard]
      }
    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DamageProductRoutingModule { }

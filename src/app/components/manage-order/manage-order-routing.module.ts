import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainOrderPageComponent } from './main-order-page/main-order-page.component';

const routes: Routes = [

  {
    path : '',
    children: [
      {
        path: ':id',
        component: MainOrderPageComponent
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageOrderRoutingModule { }

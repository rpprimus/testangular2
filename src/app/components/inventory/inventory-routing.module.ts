import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../shared/services/auth.guard';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { CheckInventoryComponent } from './check-inventory/check-inventory.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: InventoryListComponent,
        canActivate : [AuthGuard]
      },
      {
        path: 'detail',
        children: [
          {
            path: ':id',
            component : CheckInventoryComponent,
            canActivate : [AuthGuard]
          }
        ]
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }

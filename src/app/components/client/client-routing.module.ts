import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { AddClientComponent } from './add-client/add-client.component';
import { AuthGuard } from '../../shared/services/auth.guard';
import { CanDeactivateGuard } from '../../shared/services/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add',
        component: AddClientComponent,
        canActivate : [AuthGuard],
        canDeactivate : [CanDeactivateGuard]
      },
      {
        path: ':id',
        component: AddClientComponent,
        canActivate : [AuthGuard],
        canDeactivate : [CanDeactivateGuard]
      },
      {
        path: '',
        component: ClientListComponent,
        canActivate : [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/services/auth.guard';
import { AddClientStoreUserComponent } from './add-client-store-user/add-client-store-user.component';
import { ClientStoreUserListComponent } from './client-store-user-list/client-store-user-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add',
        component: AddClientStoreUserComponent,
        //canActivate : [AuthGuard]
      },
      {
        path: ':id',
        component: AddClientStoreUserComponent,
        //canActivate : [AuthGuard]
      },
      {
        path: '',
        component: ClientStoreUserListComponent,
        //canActivate : [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientStoreUserRoutingModule { }

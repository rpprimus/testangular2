import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from '../../shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add',
        component: AddUserComponent,
        canActivate : [AuthGuard]
      },
      {
        path: ':id',
        component: AddUserComponent,
        canActivate : [AuthGuard]
      },
      {
        path: '',
        component: UserListComponent,
        canActivate : [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

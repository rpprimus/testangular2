import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddKitComponent } from './add-kit/add-kit.component';
import { AuthGuard } from '../../shared/services/auth.guard';
import { KitListComponent } from './kit-list/kit-list.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {
        path: 'add',
        component: AddKitComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: AddKitComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        component: KitListComponent,
        canActivate: [AuthGuard]
      }
    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KitRoutingModule { }

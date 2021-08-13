import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/services/auth.guard';
import { ReportComponent } from './report/report.component';

const routes: Routes = [

  {
    path : '',
    children : [
      {
        path: '',
        component: ReportComponent,
        canActivate : [AuthGuard]
      }
    ]
  
  }
    
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }

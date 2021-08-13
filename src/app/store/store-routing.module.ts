import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreSignupComponent } from './components/store-signup/store-signup.component';
import { StoreNotFoundComponent } from './components/store-not-found/store-not-found.component';
import { StoreAuthenticateComponent } from './components/store-authenticate/store-authenticate.component';
import { StoreLoginComponent } from './components/store-login/store-login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { StoreDashboardComponent } from './components/store-dashboard/store-dashboard.component';
import { StoreAuthGuard } from './utility/store-auth.guard';
import { EventCalendarComponent } from './components/event-calendar/event-calendar.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { StoreCanDeactivateGuard } from './utility/store-can-deactivate.guard';
import { HelpResourceComponent } from './components/help-resource/help-resource.component';
import { StoreReportsComponent } from './components/store-reports/store-reports.component';

const routes: Routes = [
  {
    path: 'authstore',
    component: StoreAuthenticateComponent
    
  },
  {
    path: 'verification/:id',
    component: ForgotPasswordComponent
    
  },
  {
    path: 'verification',
    component: ForgotPasswordComponent
    
  },
  {
    path: 'helpresource',
    component: HelpResourceComponent,
    canActivate: [StoreAuthGuard]
    
  },
  {
    path: 'storenotfound',
    component: StoreNotFoundComponent,
    canActivate: [StoreAuthGuard]
  },
  // {
  //   path: 'welcome',
  //   component: WelcomeComponent,
  //   canActivate: [StoreAuthGuard]
  // },
  {
    path: 'store-login',
    component: StoreLoginComponent,
    canActivate: [StoreAuthGuard]
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
    canActivate: [StoreAuthGuard]
    
  },
  {
    path: 'store-signup',
    component: StoreSignupComponent,
    canActivate: [StoreAuthGuard]
  },
  {
    path: 'store-dashboard',
    component: StoreDashboardComponent,
    canActivate: [StoreAuthGuard],
    canDeactivate: [StoreCanDeactivateGuard]
  },
  {
    path: 'order',
    loadChildren: 'app/store/components/order/order.module#OrderModule'   //lazy load the order component,
  },
  {
    path: 'resetpassword/:id',
    component: ForgotPasswordComponent,
    canActivate: [StoreAuthGuard]
  },
  {
    path: 'resetpassword',
    component: ForgotPasswordComponent,
    canActivate: [StoreAuthGuard]
  },
  {
    path: 'events',
    component: AddEventComponent,
    canActivate: [StoreAuthGuard]
  },
  {
    path: 'events/:id',
    component: AddEventComponent,
    canActivate: [StoreAuthGuard]
  },
  {
    path: 'storeorders',
    loadChildren: 'app/components/order-list/orderlist.module#OrderListModule',
    canActivate: [StoreAuthGuard]
  },
  {
    path: 'eventcalendar',
    component: EventCalendarComponent,
    canActivate: [StoreAuthGuard]
  },
  {
    path: 'storereport',
    component: StoreReportsComponent,
    canActivate: [StoreAuthGuard]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }

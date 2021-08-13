import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from 'ng-fullcalendar';


import { StoreRoutingModule } from './store-routing.module';
import { StoreSignupComponent } from './components/store-signup/store-signup.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { StoreNotFoundComponent } from './components/store-not-found/store-not-found.component';
import { StoreAuthenticateComponent } from './components/store-authenticate/store-authenticate.component';
import { StoreLoginComponent } from './components/store-login/store-login.component';
import { Common } from './utility/common';
import { StoreDashboardComponent } from './components/store-dashboard/store-dashboard.component';
import { SharedModule } from '../core/shared-module';
import { StoreService } from './service/store.service';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { StoreAuthGuard } from './utility/store-auth.guard';
import { EventCalendarComponent } from './components/event-calendar/event-calendar.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { PrintEventComponent } from './components/print-event/print-event.component';
import { StoreCategoryInfoComponent } from './components/store-category-info/store-category-info.component';
import { HelpResourceComponent } from './components/help-resource/help-resource.component';
import { ContactEmailPopupComponent } from './components/store-login/contact-email-popup/contact-email-popup.component';
import { AssociatedOrderingComponent } from './components/order/associated-ordering/associated-ordering.component';
import { AssociateProductComponent } from './components/order/associated-ordering/associate-product/associate-product.component';
import { DemandGraphicsComponent } from './components/order/demand-graphics/demand-graphics.component';
import { StoreReportsComponent } from './components/store-reports/store-reports.component';
import { ReportsService } from '../components/reports/reports.service';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { TwoFactorAuthComponent } from './components/two-factor-auth/two-factor-auth.component';

// import { DialogBoxComponent } from '../components/dialog-box/dialog-box.component';


@NgModule({
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule,
    FullCalendarModule,
    SelectAutocompleteModule,

  ],
  declarations: [
    WelcomeComponent,
    StoreNotFoundComponent,
    StoreAuthenticateComponent,
    StoreLoginComponent,
    StoreSignupComponent,
    StoreDashboardComponent,
    ForgotPasswordComponent,
    EventCalendarComponent,
    AddEventComponent,
    PrintEventComponent,
    StoreCategoryInfoComponent,
    HelpResourceComponent,
    ContactEmailPopupComponent,
    AssociatedOrderingComponent,
    AssociateProductComponent,
    DemandGraphicsComponent,
    StoreReportsComponent,
    TwoFactorAuthComponent,
    // DialogBoxComponent
  ],
  providers: [
    Common,
    StoreService,
    StoreAuthGuard,
    ReportsService,
  ],
  entryComponents: [
    PrintEventComponent,
    StoreCategoryInfoComponent, 
    ContactEmailPopupComponent, 
    AssociatedOrderingComponent,
    DemandGraphicsComponent,
    WelcomeComponent,
    TwoFactorAuthComponent
    // DialogBoxComponent
  ]
})
export class StoreModule { }

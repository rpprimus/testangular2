import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';         //HttpModule is required for Google login
import { HttpClientService } from './shared/services/http-client.service';
import { CookieService } from 'ngx-cookie-service';

import { LoaderService, LoaderInterceptor } from './core/loader-interceptor';  //for Global Loader
import { MatModule } from './core/mat-module';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './shared/services/auth.service';
import { Util } from './shared/services/util';

import { HeaderComponent } from "./components/layout/header/header.component";
import { FooterComponent } from "./components/layout/footer/footer.component";
import { SideNavComponent } from "./components/layout/side-nav/side-nav.component";
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { SharedService } from './shared/services/shared.service';
import { AppStorageService } from './shared/services/app-storage.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { AuthGuard } from './shared/services/auth.guard';
import { CategoryService } from './components/category/category.service';
import { StoreModule } from './store/store.module';
import { StoreHeaderComponent } from './store/components/store-layout/store-header/store-header.component';
import { StoreFooterComponent } from './store/components/store-layout/store-footer/store-footer.component';
import { DashboardService } from './components/dashboard/dashboard.service';
import { SelectClientPopupComponent } from './components/layout/side-nav/select-client-popup/select-client-popup.component';
import { DisplayMagnifiedImageComponent } from './components/display-magnified-image/display-magnified-image.component';
import { AppLoadService } from './shared/services/app-load.service';
import { LandingComponent } from './components/landing/landing.component';
import { MatSnackBarModule } from '@angular/material';
import { SocketIoService } from './shared/services/socketio.service';
import { ReportsService } from './components/reports/reports.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


export function get_settings(appLoadService: AppLoadService) {
  return () => appLoadService.getSettings();
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DialogBoxComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    DashboardComponent,
    SnackBarComponent,
    StoreHeaderComponent,
    StoreFooterComponent,
    SelectClientPopupComponent,
    DisplayMagnifiedImageComponent,
    LandingComponent    

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpModule,        //HttpModule is required for Google login
    MatModule,
    MatSnackBarModule,
    StoreModule,
    MatAutocompleteModule
  ],
  providers: [
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: get_settings, deps: [AppLoadService], multi: true },
    HttpClientService,
    LoaderService,        //For Global Loader 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }, 
    AuthService,
    Util,
    SharedService,
    AppStorageService,
    AuthGuard,
    CategoryService,
    CookieService,
    DashboardService,
    SocketIoService,
    ReportsService
  ],
  entryComponents: [DialogBoxComponent, SnackBarComponent,SelectClientPopupComponent,DisplayMagnifiedImageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }



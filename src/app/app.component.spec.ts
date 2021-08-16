import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderService } from './core/loader-interceptor';
import { Util } from './shared/services/util';
import { mockUtil } from '../Test/mockUtil';
import { AuthService } from './shared/services/auth.service';
import { mockAuthService } from '../Test/mockAuthService.service';
import { Common } from './store/utility/common';
import { mockCommon } from '../Test/mockCommon';
import { Router } from '@angular/router';
import { MatModule } from './core/mat-module';
import { SideNavComponent } from './components/layout/side-nav/side-nav.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { StoreHeaderComponent } from './store/components/store-layout/store-header/store-header.component';
import { StoreFooterComponent } from './store/components/store-layout/store-footer/store-footer.component';
import { Observable, BehaviorSubject } from 'rxjs';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router={
    navigate: jasmine.createSpy('navigate'),
    events: new BehaviorSubject<boolean>(false)
}
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        MatModule
      ],
      declarations: [
        AppComponent,SideNavComponent,HeaderComponent,StoreHeaderComponent,StoreFooterComponent
      ],
      providers:[LoaderService,{provide:Util,useClass:mockUtil},{provide:AuthService,useClass:mockAuthService},
      {provide:Common,useClass:mockCommon},{provide:Router,useValue:router}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    localStorage.setItem('selectedClientId','37')
    expect(component).toBeTruthy();
  }));

 it('should call clickEvent() method if block',()=>{
   let event={target:{id:"menubtn"}};
   component.clickEvent(event);
   fixture.detectChanges();
   expect(component.clickEvent).toBeTruthy();
 });

 it('should call clickEvent() method else block',()=>{
  let event={target:{id:"menubtnnn"}};
  component.clickEvent(event);
  fixture.detectChanges();
  expect(component.clickEvent).toBeTruthy();
});

});

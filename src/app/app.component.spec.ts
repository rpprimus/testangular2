import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        
      ],
      declarations: [
        AppComponent ],
    
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

 it('should return 8',()=>{
   component.num1 = 5;
   component.num2 = 3;
   component.add();
   expect(component.solution).toBe(8);
 });

 it('should return 9',()=>{
  component.num1 = 5;
   component.num2 = 4;
   component.add();
   expect(component.solution).toBe(9);
});

it('failed test case',()=>{
  component.num1 = 5;
   component.num2 = 4;
   component.add();
   expect(component.solution).toBe(12);
});
});

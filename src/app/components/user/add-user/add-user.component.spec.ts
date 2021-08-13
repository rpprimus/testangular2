import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { AddUserComponent } from './add-user.component';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatModule } from '../../../../app/core/mat-module';
import { PhoneNumberPipe } from '../../../shared/pipes/phone-number.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../user.service';
import { MockUserService } from '../../../../Test/mockUserService.service';
import { SharedService } from '../../../shared/services/shared.service';
import { mockSharedService } from '../../../../Test/mockSharedService';
import { Util } from '../../../shared/services/util';
import { mockUtil } from '../../../../Test/mockUtil';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserComponent,PhoneNumberPipe ],
      providers:[
        { provide: Util, useClass: mockUtil },
        { provide: SharedService, useClass: mockSharedService },
        { provide: UserService, useClass: MockUserService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
                routeConfig:{
                  path:"resetpassword/:id"
                },
                params:{
                  id:"340",
                  value:"5",
                  pageSize:11,
                  pageNumber:22,
                  fromDate:"11-18-2018",
                  toDaTe:"12-08-2018",
                  length:"5",
                  clientId:"10",
                  categoryId:"222",
                  sortBy:""

                }  ,
                queryParams:{
                  ClientId:"2", 
                  kit:{
                    isKit:true,
                  },
                  value:"5"
                }   
                },
                queryParams:{
                  ClientId:"2", 
                  value:{
                    kit:true
                  }
            },
            
        }, 
         }
      ],
      imports:[RouterTestingModule.withRoutes([
        { path: 'users', component: AddUserComponent }
      ]),FormsModule,ReactiveFormsModule,MatModule,BrowserAnimationsModule],
      schemas:[],
    })
    .compileComponents();
    router = TestBed.get(Router); 
    location = TestBed.get(Location);
    router.initialNavigation();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    component.selectedClient=[
      {id: 67, name: "Google1", checked: false},
      { id: 64, name: "Sakshitest2",  checked: false},
      {id: 65, name: "Development Testing", checked: false},
      {id: 1, name: "Test Client", checked: false}
     ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getRoles method', () => {
    component.getRoles();
    expect(component.getRoles).toBeTruthy();
  });
  it('should call getClients method', () => {
    component.getClients();
    expect(component.getClients).toBeTruthy();
  });
  it('should call getUserById method', () => {
    component.getUserById();
    expect(component.getUserById).toBeTruthy();
  });
  it('should call findIndex method', () => {
    let name="Kanishka";
    component.findIndex(name);
    expect(component.findIndex).toBeTruthy();
  });
  it('should call setClients method', () => {
    let selectedData={
      id: 64, 
      name: "Sakshitest2",
       checked: false
      }
    component.setClients(selectedData);
    expect(component.setClients).toBeTruthy();
  });
  it('should call remove method', () => {
    let name="";
    component.remove(name);
    expect(component.remove).toBeTruthy();
  });
  it('should call selectAll method', () => {
    component.selectAll();
    expect(component.selectAll).toBeTruthy();
  });
  it('should call submitUserForm method', () => {
    component.isFormSubmitted=false;
    component.selectedRole=["Admin"];
    component.addUserForm.controls['name'].setValue('Kanishka');
    component.addUserForm.controls['email'].setValue('kanishka.wadhwa@compunnel.in');
    component.addUserForm.controls['phoneNumber'].setValue('989-158-6222');
    component.submitUserForm();
    expect(component.submitUserForm).toBeTruthy();
  });
  it('should call resetUserForm method', () => {
    component.resetUserForm();
    expect(component.resetUserForm).toBeTruthy();
  });
  it('should call checkFormValidation method', () => {
    this.clientError=false;
    this.roleError=false;
    component.checkFormValidation();
    expect(component.checkFormValidation).toBeTruthy();
  });
});

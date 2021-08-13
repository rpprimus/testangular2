import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientStoreUserRoutingModule } from './client-store-user-routing.module';
import { ClientStoreUserListComponent } from './client-store-user-list/client-store-user-list.component';
import { SharedModule } from '../../core/shared-module';
import { ClientStoreUserService } from './client-store-user.service';
import { AddClientStoreUserComponent } from './add-client-store-user/add-client-store-user.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ClientStoreUserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ClientStoreUserListComponent,
    AddClientStoreUserComponent
  ],
  providers: [ClientStoreUserService]
})
export class ClientStoreUserModule { }

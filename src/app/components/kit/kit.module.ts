import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KitRoutingModule } from './kit-routing.module';
import { KitListComponent } from './kit-list/kit-list.component';
import { AddKitComponent } from './add-kit/add-kit.component';
import { SharedModule } from '../../core/shared-module';
import { KitService } from './kit.service';
import { KitResourceComponent } from './kit-resource/kit-resource.component';

@NgModule({
  imports: [
    CommonModule,
    KitRoutingModule,
    SharedModule
  ],
  declarations: [
    KitListComponent, 
    AddKitComponent, 
    KitResourceComponent
  ],
 providers: [KitService]
})
export class KitModule { }

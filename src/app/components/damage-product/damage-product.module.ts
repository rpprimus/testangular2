import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DamageProductRoutingModule } from './damage-product-routing.module';
import { DamageProductListComponent } from './damage-product-list/damage-product-list.component';
import { DamageProductDetailComponent } from './damage-product-detail/damage-product-detail.component';
import { SharedModule } from '../../core/shared-module';
import { DamageProductService } from './damage-product.service';
import { DamageProductResourceComponent } from './damage-product-resource/damage-product-resource.component';

@NgModule({
  imports: [
    CommonModule,
    DamageProductRoutingModule,
    SharedModule
  ],
  declarations: [
    DamageProductListComponent,
    DamageProductDetailComponent,
    DamageProductResourceComponent
  ],
  providers: [DamageProductService]
})
export class DamageProductModule { }

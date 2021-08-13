import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SharedModule } from '../../core/shared-module';
import { ProductsService } from './products.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductResourcesComponent } from './product-resources/product-resources.component';
import { ImportStepComponent } from './import-step/import-step.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProductListComponent,
    AddProductComponent,
    ProductResourcesComponent,
    ImportStepComponent
  ],
  providers: [ProductsService],
  entryComponents: [ImportStepComponent]
})
export class ProductModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from '../../core/shared-module';
import { ReportComponent } from './report/report.component';
import { ReportsService } from './reports.service';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SelectAutocompleteModule,
    SharedModule
  ],
  declarations: [
    ReportComponent
  ],
  providers: [ReportsService]
})
export class ReportsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientService } from './client.service';
import { AddClientComponent } from './add-client/add-client.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientSettingComponent } from './client-setting/client-setting.component';
import { ClientModulesComponent } from './client-modules/client-modules.component';
import { ClientThemeSettingsComponent } from './client-theme-settings/client-theme-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../core/shared-module';
import { ThemePreviewOneComponent } from './theme-preview/theme-preview-one/theme-preview-one.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ModuleCustomFieldsComponent } from './module-custom-fields/module-custom-fields.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ConditionalLinkComponent } from './conditional-link/conditional-link.component';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    SharedModule, // for shared component
    ImageCropperModule ,
    ColorPickerModule
  ],
  declarations: [
    ClientListComponent, 
    AddClientComponent,
    ClientDetailsComponent,
    ClientSettingComponent, 
    ClientModulesComponent,
    ClientThemeSettingsComponent,
    ThemePreviewOneComponent,
    ModuleCustomFieldsComponent,
    ConditionalLinkComponent,
   ],
  providers: [ClientService],
  entryComponents: [ConditionalLinkComponent]
})
export class ClientModule { }

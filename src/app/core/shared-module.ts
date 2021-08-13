import { NgModule } from "@angular/core";
import { FilterBoxComponent, MyFilterPipe } from "../components/filter-box/filter-box.component";
import { FormsModule } from "@angular/forms";
import { MatModule } from "./mat-module";
import { CommonModule } from "@angular/common";
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from "@angular/material/core";
import { CustomImgComponent } from "../components/custom-img/custom-img.component";
import { TrimDirective } from "../shared/directives/trim.directive";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DragDropRowsComponent } from "../components/drag-drop-rows/drag-drop-rows.component";
import { ChipComponent } from "../components/chip/chip.component";
import { CategoryTreeComponent, CategoryTreeActionBtnComponent } from "../components/category/category-tree/category-tree.component";

import { DynamicInputFieldComponent } from "../store/components/dynamic-input-field/dynamic-input-field.component";
import { LookupvaluesPipe } from '../shared/pipes/lookupvalues.pipe';
import { DynamicDisplayFieldComponent } from "../store/components/dynamic-display-field/dynamic-display-field.component";
import { CKEditorModule } from 'ng2-ckeditor';
import { QuantityComponent } from "../store/components/order/quantity/quantity.component";
import { TooltipModule } from 'ng2-tooltip-directive';
import { SelectCategoryDialogComponent } from "../components/product/select-category-dialog/select-category-dialog.component";
import { FocusDirective } from "../shared/directives/focus.directive";
import { CategoryDragDropComponent } from "../components/category/category-drag-drop/category-drag-drop.component";
import { CurrencyDirective } from "../shared/directives/currency.directive";
import { PhoneNumberPipe } from "../shared/pipes/phone-number.pipe";
import { KitAssociatedProductComponent } from "../components/kit/kit-associated-product/kit-associated-product.component";
import { DisplayLinkedFieldsComponent } from "../store/components/order/display-linked-fields/display-linked-fields.component";
import { CreditCardPipe } from "../shared/pipes/credit-card-mask.pipe";


@NgModule({
    imports: [
        FormsModule, 
        CommonModule, 
        MatModule,
        InfiniteScrollModule,
        CKEditorModule,
        TooltipModule 
    ],
    declarations: [
        FilterBoxComponent, 
        MyFilterPipe, 
        CustomImgComponent,
        TrimDirective,
        FocusDirective,
        CurrencyDirective,
        DragDropRowsComponent,
        ChipComponent,
        CategoryTreeComponent,
        CategoryDragDropComponent,
        CategoryTreeActionBtnComponent,
        DynamicInputFieldComponent,
        LookupvaluesPipe,
        DynamicDisplayFieldComponent,
        QuantityComponent,
        SelectCategoryDialogComponent,
        PhoneNumberPipe,
        KitAssociatedProductComponent,
        DisplayLinkedFieldsComponent,
        CreditCardPipe
    ],
    exports: [
        FilterBoxComponent, 
        MyFilterPipe, 
        CustomImgComponent,
        TrimDirective,
        FocusDirective,
        CurrencyDirective,
        MatModule,
        InfiniteScrollModule,
        DragDropRowsComponent,
        ChipComponent,
        CategoryTreeComponent,
        CategoryDragDropComponent,
        CategoryTreeActionBtnComponent,
        CKEditorModule,
        DynamicInputFieldComponent,
        DynamicDisplayFieldComponent,
        QuantityComponent,
        TooltipModule,
        SelectCategoryDialogComponent,
        PhoneNumberPipe,
        KitAssociatedProductComponent,
        DisplayLinkedFieldsComponent,
        CreditCardPipe
    ],
    providers: [
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],
        entryComponents:[SelectCategoryDialogComponent,KitAssociatedProductComponent]
})

export class SharedModule { }
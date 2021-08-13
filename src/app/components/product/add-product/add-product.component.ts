import { Component, OnInit, ViewChild } from '@angular/core';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Util } from '../../../shared/services/util';
import { forkJoin } from 'rxjs';
import { AppConstant } from '../../../shared/config/app-constant';

import { CategoryService } from '../../category/category.service';
import { MatDialog, MatTableDataSource, MatRadioChange } from '@angular/material';
import { SelectCategoryDialogComponent } from '../select-category-dialog/select-category-dialog.component';
import { KitAssociatedProductComponent } from '../../kit/kit-associated-product/kit-associated-product.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ImportStepComponent } from '../import-step/import-step.component';
import { Enum } from './../../../shared/config/enum.enum';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

    defaultImageSrc: string = "./assets/images/frame-landscape-placeholder.svg";
    @ViewChild('addProductForm') addProductForm;
    appMessage = AppMessage;
    appConstant = AppConstant;
    isFormValid: boolean = true;
    selectedCategories: any = [];
    selectedCategoriesText: string = "";
    id: number = 0;
    data: any = {};
    visibilityGroup = {
        arrayValue: [],
        placeholder: "Visibility Group"   //have to pass the placeholder value to chip component
    };
    warehouse: any;
    isVisibility: boolean = false;  //to check whether visibility for client is enabled
    selectedGroup = [];
    isReset: boolean = false;
    isFormSubmitted: boolean = false;  //if form is submitted once then no action to perform on save button
    isClientLabelName: string = '';   //for showing if client product label name is enabled for client in settings then show the label name as placeholder
    selectedWarehouse: any = [];  //to disable the warehouse in dropdown which are already selected
    minDate = new Date(); //used in html for disabling previous dates from the calender
    briefDescriptionError: string = '';
    isEventEnabled: boolean = false;
    expirationDate: any = "";
    isOnDemandGraphic: boolean = false;

    delList: any = {};
    //associatedProductList: any = new MatTableDataSource();
    displayedColumns: string[] = ['productImg', 'productId', 'productName', 'categories', 'minQuantity', 'maxQuantity', 'link'];
    isTypeOfDemandSelected: boolean = false;

    tempDataListOfDeletedProduct = [];
    pid: any;

    currentDate = new Date();
    isWorkshopTeamMember: boolean = false;
    enum = Enum;
    disableHoldProduct: boolean = false; //it will be true only for workshop team member 
    currentRecord: number = 0;
    totalRecords: number = 0;

    constructor(private _activatedRoute: ActivatedRoute, private productService: ProductsService, private router: Router,
        private sharedService: SharedService, public util: Util, public categoryService: CategoryService, private dialog: MatDialog,
        public _domSanitizationService: DomSanitizer) {
        this.util.currentPageLink = 'product';
    }

    ngOnInit() {
        // if (!!window.performance && window.performance.navigation.type == 2) {   //this is done such that data is fetched from server in case of browser back button
        //     this.getData();
        // } else {
        //     this.getData();
        // }
        this.getData();
        let user = JSON.parse(localStorage.getItem('user'));
        //check that if the logged in user has 2 role(one will be store admin which is added by default) and that role is workshop team such that they cannot edit the status of the product
        if (user && user.roles.length == 2 && user.roles[0] == Enum.TEAM) {
            this.disableHoldProduct = true;
        }

    }

    getData() {
        this.categoryService.loadData();
        this.getSettings();
        this.id = this._activatedRoute.snapshot.params['id'] ? this._activatedRoute.snapshot.params['id'] : 0;
        this.data = {
            briefDescription: "",
            categoryId: [],
            clientProductName: "",
            clientId: localStorage.getItem('selectedClientId'),
            dimensions: {
                height: "",
                length: "",
                weight: "",
                width: ""
            },
            id: 0,
            lowThresholdLimit: null,
            maxOrderQuantity: null,
            otherFeatures: {
                itemOnHold: false,
                newProduct: false,
                returnableProduct: true   //by default it is true for new products but in case event not enabled then checked false and field is disabled
            },
            productExpirationDate: "",
            productNumber: "",
            productName: "",
            productPrice: null,
            productMaxPrice: null,
            productResources: [],
            showPrice: false,
            visibilityGroup: [],
            isPriceRange: false,
            isApprove: false,
            textGraphicCount: "",
            wareHouses: [
                {
                    id: null,
                    quantity: null
                }
            ],
            steps: [
                {
                    id: 0,
                    isRequired: true,
                    products: new MatTableDataSource(),
                    stepDescription: "",
                    stepName: "",
                    quantity: null
                }
            ]
        }
        if (this.id > 0) {
            this.getProductData();
        } else {
            this.getDefaultProduct();
        }
    }

    initializeSteps() {
        this.data.steps = [{ id: 0, isRequired: true, products: new MatTableDataSource(), stepDescription: "", stepName: "", quantity: null }]
    }


    getProductData() {
        let param = {
            pathVariable: this.id,
            clientId: localStorage.getItem('selectedClientId')
        }
        this.productService.getProductById(param).subscribe(response => {
            this.sharedService.onSuccess(response, null, () => {
                if (response.response) {
                    this.data = response.response; //productResources
                    this.getDetailSequence();
                    if (this.data.wareHouses.length > 0 && this.data.wareHouses[0].id) { //disable the warehouse name from the dropdown which are already selected
                        this.data.wareHouses.forEach(x => {
                            if (x.id) {
                                this.selectedWarehouse.push(x.id);
                            }
                        });
                    } else {
                        this.data.wareHouses.push({ id: null, quantity: null, isNew: true });
                    }
                    if (this.data.productExpirationDate) {
                        this.expirationDate = this.util.displayFormattedDate(this.data.productExpirationDate);
                    } else {
                        this.expirationDate = "";
                    }
                    this.getPrice();
                    this.checkOnDemandGraphics();
                    this.getVisibilitySelectedGroup();
                    // setTimeout(() => {
                    //     this.selectedCategoriesText = '';
                    //     this.setCategoriesText(this.categoryService.data);
                    //     this.selectedCategoriesText = this.selectedCategoriesText.substring(0, this.selectedCategoriesText.length - 2);
                    // }, 5000);
                    this.categoryService.categoryDataInserted.subscribe(val => {
                        if (val) {
                            this.selectedCategoriesText = '';
                            this.setCategoriesText(this.categoryService.data);
                            this.selectedCategoriesText = this.selectedCategoriesText.substring(0, this.selectedCategoriesText.length - 2);
                        }
                    })

                    if (this.data.steps.length == 0) {
                        this.initializeSteps();
                        this.getDefaultProduct();
                    } else {
                        this.getAssociatedProductImages(false);
                    }
                    this.disableFormForWorkshopTeam();
                }
            });
        }, error => { this.sharedService.onError(error) });
    }

    getPrice() {
        this.data.productPrice = this.data.productPrice ? this.data.productPrice.toLocaleString('en-US', { minimumFractionDigits: 2 }) : null;
        if (this.data.isPriceRange) {
            this.data.productMaxPrice = this.data.productMaxPrice ? this.data.productMaxPrice.toLocaleString('en-US', { minimumFractionDigits: 2 }) : null;
        }
    }

    /**
     * If any of the isTextGraphic and isUploadGraphic is true then set the flag of onDemandGrphics as true
     */
    checkOnDemandGraphics() {
        if (this.data.isTextGraphic || this.data.isUploadGraphic) {
            this.isOnDemandGraphic = true;
        }
    }

    /**
     * To set and toogle the values of isTextGraphic and isUploadGraphic based on which radio button is selected
     * @param mrChange change event of radio button click
     */
    onSelectDemandGraphic(mrChange: MatRadioChange) {
        this.addProductForm.form.markAsDirty(); //mark the form as dirty and enable the submit btn
        this.isTypeOfDemandSelected = false;
        if (mrChange.value == "isTextGraphic") {
            this.data.isTextGraphic = true;
            this.data.isUploadGraphic = false;
        } else {
            this.data.isUploadGraphic = true;
            this.data.isTextGraphic = false;
        }
    }

    openCatDialog() {
        if (!this.isWorkshopTeamMember) {  //open dialog only when not workshop team member
            this.dialog.open(SelectCategoryDialogComponent, {
                data: this.data.categoryId.length > 0 ? this.data.categoryId : null   //have to define the null in tertiary operator otherwise sonar qube gives error
            }).afterClosed().subscribe(result => {
                if (result) {
                    this.addProductForm.form.markAsDirty(); //mark the form as dirty and enable the submit btn
                    this.selectedCategoriesText = "";
                    this.selectedCategories = result;
                    this.addCategoryId(result);
                    result.forEach(element => {
                        this.selectedCategoriesText += element.name + ", ";
                    });
                    this.selectedCategoriesText = this.selectedCategoriesText.substring(0, this.selectedCategoriesText.length - 2);
                }
            });
        }
    }

    /**Push the value of selected category in categoryId json */
    addCategoryId(data: any) {
        this.data.categoryId = [];
        if (data != '') {
            data.forEach(x => {
                this.data.categoryId.push(x.id);
            });
        }
    }

    //remove ',' from price for server json e.g.- $1,000.00 to 1000.00
    //while saving the productDetails, productPrice and productMaxPrice should be of type string so that
    //replace() could work
    formatPrice() {
        if (typeof (this.data.productPrice) == "string") {
            this.data.productPrice = this.data.productPrice ? Number(this.data.productPrice.replace(/,/g, "")) : null;
        }
        if (this.data.isPriceRange) {
            if (typeof (this.data.productMaxPrice) == "string") {
                this.data.productMaxPrice = this.data.productMaxPrice ? Number(this.data.productMaxPrice.replace(/,/g, "")) : null;
            }
        }

    }

    /**
     * called on entire form submit
     */
    submitProductDetails(type?) {
        // this.getProductData();
        // check if step(s) has no product to show step name on alert
        let steps = this.getUnsavedSteps();
        let message = `Step ${steps.join(', ')} ${steps.length > 1 ? 'do' : 'does'} not have any product added, atleast 1 product is required to be added.`;

        if (this.validateForm() && !this.isFormSubmitted) {
            if (!this.validateStepProduct()) {
                //show a confirm dialog box before status change
                this.sharedService.openDialog('e', message, (result) => {
                    if (result) {
                        this.formatStepProducts();
                        this.saveProduct(type);
                        this.associatedProductListDelete();
                    } else {
                        return;
                    }
                });
            } else {
                this.formatStepProducts();
                this.saveProduct(type);
                this.associatedProductListDelete();
            }
        }
    }

    saveProduct(type) {

        this.isFormSubmitted = true;
        this.data.lowThresholdLimit = this.data.lowThresholdLimit ? Number(this.data.lowThresholdLimit) : null;
        this.data.maxOrderQuantity = this.data.maxOrderQuantity ? Number(this.data.maxOrderQuantity) : null;
        this.formatPrice();
        this.formatOnDemandGraphic();
        this.removeEmptyWarehouseRecord();  //remove empty warehouse array
        if (this.id > 0) {
            this.data.pathVariable = this.id;
            this.getNewWarehouses();
        }
        this.data.productExpirationDate = this.expirationDate;
        if (this.data.productExpirationDate) {
            this.data.productExpirationDate = this.util.formatDate(this.data.productExpirationDate);
        }
        let request = this.productService.saveProduct(this.data, (this.id > 0) ? 'put' : 'post');
        request.subscribe(response => {
            this.isFormSubmitted = false;
            this.sharedService.onSuccess(response, null, (value) => {
                // this.data.productExpirationDate = this.util.displayFormattedDate(this.data.productExpirationDate);
                if (value) {
                    this.id = response.response.id;
                    this.data.isApprove = false;
                    if(!type){
                        this.sharedService.otherConfirmBox(AppMessage.U0057, 'cs', (value) => {
                            if (value) {
                                this.router.navigate(['/product']);
                            } else {
                                this.getProductData();
                            }
                        });
                    }
                    else{
                        if(type == 'next'){
                            this.getRecord(type);
                        }else if(type == 'exit'){
                            this.router.navigate(['/product']);
                        }
                    }
                }
                // else{
                //     this.someName(this.data.steps)
                // }
            });
        }, error => { this.sharedService.onError(error) });
    }

    //we have to send the steps.products to API as Array and before formatting we have that in MatTable form, so format it
    formatStepProducts() {
        if (this.data.steps.length > 0) {
            if (this.data.steps[0].products.data[0].productId == 0 && this.data.steps[0].stepName == "") {
                this.data.steps = [];   //if no product is entered then empty the array
            } else {
                this.data.steps.forEach(step => {
                    if (step.products.data[0].productId > 0) {
                        step.products = step.products.data;
                    } else {
                        this.data.steps.splice(this.data.steps.indexOf(step), 1);
                    }
                });
            }
        }
    }

    /**
     * return boolean value if any step has name/description but no product added
     */
    validateStepProduct(): boolean {
        for (let i = 0; i < this.data.steps.length; i++) {
            if (this.data.steps[i].products.data[0].productId == 0 &&
                (this.data.steps[i].stepName != "" || this.data.steps[i].stepDescription != "")) {
                return false;
            }
        }
        return true;
    }

    /**
     * return step name array which has no product
     */
    getUnsavedSteps() {
        let steps = [];
        for (let i = 0; i < this.data.steps.length; i++) {
            this.formatStepDataToMatTableDataSrc(this.data.steps[i]);
            if (this.data.steps[i].products.data[0].productId == 0 &&
                (this.data.steps[i].stepName != "" || this.data.steps[i].stepDescription != "")) {
                steps.push(this.data.steps[i].stepName);
            }
        }
        return steps;
    }

    //in case of edit, set the ngModel of category to the name of the selected categories
    setCategoriesText(allData) {

        allData.forEach(element => {
            if (this.data.categoryId.indexOf(element.id) > -1) {
                this.selectedCategoriesText += element.name + ", ";
            }
            if (element.childrens.length > 0) {
                this.setCategoriesText(element.childrens);
            }
        });
    }

    //Remove the already exisiting warehouse from json data in case of edit scenario
    getNewWarehouses() {
        this.data.wareHouses = this.data.wareHouses.filter(x => x.isNew && x.id);
    }

    removeEmptyWarehouseRecord() {
        this.data.wareHouses = this.data.wareHouses.filter(x => (x.id != null || undefined || 0));
    }

    /** if visibility of client is enabled then only show visibility group dropdown 
     * Also hit get API's for warehouse and visibility value for the dropdown list
    */
    getSettings() {
        this.isVisibility = false;
        let param1: any = {
            pathVariable: localStorage.getItem('selectedClientId')
        }
        let param2 = {
            clientId: param1.pathVariable
        }
        let settings = this.productService.getClientSetting(param1);
        let warehouse = this.productService.getWarehouseList();
        let visibilityGroup = this.productService.getVisibilityGroup(param2);
        forkJoin([settings, warehouse, visibilityGroup]).subscribe(response => {
            if (response) {
                let [a, b, c] = response;
                if (a.response.settings.isVisibilityRestriction) {
                    this.isVisibility = true;
                }
                if (a.response.settings.isClientProductName) {
                    this.isClientLabelName = a.response.settings.clientProductName;
                }
                if (this.id == 0) {
                    if (a.response.settings.isEventEnable) {
                        this.data.otherFeatures.returnableProduct = true;
                        this.isEventEnabled = true;
                    } else {
                        this.data.otherFeatures.returnableProduct = false;
                        this.isEventEnabled = false;
                    }
                }
                this.warehouse = b.response;
                if (this.isVisibility) {
                    Object.assign(this.visibilityGroup.arrayValue, c.response);
                }
            }
        }, error => { this.sharedService.onError(error) });
    }

    validateForm() {
        this.briefDescriptionError = '';
        let valid = this.addProductForm.valid; // form required  
        if (this.data.categoryId.length == 0) {   //validate the category required
            valid = false;
        }
        if (this.data.maxOrderQuantity && this.data.maxOrderQuantity == 0) {
            valid = false;
        }
        if (this.isOnDemandGraphic && !this.data.isTextGraphic && !this.data.isUploadGraphic) {
            this.isTypeOfDemandSelected = true;
            valid = false;
        }
        this.util.validateCkEditor(true, (value, msg) => {    //validate the character count and space trial in ckeditor
            if (!value) {
                if (msg == 'count') {
                    this.briefDescriptionError = AppMessage.U0139;
                    valid = false;
                }
                else {
                    valid = false;
                    this.briefDescriptionError = AppMessage.U0056;
                }
            }
        });
        if (valid) {    //check whether warehouses are entered but there quantity is not entered then return form invalid
            //this.removeEmptyWarehouseRecord();
            if (this.data.wareHouses.length > 0) {
                this.data.wareHouses.forEach(element => {
                    if (element.id && (element.quantity == null || element.quantity === '')) {
                        valid = false;
                    } else if (element.quantity > 0 && (element.id == undefined || element.id == null)) {
                        valid = false;
                    }
                });
            }
        }
        this.isFormValid = valid; // used in HTML
        return valid;
    }

    /** called for chip component in visibility group to set the value of selected chips into data visibility group */
    onChangeVisibilityGroup(data: any) {
        this.addProductForm.form.markAsDirty(); //mark the form as dirty and enable the submit btn
        this.data.visibilityGroup = [];
        if (data != '') {
            data.forEach(x => {
                this.data.visibilityGroup.push(x.id);
            });
        }
    }

    getVisibilitySelectedGroup() {    //when get Api is called then use this function to set the values of selected visibility group
        let array = [];
        this.visibilityGroup.arrayValue.forEach(element => {
            if (this.data.visibilityGroup && this.data.visibilityGroup.indexOf(element.id) > -1) {
                array.push(element);
            }
        });
        if (array.length > 0) {
            this.selectedGroup = array;
        }
    }

    // isNew is just a temp var to display cross icon
    onAddWarehouseItems() {
        this.addProductForm.form.markAsDirty(); //mark the form as dirty and enable the submit btn
        this.data.wareHouses.push({ id: null, quantity: null, isNew: true });
    }

    onRemoveWarehouseItems(index: number, id: number) {
        this.addProductForm.form.markAsDirty(); //mark the form as dirty and enable the submit btn
        this.data.wareHouses.splice(index, 1);
        this.selectedWarehouse.splice(this.selectedWarehouse.indexOf(id), 1);
    }

    /** Disable the name of the warehouses from the dropdown list which are already selected */
    disableSelectedWareHouse() {
        this.addProductForm.form.markAsDirty(); //mark the form as dirty and enable the submit btn
        //if (this.data.wareHouses[0].id > 0) { //disable the warehouse name from the dropdown which are already selected
        this.selectedWarehouse = [];
        this.data.wareHouses.forEach(x => {
            if (x.id > 0 && (this.selectedWarehouse.indexOf(x.id) == -1)) {
                this.selectedWarehouse.push(x.id);
            }
        });
        //  };
    }

    /**
     * Open a popup to import the steps of the searched product
     */
    importStep() {
        this.dialog.open(ImportStepComponent, {
            data: this.data
        }).afterClosed().subscribe(result => {
            if (result.length > 0) {
                this.addProductForm.form.markAsDirty(); //mark the form as dirty and enable the submit btn
                if (this.data.steps[0].products.data[0].productId == 0 && this.data.steps[0].stepName == "") {
                    this.data.steps = [];   //if no product is entered then empty the array
                }
                this.data.steps = [...this.data.steps, ...result];
                this.getAssociatedProductImages(true);
            }
        });
    }

    /**
     * Add new step if following conditions are satisfied
     * 1- If the last step has atleast one product in it
     * 2- If total steps length are less than 5
     */
    addStep() {
        let step = this.data.steps;
        if (step[step.length - 1].products.data[0]['productId'] > 0) {
            if (step.length == 5) {
                this.sharedService.openToast('e', AppMessage.U0166);
            } else {
                step.push({ id: 0, isRequired: true, products: new MatTableDataSource(), stepDescription: "", stepName: "", quantity: null });
                let data = step[step.length - 1].products.data;
                data.push({ productImg: this.defaultImageSrc, productId: 0, productName: '', categories: '', minQuantity: '', maxQuantity: '' });
                step[step.length - 1].products.data = data;
            }
        } else {
            this.sharedService.openToast('e', AppMessage.U0154);
        }
    }

    getDefaultProduct() {
        // if (this.data.steps[0].products.data.length == 0) {
        //     let data = this.data.steps[0].products.data;
        //     data.push({ productImg: this.defaultImageSrc, productId: 0, productName: '', categories: '', minQuantity: '', maxQuantity: '' });
        //     this.data.steps[0].products.data = data;
        // }
        this.data.steps.forEach(step => {
            if (step.products.data.length == 0) {
                let data = step.products.data;
                data.push({ productImg: this.defaultImageSrc, productId: 0, productName: '', categories: '', minQuantity: '', maxQuantity: '' });
                step.products.data = data;
            }
        })
    }

    //open the popUp to select the product
    addAssociatedProducts(step) {
        this.dialog.open(KitAssociatedProductComponent, {
            data: {
                alreadySelected: step.products.data.length > 0 ? step.products.data : null,
                isAssociatedProduct: true
            }
        }).afterClosed().subscribe(result => {
            if (result) {
                this.addProductForm.form.markAsDirty(); //mark the form as dirty and enable the submit btn
                if (step.products.data.length > 0 && step.products.data[0].productId != 0) {  //push the selected product into list
                    let previouslist = [...step.products.data];
                    previouslist.push.apply(previouslist, result);
                    step.products.data = Array.from(new Set(previouslist.map(i => i.productId)))
                        .map(id => {
                            return previouslist.find(item => item.productId === id)
                        });

                } else {
                    step.products.data = result;
                }
            }
            this.getDefaultProduct();
        });
    }

    /**
     * remove product from ui
     * @param element : product object to be removed
     * @param step : step reference of product
     */
    removeAssociatedProduct(element, step) {
        let prod = step.products.data;
        prod.splice(prod.indexOf(element), 1);
        step.products.data = prod;
        // add default blank product object if not product is added
        this.getDefaultProduct();
    }

    /**
     * remove entire step along with products
     * @param stepDetail : step object
     */
    deleteAssociatedStep(stepDetail) {
        if (stepDetail.id > 0) {
            this.sharedService.confirmBox(AppMessage.U0155, (result) => {
                if (result) {
                    let param = {
                        pathVariable: stepDetail.id,
                        id: stepDetail.id,
                        clientId: localStorage.getItem('selectedClientId')
                    }
                    this.productService.deleteAssociatedStep(param).subscribe(response => {
                        this.sharedService.onSuccess(response, 'U0158', (value) => {
                            if (value) {
                                this.removeAssociatedStep(stepDetail);
                                delete this.delList[stepDetail.id];
                                if (this.data.steps.length == 0) {
                                    this.initializeSteps();
                                    this.getDefaultProduct();
                                }
                            }
                        });
                    }, error => { this.sharedService.onError(error) });
                }
            });
        }
        else if (stepDetail.id == 0 && this.data.steps.length == 1) {
            this.removeAssociatedStep(stepDetail);
            this.initializeSteps();
            this.getDefaultProduct();
        }
        else {
            this.removeAssociatedStep(stepDetail);
        }
    }

    removeAssociatedStep(step) {
        let steps = this.data.steps;
        steps.splice(steps.indexOf(step), 1);
    }

    /**
     * when edit product then format step products into MatTableDatasource and get images for all products
     * but in case of import steps, do the following only in case of imported steps which have id = 0
     * @param isImport : boolean, determine whether called from getProductsById or from Import steps
     */
    getAssociatedProductImages(isImport) {
        let steps = this.data.steps;
        let requests = [];
        steps.forEach(step => {
            if (isImport && step.id == 0) {
                this.formatNGetImage(step, (value) => {
                    requests.push(value);
                });
            } else if (!isImport) {
                this.formatNGetImage(step, (value) => {
                    requests.push(value);
                });
            }

        });
        this.getProdImages(requests);
    }

    formatNGetImage(step, fn) {
        if (!step.products.data) {
            let data = step.products;
            step.products = new MatTableDataSource();  //change the array type of steps product into MatTableData source
            step.products.data = data;
        }
        step.products.data.forEach(prod => {
            if (prod.resouceId) {
                return fn(this.productService.getThumbnailImage({ pathVariable: prod.resouceId })); // put all GET request for images in array
            }
            prod.url = this.defaultImageSrc;
        });
    }

    getProdImages(requests) {
        this.util.hideLoader = true; // we dont need loader to load images
        // used spread operator here
        let steps = this.data.steps;
        forkJoin(...requests).subscribe(response => {
            response.forEach((element) => {
                let value = element.url.split('/');
                if (element.body.type != 'application/json') { // application/json means there is no any image and we get error product image not found for this case
                    const data = window.URL.createObjectURL(element.body);
                    for (let i = 0; i < steps.length; i++) {   //this loop because we have to insert the data into that items which have the corresponding resource id
                        let associateProdData = steps[i].products.data;
                        for (let j = 0; j < associateProdData.length; j++) {
                            if (associateProdData[j].resouceId == Number(value[value.length - 1])) {
                                associateProdData[j].url = data; // update URL 
                                break;
                            }
                        }
                        steps[i].products.data = associateProdData;
                    }
                } else {
                    console.log('someting went wrong to fetch Images from server...');
                }
            });
        });
    }

    //if the flag of onDemandGraphic is unchecked then set the value of both flags i.e. isTextGraphic & isUploadGraphic to false
    formatOnDemandGraphic() {
        if (!this.isOnDemandGraphic) {
            this.data.isTextGraphic = this.data.isUploadGraphic = false;
        }
    }

    /**
     * creates a object array which product to be removed on submit button
     * @param row : product object 
     * @param step : step object
     * @param isStep : optional boolean value if called from step 
     */
    storeAssociateStepAndProductList(row, step, isStep?) {

        if (typeof this.delList[step.id] !== 'undefined') {
            this.delList[step.id].isDeleted = isStep ? true : false;
            if (!isStep) {
                if (this.delList[step.id].pids.indexOf(row.id) < 0) {
                    this.delList[step.id].pids.push(row.id)
                }
            }
        } else {
            this.delList[step.id] = {
                isDeleted: isStep ? true : false,
                pids: isStep ? [] : [row.id]
            }
        }

        if (!isStep) {
            let prod = step.products.data;
            prod.splice(prod.indexOf(row), 1);
            step.products.data = prod;
            this.getDefaultProduct();
        }
        if (isStep) {
            let steps = this.data.steps;
            steps.splice(steps.indexOf(step), 1);
        }
        this.addProductForm.form.markAsDirty();
    }

    storeAssociatedProductData(row, step) {
        this.tempDataListOfDeletedProduct.push(row.id, step.id);
        let prod = step.products.data;
        prod.splice(prod.indexOf(row), 1);
        step.products.data = prod;
    }

    /**
     * api call to removed product based on delete list 
     */
    associatedProductListDelete() {

        // if step isDelete true : delete step else delete product
        for (let i in this.delList) {
            if (this.delList[i].isDeleted) {
                // call step delete api
                let params = {
                    pathVariable: i,
                    id: i,
                    clientId: localStorage.getItem('selectedClientId')
                }
                this.productService.deleteAssociatedStep(params).subscribe(response => {
                    this.sharedService.onSuccess(response, null, () => {
                        this.delList = {};
                    });
                    /* this.sharedService.onSuccess(response, 'U0158', (value) => {
                        if (value) {
                            // delete this.delList[i];
                            this.delList = {};
                        }
                    }); */
                }, error => { this.sharedService.onError(error) });
            } else if (this.delList[i].pids.length) {
                // call product delete api

                let param = {
                    stepIds: this.delList[i].pids,
                    clientId: localStorage.getItem('selectedClientId')
                }
                this.productService.deleteAssociatedProduct(param).subscribe(response => {
                    this.sharedService.onSuccess(response, null, () => {
                        this.delList = {};
                    });
                }, error => { this.sharedService.onError(error) });
            }
        }
    }

    //Show error message in case the Product Expiry Date is less than the current date
    prodExpiryDate(): boolean {
        return (this.expirationDate && this.expirationDate < this.currentDate) ? true : false;
        // if (this.expirationDate && this.expirationDate < this.currentDate) {
        //     return true;
        // }
        // else {
        //     return false;
        // }
    }
    //to delte the epiration date on a product
    resetProductExpirationDate() {
        this.expirationDate = undefined;
        this.addProductForm.form.markAsDirty();
    }

    //formatted steps data to MatTableDataSource, because on submission it changed to array of objects
    formatStepDataToMatTableDataSrc(step) {
        if (!step.products.data) {
            let stepData = step.products;
            step.products = new MatTableDataSource();  //change the array type of steps product into MatTableData source
            step.products.data = stepData;
        }
    }

    //disable form for editing in case of workshop team role member
    disableFormForWorkshopTeam() {
        if (this.id > 0 && this.disableHoldProduct && (this.data.productStatus == Enum.Active ||
            this.data.productStatus == Enum.Inactive || this.data.productStatus == Enum.Product_Status_On_Hold)) {
            this.isWorkshopTeamMember = true;
            this.util.markFormControlDisable(this.addProductForm);
        }
    }

    //change the status of product from Approval awaited to Active and save the details
    approveNsave() {
        this.data.isApprove = true;
        this.submitProductDetails();
    }

    //Get the current sequence of data 
    getDetailSequence() {
        this.sharedService.getSequence(this.enum.product, localStorage.getItem('selectedClientId'), (value) => {
            this.totalRecords = value.length;
            this.currentRecord = value.find(x => x.id == this.id)['sequence'];
        });
    }

    getRecord(type, event?) {
        if(event){
            event.preventDefault();
        }
        let id;
        switch (type) {
            case "first": id = this.sharedService.retrieveSequenceMap(1);
                break;
            case "pre": id = this.sharedService.retrieveSequenceMap(this.currentRecord - 1);
                break;
            case "next": id = this.sharedService.retrieveSequenceMap(this.currentRecord + 1);
                break;
            case "last": id = this.sharedService.retrieveSequenceMap(this.totalRecords);
                break;
        }
        //to reload the same url
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/product/' + id]));

    }

    //Previous function
    // deleteAssociatedProduct(element, step) {

    //     if (element.id > 0) {
    //         this.sharedService.confirmBox(AppMessage.U0155, (result) => {
    //             if (result) {
    //                 let param = {
    //                     pathVariable: element.id
    //                 }
    //                 this.productService.deleteAssociatedProduct(param).subscribe(response => {
    //                     this.sharedService.onSuccess(response, 'U0156', (value) => {
    //                        
    //                         if (value) {
    //                             this.removeAssociatedProduct(element, step);
    //                         }
    //                     });
    //                 }, error => { this.sharedService.onError(error) });
    //             }
    //         });
    //     }
    //     else {
    //         this.removeAssociatedProduct(element, step);
    //     }
    // }

    /** Format the date to the format of YYYY-MM-DD to send it to backend */
    // formatDate() {
    //     if (this.data.productExpirationDate) {
    //         let date = this.data.productExpirationDate;
    //         let curr_date = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //         let mon = date.getMonth() + 1; //Months are zero based
    //         let curr_month = mon < 10 ? '0' + mon : mon;
    //         let curr_year = date.getFullYear();
    //         this.data.productExpirationDate = curr_date + '-' + curr_month + '-' + curr_year;
    //     }
    // }

    //reset the add product form
    // resetProductDetails() {
    //     this.addProductForm.reset();
    //     this.selectedWarehouse = [];
    //     this.selectedCategories = [];
    //     this.isReset = true;
    //     this.isFormValid = true;
    //     this.data.visibilityGroup = [];
    //     this.data.categoryId = [];
    //     this.data.wareHouses = this.data.wareHouses.filter(x => !x.isNew);
    //     if (this.data.wareHouses.length == 0) {
    //         this.data.wareHouses.push({ id: null, quantity: null, isNew: true });
    //     }
    //     this.data.productResources = [];
    //     this.selectedCategoriesText = '';
    // }
}

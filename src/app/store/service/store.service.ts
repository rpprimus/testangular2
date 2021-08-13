import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/services/http-client.service';
import { AppUrl } from '../../shared/config/app-url.enum';
import { MatDialog } from '@angular/material';
import { Common } from '../utility/common';
import { DemandGraphicsComponent } from '../components/order/demand-graphics/demand-graphics.component';
import { AssociatedOrderingComponent } from '../components/order/associated-ordering/associated-ordering.component';

@Injectable()
export class StoreService {

  constructor(private httpClientService: HttpClientService,private common:Common,public dialog: MatDialog) { }

  signUpClient(param){
    return this.httpClientService.post(AppUrl.signupClient, param);
  }

  getHierarchy(param){
    return this.httpClientService.get(AppUrl.getStoreHierarchies,param);
  }

  getClientSetting(param) {
    return this.httpClientService.get(AppUrl.clientSetting, param);
  }

  passwordResetRequest(param){
    return this.httpClientService.get(AppUrl.passwordResetRequest, param);
  }

  resetPassword(param){
    return this.httpClientService.post(AppUrl.resetPassword, param); 
  }
  browseProductList(param){
    return this.httpClientService.get(AppUrl.browseProductList, param)
  }

  getUserInfo(){
    return this.httpClientService.get(AppUrl.getUserInfo);
  }

  // getCategories(param) {
  //   return this.httpClientService.get(AppUrl.getCategories, param);
  // }

  getCategories(param) {
    return this.httpClientService.get(AppUrl.getBrowseCategories, param);
  }

  getProductDetail(param){
    return this.httpClientService.get(AppUrl.productDetail, param);
  }

  placeOrder(param){
    return this.httpClientService.post(AppUrl.placeOrder, param);
  }

  getOrderList(param){
    return this.httpClientService.get(AppUrl.getOrderList, param);
  }

  getHeaderFooter(param){
    return this.httpClientService.get(AppUrl.getHeaderFooter, param);
  }

  getRequestor(param){
    return this.httpClientService.get(AppUrl.getRequestors, param);
  }

  addEvent(param) {
    return this.httpClientService.post(AppUrl.eventDetail, param);
  }
  updateEvent(param) {
    return this.httpClientService.put(AppUrl.eventDetail, param);
  }
  getEvent(param) {
    return this.httpClientService.get(AppUrl.eventDetail, param);
  }
  getAllEvents(param) {
    return this.httpClientService.get(AppUrl.getAllEvents, param);
  }
  browseKitList(param){
    return this.httpClientService.get(AppUrl.browseKitList, param)
  }
  getKitDetail(param){
    return this.httpClientService.get(AppUrl.kitStoreDetail, param);
  }
  getHelpAndResourceList(param){
    return this.httpClientService.get(AppUrl.helpNResource, param);
  }
  downloadHelpAndResourceList(param){
    return this.httpClientService.getFiles(AppUrl.helpNResource, param);
  }

    /**
   * Add product to cart and on its success , check for following conditions
   * Firstly check for on demand graphics, if available then capture its information and on its success 
   * check for associate ordering else directly check for associate ordering
   */
  addToCart(data){
    this.common.addToCart(data, false, false, (value) => {
      if (data.isTextGraphic || data.isUploadGraphic) {
        this.dialog.open(DemandGraphicsComponent, {
          data: {
            item: data
          }
        }) .afterClosed().subscribe(result => {
          if (result) {
            let obj = this.common.placeOrderObj.orderDetails;
            let index = obj.findIndex(x => x.id == data.id);
            if(index > -1){
              if(result.isType == "text"){
                obj[index].onDemandTextGraphic = result.description;  //remove extra info because in review order both fields appear which is incorrect
                obj[index].fileName = ""; 
                obj[index].filePath = ""; 
              }else{
                obj[index].fileName = result.fileName; 
                obj[index].filePath = result.filePath; 
                obj[index].onDemandTextGraphic = "";
              }
              this.common.saveCartJson();
            }
            this.getAssociateOrdering(value,data);
          }
        });
      }else{
        this.getAssociateOrdering(value,data);
      }
    });
  }

  //open the associate ordering popup which shows products steps and associated products
  getAssociateOrdering(value,data){
    if (value && value.length > 0) {
      this.dialog.open(AssociatedOrderingComponent, {
        data: {
          steps: value,
          item: data
        }
      });
    }
  }

  saveCard(param){
    return this.httpClientService.post(AppUrl.saveCreditCard, param);
  }

  getUserCreditCards(param) {
    return this.httpClientService.get(AppUrl.getUserCreditCards,param);
  }

  getCreditCardInfo(param) {
    return this.httpClientService.get(AppUrl.getCreditCardInfo, param);
  }

  deleteCard(param) {
    return this.httpClientService.delete(AppUrl.deleteCardInfo, param);
  }
}

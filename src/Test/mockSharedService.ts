import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

@Injectable()
export class mockSharedService {

  mapObj : any;
  constructor() { }

  private subject = new Subject<any>();
  onError(param: any): Observable<any> {
    return of(true);
  }

  onSuccess(response: any, message?: string, fn?) {
    if (fn) {
      return fn(true); 
    }
    
  }
  openToast(param: any) {
    
  }
  openDialog(code: string, textContent: string, fn?){
    if (fn) {
      return fn(true);
    }
  }
  confirmBox(textContent: string, fn?){
    
      return fn(true);
    
  }

  otherConfirmBox(textContent: string, code: string, fn?) {
    return fn(true);
  }

  getMessage(): Observable<any> {
    //return this.subject;
    return of(true);
  }
  sendMessage(object: any) {
    this.subject.next(object);
  }
  getSequence(listingEnumType, clientId, fn) {
    let res = [
      {"id":2105,"sequence":1},
    {"id":66,"sequence":226},
    {"id":74,"sequence":227},
    {"id":210,"sequence":228}
  ]
    return fn(res);
  }

  //create a Map object for sequence of list in Product/Inventory/Order
  createSequenceMap(data) {
    return of(true);
  }

  //return the value of map on basis of key
  //@Param: key - it comes in string 
  retrieveSequenceMap(key) {
    return of(true);
  }
}
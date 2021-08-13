import { of, Observable } from "rxjs";

export class MockDamageProductService {
    getDamageProducts(param:any):Observable<any>{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 152,
              "productId": "APPLOO9",
              "productName": "I-Phone9",
              "categories": "iPhone, Testing",
              "orderNumber": "SL_00000124",
              "damageQuantity": 2,
              "status": "ACTIVE",
              "receiveDate": "2019-01-29",
              "orderQuantity": 2,
              "receiveQuantity": 0,
              "fixedQuantity": 0,
              "trashQuantity": 0,
              "report": "",
              "damageResouces": [],
              "paginationInfo": {
                "pageSize": 50,
                "totalPages": 4,
                "totalRecords": 179,
                "curPage": 1
              
              }
            }
          })
    }
    updateDamageProductDetail(param:any){
      return of(true);
    }
    deleteDamageResource(param:any){
      return of(true);
    }
    uploadDamageResource(param:any){
      return of({"responseCode":"S0001","responseDescription":"Success","response":{"id":15}});
    }
    getFiles(param :any): Observable<any> {
      return of({body:{body: Blob,
        size: 8483,
        type: "application/jsonn"}}) ;
    }
    // getFiles(param :any): Observable<any> {
    //   return of("Download 'gallery1.png'");
    // }
}
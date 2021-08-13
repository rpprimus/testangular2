import { Observable, of, throwError } from "rxjs";
import { AngularWaitBarrier } from "blocking-proxy/built/lib/angular_wait_barrier";

export class mockWarehouseService{
    getWarehouseList(): Observable<any>{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": [
              {
                "id": 63,
                "isEdit": null,
                "checked": false,
                "name": "LA Warehouse"
              },
              {
                "id": 72,
                "isEdit": null,
                "checked": false,
                "name": "PHL Warehouse"
              },
              {
                "id": 73,
                "isEdit": null,
                "checked": false,
                "name": "LVA Warehouse"
              },
              {
                "id": 74,
                "isEdit": null,
                "checked": false,
                "name": "ATL Warehouse"
              },
              {
                "id": 75,
                "isEdit": null,
                "checked": false,
                "name": "UK Warehouse"
              },
              {
                "id": 76,
                "isEdit": null,
                "checked": false,
                "name": "Canada Warehouse"
              },
              {
                "id": 77,
                "isEdit": null,
                "checked": false,
                "name": "TestWarehouse_009!@#$^%$^%&^*^"
              },
              {
                "id": 78,
                "isEdit": null,
                "checked": false,
                "name": "Testunfg"
              },
              {
                "id": 79,
                "isEdit": null,
                "checked": false,
                "name": "1234"
              },
              {
                "id": 80,
                "isEdit": null,
                "checked": false,
                "name": "Test123"
              }
            ]
          });
    }

    saveWarehouse(type): Observable<any>{
        if (JSON.stringify(type) == JSON.stringify({wareHouseName: "Amazonuat", pathVariable: 1})) {
            console.log("error");
            return throwError(new Error('Fake error'));
          }
        else{
            return of(true);
        }  
    }
}
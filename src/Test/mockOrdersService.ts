import { Observable, of, throwError } from "rxjs";

export class mockOrdersService{
    cancelOrder(param):Observable<any>{
        if(JSON.stringify(param)==JSON.stringify({pathVariable: 380})){
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 380
            }
          });
        }
        else{
            return throwError(new Error('Fake error'));
        }
    }

    getOrderList(param):Observable<any>{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "results": [
                {
                  "id": 380,
                  "orderNumber": "SL_000380",
                  "orderDate": "02-04-2020",
                  "arrivalDate": "02-11-2020",
                  "eventName": "Test4",
                  "requestedBy": "Gagan11",
                  "status": "Placed",
                  "statusCode": "PLACED",
                  "orderStatusId": 37
                },
                {
                  "id": 379,
                  "orderNumber": "SL_000379",
                  "orderDate": "01-28-2020",
                  "arrivalDate": "01-31-2020",
                  "eventName": "Test12123",
                  "requestedBy": "Gagan11",
                  "status": "Processing",
                  "statusCode": "PROCESSING",
                  "orderStatusId": 39
                },
                {
                  "id": 378,
                  "orderNumber": "SL_000378",
                  "orderDate": "01-28-2020",
                  "arrivalDate": "01-31-2020",
                  "eventName": "Test12123",
                  "requestedBy": "Gagan11",
                  "status": "Canceled",
                  "statusCode": "CANCELED",
                  "orderStatusId": 44
                },
                {
                  "id": 377,
                  "orderNumber": "SL_000377",
                  "orderDate": "01-28-2020",
                  "arrivalDate": "01-31-2020",
                  "eventName": "Test12123",
                  "requestedBy": "Gagan11",
                  "status": "Canceled",
                  "statusCode": "CANCELED",
                  "orderStatusId": 44
                },
                {
                  "id": 376,
                  "orderNumber": "SL_000376",
                  "orderDate": "01-28-2020",
                  "arrivalDate": "01-29-2020",
                  "eventName": "Test4",
                  "requestedBy": "Gagan11",
                  "status": "Ready To Ship",
                  "statusCode": "READY_TO_SHIP",
                  "orderStatusId": 40
                },
                {
                  "id": 374,
                  "orderNumber": "SL_000374",
                  "orderDate": "01-28-2020",
                  "arrivalDate": "01-29-2020",
                  "eventName": "Test4",
                  "requestedBy": "Gagan11",
                  "status": "Canceled",
                  "statusCode": "CANCELED",
                  "orderStatusId": 44
                },
                {
                  "id": 373,
                  "orderNumber": "SL_000373",
                  "orderDate": "01-28-2020",
                  "arrivalDate": "01-29-2020",
                  "eventName": "Test4",
                  "requestedBy": "Gagan11",
                  "status": "Canceled",
                  "statusCode": "CANCELED",
                  "orderStatusId": 44
                },
                {
                  "id": 372,
                  "orderNumber": "SL_000372",
                  "orderDate": "01-28-2020",
                  "arrivalDate": "01-21-2020",
                  "eventName": "Test4",
                  "requestedBy": "Gagan11",
                  "status": "Canceled",
                  "statusCode": "CANCELED",
                  "orderStatusId": 44
                },
                {
                  "id": 371,
                  "orderNumber": "SL_000371",
                  "orderDate": "01-28-2020",
                  "arrivalDate": "01-22-2020",
                  "eventName": "Test4",
                  "requestedBy": "Gagan11",
                  "status": "Canceled",
                  "statusCode": "CANCELED",
                  "orderStatusId": 44
                },
                {
                  "id": 370,
                  "orderNumber": "SL_000370",
                  "orderDate": "01-27-2020",
                  "arrivalDate": "01-15-2020",
                  "eventName": "Test5",
                  "requestedBy": "Gagan11",
                  "status": "Canceled",
                  "statusCode": "CANCELED",
                  "orderStatusId": 44
                }
              ],
              "paginationInfo": {
                "pageSize": 10,
                "totalPages": 16,
                "totalRecords": 160,
                "curPage": 1
              }
            }
          });
    }

    getStatus():Observable<any>{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": [
              {
                "id": 37,
                "name": "Placed",
                "checked": false
              },
              {
                "id": 38,
                "name": "Confirmed",
                "checked": false
              },
              {
                "id": 39,
                "name": "Processing",
                "checked": false
              },
              {
                "id": 40,
                "name": "Ready To Ship",
                "checked": false
              },
              {
                "id": 41,
                "name": "Shipped",
                "checked": false
              },
              {
                "id": 42,
                "name": "Received",
                "checked": false
              },
              {
                "id": 43,
                "name": "Complete",
                "checked": false
              },
              {
                "id": 44,
                "name": "Canceled",
                "checked": false
              }
            ]
          });
    }
}
import { Observable, of } from "rxjs";

export class MockDashboardService {

getDashboard(param?):Observable<any>{
   return of({
    "responseCode": "S0001",
    "responseDescription": "Success",
    "response": {
      "placeOrders": [
        {
          "clientId": 37,
          "clientDomainName": "amazonuat",
          "orderId": 269,
          "orderNumber": "SL_000269",
          "orderDate": "11/27/2019",
          "clientName": "Amazonuat"
        },
        {
          "clientId": 37,
          "clientDomainName": "amazonuat",
          "orderId": 268,
          "orderNumber": "SL_000268",
          "orderDate": "11/27/2019",
          "clientName": "Amazonuat"
        },
        {
          "clientId": 37,
          "clientDomainName": "amazonuat",
          "orderId": 267,
          "orderNumber": "SL_000267",
          "orderDate": "11/27/2019",
          "clientName": "Amazonuat"
        },
        {
          "clientId": 37,
          "clientDomainName": "amazonuat",
          "orderId": 265,
          "orderNumber": "SL_000265",
          "orderDate": "11/27/2019",
          "clientName": "Amazonuat"
        },
        {
          "clientId": 37,
          "clientDomainName": "amazonuat",
          "orderId": 263,
          "orderNumber": "SL_000263",
          "orderDate": "11/26/2019",
          "clientName": "Amazonuat"
        }
      ],
      "ordersNotReturn": [
        {
          "clientId": 37,
          "clientDomainName": "amazonuat",
          "orderId": 257,
          "orderNumber": "SL_000257",
          "orderDate": "11/25/2019",
          "clientName": "Amazonuat"
        },
        {
          "clientId": 37,
          "clientDomainName": "amazonuat",
          "orderId": 226,
          "orderNumber": "SL_000226",
          "orderDate": "09/26/2019",
          "clientName": "Amazonuat"
        },
        {
          "clientId": 37,
          "clientDomainName": "amazonuat",
          "orderId": 201,
          "orderNumber": "SL_000201",
          "orderDate": "07/12/2019",
          "clientName": "Amazonuat"
        },
        {
          "clientId": 37,
          "clientDomainName": "amazonuat",
          "orderId": 199,
          "orderNumber": "SL_000199",
          "orderDate": "06/29/2019",
          "clientName": "Amazonuat"
        },
        {
          "clientId": 37,
          "clientDomainName": "amazonuat",
          "orderId": 185,
          "orderNumber": "SL_000185",
          "orderDate": "06/27/2019",
          "clientName": "Amazonuat"
        }
      ],
      "upcomingShipment": [],
      "damageItemCount": 2
    }
  })
  }
  getClients():Observable<any>{
  return of({
        "responseCode": "S0001",
        "responseDescription": "Success",
        "response": {
          "results": [
            {
              "id": 39,
              "name": "@",
              "domainName": "aruba",
              "isStoreCreated": true
            },
            {
              "id": 48,
              "name": "AFL",
              "domainName": "afl",
              "isStoreCreated": false
            },
            {
              "id": 37,
              "name": "Amazonuat",
              "domainName": "amazonuat",
              "isStoreCreated": true
            },
            {
              "id": 38,
              "name": "Bausch+Lomb",
              "domainName": "bl",
              "isStoreCreated": true
            },
            {
              "id": 31,
              "name": "Boston Scientific",
              "domainName": "boston",
              "isStoreCreated": true
            },
            {
              "id": 43,
              "name": "Compunneluat",
              "domainName": "compunnel",
              "isStoreCreated": true
            },
            {
              "id": 65,
              "name": "Development Testing",
              "domainName": "developmenttesting",
              "isStoreCreated": false
            },
            {
              "id": 42,
              "name": "Gmail gmail",
              "domainName": "gmail",
              "isStoreCreated": true
            },
            {
              "id": 67,
              "name": "Google1",
              "domainName": "google1",
              "isStoreCreated": false
            },
            {
              "id": 46,
              "name": "Incyte",
              "domainName": "incyte",
              "isStoreCreated": true
            },
            {
              "id": 40,
              "name": "Ingevity",
              "domainName": "ingevity",
              "isStoreCreated": true
            },
            {
              "id": 32,
              "name": "Momentum",
              "domainName": "momentum",
              "isStoreCreated": true
            },
            {
              "id": 45,
              "name": "Mylan",
              "domainName": "mylan",
              "isStoreCreated": true
            },
            {
              "id": 63,
              "name": "Myntra",
              "domainName": "myntra",
              "isStoreCreated": false
            },
            {
              "id": 62,
              "name": "Newtst",
              "domainName": "newtst",
              "isStoreCreated": false
            },
            {
              "id": 30,
              "name": "Pentax",
              "domainName": "pentax",
              "isStoreCreated": true
            },
            {
              "id": 60,
              "name": "Sakshi Test",
              "domainName": "sakshitest",
              "isStoreCreated": false
            },
            {
              "id": 64,
              "name": "Sakshitest2",
              "domainName": "sakshitest2",
              "isStoreCreated": false
            },
            {
              "id": 33,
              "name": "Salix",
              "domainName": "salix",
              "isStoreCreated": true
            },
            {
              "id": 54,
              "name": "Sei",
              "domainName": "sei",
              "isStoreCreated": true
            },
            {
              "id": 47,
              "name": "Sparks",
              "domainName": "sparks",
              "isStoreCreated": true
            },
            {
              "id": 55,
              "name": "Sparksswag",
              "domainName": "sparksswag",
              "isStoreCreated": true
            },
            {
              "id": 49,
              "name": "Storeone",
              "domainName": "storeone",
              "isStoreCreated": false
            },
            {
              "id": 61,
              "name": "Suez",
              "domainName": "suez",
              "isStoreCreated": false
            },
            {
              "id": 59,
              "name": "Suvansh Test",
              "domainName": "suvanshtest",
              "isStoreCreated": false
            },
            {
              "id": 56,
              "name": "Test",
              "domainName": "test",
              "isStoreCreated": true
            },
            {
              "id": 58,
              "name": "Test",
              "domainName": "test1",
              "isStoreCreated": false
            },
            {
              "id": 1,
              "name": "Test Client",
              "domainName": "testdomain",
              "isStoreCreated": true
            },
            {
              "id": 53,
              "name": "Test Client 011",
              "domainName": "testclient011",
              "isStoreCreated": false
            },
            {
              "id": 52,
              "name": "Test User 010",
              "domainName": "testclient010",
              "isStoreCreated": false
            },
            {
              "id": 57,
              "name": "TestingData",
              "domainName": "testingdata",
              "isStoreCreated": false
            },
            {
              "id": 50,
              "name": "Test_001",
              "domainName": "test001",
              "isStoreCreated": true
            },
            {
              "id": 51,
              "name": "Test_009",
              "domainName": "test009",
              "isStoreCreated": true
            },
            {
              "id": 34,
              "name": "Wirtgen Group",
              "domainName": "wirtgen",
              "isStoreCreated": true
            }
          ]
        }
      }
   );
  }
}
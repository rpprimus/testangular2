import { of, Observable } from "rxjs";

export class MockUserService {


    getUserList(param) {
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "results": [
                {
                  "name": "Amanda Lovelady",
                  "email": "alovelady@compunnel.in",
                  "status": "Active",
                  "role": "Account Manager, Credit Card Admin",
                  "id": 391
                },
                {
                  "name": "Theresa Eggert",
                  "email": "teggert@compunnel.in",
                  "status": "Active",
                  "role": "Account Manager",
                  "id": 376
                }
              ],
              "paginationInfo": {
                "pageSize": 50,
                "totalPages": 1,
                "totalRecords": 45,
                "curPage": 1
              }
            }
          })
      }
      getRoles(param) {
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "results": [
                {
                  "id": 1,
                  "name": "Admin",
                  "checked": false
                },
                {
                  "id": 2,
                  "name": "Account Manager",
                  "checked": false
                },
                {
                  "id": 3,
                  "name": "Workshop Team",
                  "checked": false
                },
                {
                  "id": 7,
                  "name": "Credit Card Admin",
                  "checked": false
                }
              ]
            }
          }
        )
      }
      changeStatus(param) {
        return of ({
          "responseCode": "S0001",
          "responseDescription": "User deactivated successfully!",
          "response": {
            "id": 114954
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
                    "id": 65,
                    "name": "Development Testing",
                    "domainName": "developmenttesting",
                    "isStoreCreated": false
                  },
                  {
                    "id": 67,
                    "name": "Google1",
                    "domainName": "google1",
                    "isStoreCreated": false
                  },
                  {
                    "id": 64,
                    "name": "Sakshitest2",
                    "domainName": "sakshitest2",
                    "isStoreCreated": false
                  },
                ]
              }
            }
         );
        }
        getUserById() {
          return of( {
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": {
              "id": 340,
              "name": "Amanda Marchino",
              "email": "amarchino@compunnel.in",
              "status": "active",
              "phoneNumber": "666-666-6666",
              "isSelectAll": false
            }
          })
         
        }
        getClientsById() {
          return of(
            {
              "responseCode": "S0001",
              "responseDescription": "Success",
              "response": {
                "results": [
                  {
                    "id": 64,
                    "name": "Sakshitest2",
                    "checked": false
                  },
                  {
                    "id": 65,
                    "name": "Development Testing",
                    "checked": false
                  },
                  {
                    "id": 1,
                    "name": "Test Client",
                    "checked": false
                  },
                  {
                    "id": 67,
                    "name": "Google1",
                    "checked": false
                  },
                ]
              }
            }
          )
        }
        submitUser(param: any, type: string) {
          return of(
            {
              "responseCode": "S0001",
              "responseDescription": "Success",
              "response": {
                "id": 114952,
                "name": "Kanishka",
                "email": "kanishka.wadhwa@compunnel.in",
                "status": "active",
                "phoneNumber": "989-158-6222",
                "isSelectAll": true
              }
            }
          )
        }

    
    
}
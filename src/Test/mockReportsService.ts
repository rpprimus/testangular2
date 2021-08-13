import { Observable, of } from "rxjs";

export class mockReportsService{
    getReports(param:any):Observable<any>{
        if(JSON.stringify(param)==JSON.stringify([])){
        return of({body:{body: Blob,
            size: 8483,
            type: ""}});
        }
        else{
        return of({body:{body: Blob,
            size: 8483,
            type: "application/json"}});
        }
    }

    getProducts(param:any):Observable<any>{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": [
              {
                "id": 1915,
                "name": "CAN-085 ~ \"Thank you\" Cards",
                "checked": false
              },
              {
                "id": 96,
                "name": "B-001 ~ 10 x 10 Booth",
                "checked": false
              },
              {
                "id": 1947,
                "name": "CAN-139 ~ 7 Logo Decal",
                "checked": false
              },
              {
                "id": 1919,
                "name": "CAN-102 ~ 8x6 beveled jade glass crescent plaque - \"Discover Global Network\"",
                "checked": false
              },
              {
                "id": 1968,
                "name": "CAN-160 ~ 9 Logo Decal",
                "checked": false
              },
              {
                "id": 142,
                "name": "APL00031 ~ APL00031",
                "checked": false
              },
              {
                "id": 145,
                "name": "APL00034 ~ APL00034",
                "checked": false
              },
              {
                "id": 146,
                "name": "APL00035 ~ APL00035",
                "checked": false
              },
              {
                "id": 149,
                "name": "APL00040 ~ APL00040",
                "checked": false
              },
              {
                "id": 150,
                "name": "APL00041 ~ APL00041",
                "checked": false
              },
              {
                "id": 137,
                "name": "APL30 ~ APL30",
                "checked": false
              },
              {
                "id": 138,
                "name": "APL31 ~ APL31",
                "checked": false
              },
              {
                "id": 124,
                "name": "APLO20 ~ APLO20",
                "checked": false
              },
              {
                "id": 125,
                "name": "APLO21 ~ APLO21",
                "checked": false
              },
              {
                "id": 126,
                "name": "APLO22 ~ APLO22",
                "checked": false
              },
              {
                "id": 127,
                "name": "APLO23 ~ APLO23",
                "checked": false
              },
              {
                "id": 128,
                "name": "APLO25 ~ APLO25",
                "checked": false
              },
              {
                "id": 152,
                "name": "APL000411 ~ APLO25",
                "checked": false
              },
              {
                "id": 153,
                "name": "APLO2511 ~ APLO25",
                "checked": false
              },
              {
                "id": 154,
                "name": "APLO2512 ~ APLO25",
                "checked": false
              },
              {
                "id": 161,
                "name": "APLO25555 ~ APLO25",
                "checked": false
              },
              {
                "id": 164,
                "name": "APLO232323 ~ APLO25",
                "checked": false
              },
              {
                "id": 188,
                "name": "PP1 ~ APLO25",
                "checked": false
              },
              {
                "id": 192,
                "name": "PP4 ~ APLO25",
                "checked": false
              },
              {
                "id": 129,
                "name": "APLO26 ~ APLO26",
                "checked": false
              },
              {
                "id": 130,
                "name": "APLO27 ~ APLO27",
                "checked": false
              },
              {
                "id": 131,
                "name": "APLO28 ~ APLO28",
                "checked": false
              },
              {
                "id": 132,
                "name": "APLO29 ~ APLO29",
                "checked": false
              },
              {
                "id": 133,
                "name": "APLO30 ~ APLO30",
                "checked": false
              },
              {
                "id": 110,
                "name": "APLOO1 ~ APLOO1",
                "checked": false
              },
              {
                "id": 111,
                "name": "APLOO2 ~ APLOO2",
                "checked": false
              },
              {
                "id": 112,
                "name": "APLOO5 ~ APLOO5",
                "checked": false
              },
              {
                "id": 114,
                "name": "APLOO511 ~ APLOO511",
                "checked": false
              },
              {
                "id": 113,
                "name": "APLOO6 ~ APLOO6",
                "checked": false
              },
              {
                "id": 115,
                "name": "APLOO611 ~ APLOO611",
                "checked": false
              },
              {
                "id": 116,
                "name": "APLOO612 ~ APLOO612",
                "checked": false
              },
              {
                "id": 117,
                "name": "APLOO613 ~ APLOO613",
                "checked": false
              },
              {
                "id": 118,
                "name": "APLOO614 ~ APLOO614",
                "checked": false
              },
              {
                "id": 119,
                "name": "APLOO615 ~ APLOO615",
                "checked": false
              },
              {
                "id": 120,
                "name": "APLOO616 ~ APLOO616",
                "checked": false
              },
              {
                "id": 121,
                "name": "APLOO617 ~ APLOO617",
                "checked": false
              },
              {
                "id": 122,
                "name": "APLOO618 ~ APLOO618",
                "checked": false
              },
              {
                "id": 123,
                "name": "APLOO619 ~ APLOO619",
                "checked": false
              },
              {
                "id": 66,
                "name": "XR_Iphone ~ Apple iPhone XR (Black, 64 GB)",
                "checked": false
              },
            ]
          });
    }

    getCategories(param:any):Observable<any>{
        return of({
            "responseCode": "S0001",
            "responseDescription": "Success",
            "response": [
              {
                "id": 635,
                "name": "AB",
                "checked": false
              },
              {
                "id": 630,
                "name": "AB",
                "checked": false
              },
              {
                "id": 643,
                "name": "ABc",
                "checked": false
              },
              {
                "id": 631,
                "name": "AC",
                "checked": false
              },
              {
                "id": 632,
                "name": "AD",
                "checked": false
              },
              {
                "id": 633,
                "name": "AE",
                "checked": false
              },
              {
                "id": 636,
                "name": "AF",
                "checked": false
              },
              {
                "id": 637,
                "name": "AF",
                "checked": false
              },
              {
                "id": 644,
                "name": "AFc",
                "checked": false
              },
              {
                "id": 821,
                "name": "Banner Stands",
                "checked": false
              },
              {
                "id": 128,
                "name": "Banners",
                "checked": false
              },
              {
                "id": 645,
                "name": "Birla 2nd Level",
                "checked": false
              },
              {
                "id": 144,
                "name": "Birlasoft",
                "checked": false
              },
              {
                "id": 154,
                "name": "Birlasoft",
                "checked": false
              },
              {
                "id": 146,
                "name": "Birlasoft 2nd Child",
                "checked": false
              },
              {
                "id": 147,
                "name": "Birlasoft 3rd Child",
                "checked": false
              },
              {
                "id": 148,
                "name": "Birlasoft 4rth Child",
                "checked": false
              },
              {
                "id": 145,
                "name": "Birlasoft child",
                "checked": false
              },
              {
                "id": 96,
                "name": "Car Spare Part",
                "checked": false
              },
              {
                "id": 669,
                "name": "Development branch",
                "checked": false
              },
              {
                "id": 818,
                "name": "Drapes",
                "checked": false
              },
              {
                "id": 90,
                "name": "Electronics",
                "checked": false
              },
              {
                "id": 823,
                "name": "Event Items",
                "checked": false
              }]})
    }
}
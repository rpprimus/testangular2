import { Observable, of } from "rxjs";

export class mockLoginService{
    authenticateUser(param):Observable<any>{
        if(JSON.stringify(param)==JSON.stringify({userEmail: "abc@yopmail.com"})){
        return of({responseCode:"S0001",token:""});
        }
        else{
            return of({responseCode:"E0001",token:""});
        }
    }
}
import { TestBed, async } from "@angular/core/testing";
import { LoaderInterceptor, LoaderService } from "./loader-interceptor";
import { Util } from "../shared/services/util";
import { mockUtil } from "../../Test/mockUtil";
import { AuthService } from "../shared/services/auth.service";
import { mockAuthService } from "../../Test/mockAuthService.service";

describe('LoaderInterceptor',()=>{
    beforeEach(async(() => {
        TestBed.configureTestingModule({
          providers:[LoaderInterceptor,LoaderService,{provide:Util,useClass:mockUtil},{provide:AuthService,useClass:mockAuthService}]
        })
        .compileComponents();
      }));

      it('should be created', () => {
        const loader: LoaderInterceptor = TestBed.get(LoaderInterceptor);
        expect(loader).toBeTruthy();
      });

      it('should call removeRequest() method', () => {
        const loader: LoaderInterceptor = TestBed.get(LoaderInterceptor);
        let req = {
            body: null,
            headers: null,
            reportProgress: true,
            withCredentials: true,
            responseType: null,
            method: "",
            params: null,
            urlWithParams: "",
            url:"",
            serializeBody(): null{return},
            detectContentTypeHeader():null{return},
            clone(): null {return}
        };
        loader.removeRequest(req);
        expect(loader.removeRequest).toBeTruthy();
      });

      it('should call intercept() method if block', () => {
        const loader: LoaderInterceptor = TestBed.get(LoaderInterceptor);
        let req = {
            body: null,
            headers: null,
            reportProgress: true,
            withCredentials: true,
            responseType: null,
            method: "",
            params: null,
            urlWithParams: "",
            url:"",
            serializeBody(): null{return},
            detectContentTypeHeader():null{return},
            clone(): null {return}
        },next=null;;
        loader.intercept(req,next);
        expect(loader.intercept).toBeTruthy();
      });

      it('should call intercept() method else block', () => {
        const loader: LoaderInterceptor = TestBed.get(LoaderInterceptor);
        loader.util.hideLoader=true;
        let req = {
            body: null,
            headers: null,
            reportProgress: true,
            withCredentials: true,
            responseType: null,
            method: "",
            params: null,
            urlWithParams: "",
            url:"",
            serializeBody(): null{return},
            detectContentTypeHeader():null{return},
            clone(): null {return}
        },next=null;;
        loader.intercept(req,next);
        expect(loader.intercept).toBeTruthy();
      });

      it('should call checkForInvalidAccess() method if block', () => {
        const loader: LoaderInterceptor = TestBed.get(LoaderInterceptor);
        let event = {
            body:{errorCode:"E1007"}
        };
        loader.checkForInvalidAccess(event);
        expect(loader.checkForInvalidAccess).toBeTruthy();
      });

      it('should call checkForInvalidAccess() method else block', () => {
        const loader: LoaderInterceptor = TestBed.get(LoaderInterceptor);
        let event = {
            body:{errorCode:"E1001"}
        };
        loader.checkForInvalidAccess(event);
        expect(loader.checkForInvalidAccess).toBeTruthy();
      });
});
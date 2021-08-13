import {BehaviorSubject} from 'rxjs';

export class mockActivatedRoute{

    private _testparms : {};
    private paramsSubject = new BehaviorSubject(this.testParams);

    get testParams(){
        return this._testparms;
    }

    set testParams(newParams : any){
        this._testparms = newParams;
        this.paramsSubject.next(newParams);
    }
}
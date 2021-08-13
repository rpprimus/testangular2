import { TrimValidator } from "./trim.validator";
import { FormControl } from "@angular/forms";

describe('TrimValidator',()=>{
    let valFn = TrimValidator();
    let control = new FormControl('input');

    it('should create instance',()=>{
        control.setValue('   test   ');
        expect(valFn(control)).toBeNull();
    })
}) 
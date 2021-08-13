import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CurrencyDirective } from "./currency.directive";
import { By } from "@angular/platform-browser";
import { NgControl } from "@angular/forms";

@Component({
    template: `<input type="text" currency>`
})
class TestCurrencyDirectiveComponent {
}

describe('Directive: CurrencyDirective', () => {

    let component: TestCurrencyDirectiveComponent;
    let fixture: ComponentFixture<TestCurrencyDirectiveComponent>;
    let inputEl: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestCurrencyDirectiveComponent, CurrencyDirective],
            providers:[NgControl,CurrencyDirective]
        });
        fixture = TestBed.createComponent(TestCurrencyDirectiveComponent);
        component = fixture.componentInstance;
        inputEl = fixture.debugElement.query(By.css('input'));
    });

    it('should be used', () => {
        expect(inputEl).not.toBeNull();
    });

    it('should call onInputChange() method', () => {
        let currency:CurrencyDirective = TestBed.get(CurrencyDirective);
        currency.model.valueAccessor={writeValue():null{return},registerOnChange():null{return}, registerOnTouched():null{return}}
        let event={target:{value:'1000000'}}
        currency.onInputChange(event);
        expect(currency.onInputChange).toBeTruthy();
    });

});


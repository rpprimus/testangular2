import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FocusDirective } from "./focus.directive";

@Component({
    template: `<input type="text" appFocus>`
})
class TestFocusDirectiveComponent {
}

describe('Directive: CurrencyDirective', () => {

    let component: TestFocusDirectiveComponent;
    let fixture: ComponentFixture<TestFocusDirectiveComponent>;
    let inputEl: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestFocusDirectiveComponent, FocusDirective]
        });
        fixture = TestBed.createComponent(TestFocusDirectiveComponent);
        component = fixture.componentInstance;
        inputEl = fixture.debugElement.query(By.css('input'));
    });

    it('should be used', () => {
        expect(inputEl).not.toBeNull();
    });
});


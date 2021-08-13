import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TrimDirective } from "./trim.directive";

@Component({
    template: `<input type="text" trimDirective>`
})
class TestTrimDirectiveComponent {
}

describe('Directive: CurrencyDirective', () => {

    let component: TestTrimDirectiveComponent;
    let fixture: ComponentFixture<TestTrimDirectiveComponent>;
    let inputEl: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestTrimDirectiveComponent, TrimDirective]
        });
        fixture = TestBed.createComponent(TestTrimDirectiveComponent);
        component = fixture.componentInstance;
        inputEl = fixture.debugElement.query(By.css('input'));
    });

    it('should be used', () => {
        expect(inputEl).not.toBeNull();
    });
});

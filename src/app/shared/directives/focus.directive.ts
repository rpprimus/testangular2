import { NgZone, Directive, ElementRef, AfterContentInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appFocus]'
})

/**
 * this directive is created because autofocus losses its scope when component is reloaded or reinitialized,
 *  also when new input field is added
 */ 
export class FocusDirective implements AfterContentInit {
    constructor(private el: ElementRef, private zone: NgZone, private renderer: Renderer2) {}

    ngAfterContentInit() {
        this.zone.runOutsideAngular(() => setTimeout(() => {
            this.renderer.selectRootElement(this.el.nativeElement).focus();
        }, 1000));
    }
}
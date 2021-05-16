import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appOnHover]'
})
export class OnHoverDirective {

    constructor(private renderer: Renderer2, private element: ElementRef) {
    }

    @HostListener('mouseenter') onMouseEnter(): void {
        this.renderer.addClass(this.element.nativeElement, 'mat-elevation-z10');
    }

    @HostListener('mouseleave') onMouseLeave(): void {
        this.renderer.removeClass(this.element.nativeElement, 'mat-elevation-z10');
    }
}

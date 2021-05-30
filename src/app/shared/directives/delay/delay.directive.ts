import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appDelay]',
})
export class DelayDirective {

    constructor(private template: TemplateRef<any>, private container: ViewContainerRef) {
    }

    @Input() set appDelay(delayTime: number) {
        this.container.clear();
        setTimeout(() => {
            this.container.createEmbeddedView(this.template);
        }, delayTime);
    }
}

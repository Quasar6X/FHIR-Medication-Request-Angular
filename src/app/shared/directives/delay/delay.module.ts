import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelayDirective } from './delay.directive';


@NgModule({
    declarations: [
        DelayDirective
    ],
    imports: [
        CommonModule,
    ],
    exports: [DelayDirective]
})
export class DelayModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MedicationRequestFormModule } from '../../../shared/components/medication-request-form/medication-request-form.module';


@NgModule({
    declarations: [
        EditComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MedicationRequestFormModule
    ],
    exports: [EditComponent]
})
export class EditModule {
}

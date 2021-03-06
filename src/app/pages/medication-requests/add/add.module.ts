import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MedicationRequestFormModule } from '../../../shared/components/medication-request-form/medication-request-form.module';


@NgModule({
    declarations: [
        AddComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatCardModule,
        MedicationRequestFormModule
    ],
    exports: [AddComponent]
})
export class AddModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicationRequestFormComponent } from './medication-request-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatButtonModule } from '@angular/material/button';
import { OnHoverModule } from '../../directives/on-hover/on-hover.module';



@NgModule({
    declarations: [
        MedicationRequestFormComponent
    ],
    exports: [
        MedicationRequestFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatRadioModule,
        MatInputModule,
        MatDatepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        MatButtonModule,
        OnHoverModule
    ]
})
export class MedicationRequestFormModule { }

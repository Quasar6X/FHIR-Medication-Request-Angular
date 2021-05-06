import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicationRequest } from '../../../shared/model/medication-request.model';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent {

    constructor(public dialogRef: MatDialogRef<MedicationRequest>, @Inject(MAT_DIALOG_DATA) public data: MedicationRequest) {
    }

    accept(event: MedicationRequest | null): void {
        this.dialogRef.close(event);
    }
}

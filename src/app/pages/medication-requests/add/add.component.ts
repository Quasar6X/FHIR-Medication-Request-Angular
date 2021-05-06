import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MedicationRequest } from '../../../shared/model/medication-request.model';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent {

    constructor(public dialogRef: MatDialogRef<AddComponent>) {
    }

    accept(event: MedicationRequest | null): void {
        this.dialogRef.close(event);
    }
}

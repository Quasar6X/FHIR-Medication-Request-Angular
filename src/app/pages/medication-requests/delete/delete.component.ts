import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

    constructor(public dialogRef: MatDialogRef<boolean>, @Inject(MAT_DIALOG_DATA) public data: { uid: string }) {
    }
}

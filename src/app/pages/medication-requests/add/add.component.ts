import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormGroup } from '@angular/forms';
import { getMedicationRequestForm } from '../../../shared/forms/medication-request.form';
import { getUserForm } from '../../../shared/forms/user.form';
import { FbAuth } from '../../../services/fb-auth.service';
import { getCategoryForm } from '../../../shared/forms/category.form';
import { getNoteForm } from '../../../shared/forms/note.form';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

    form: FormGroup | null = null;
    categoryLength = 0;

    constructor(public dialogRef: MatDialogRef<AddComponent>, private authService: FbAuth) {
    }

    ngOnInit(): void {
        this.form = getMedicationRequestForm();
    }

    get identifierFormArray(): FormArray {
        return this.form?.get('identifier') as FormArray;
    }

    get categoryFormArray(): FormArray {
        return this.form?.get('category') as FormArray;
    }

    get noteFormArray(): FormArray {
        return this.form?.get('note') as FormArray;
    }

    addIdentifier(): void {
        this.identifierFormArray.push(getUserForm());
    }

    addCategory(): void {
        ++this.categoryLength;
        this.categoryFormArray.push(getCategoryForm());
    }

    addNote(): void {
        this.noteFormArray.push(getNoteForm());
    }

    addCurrentUser(): void {
        const userForm = this.identifierFormArray.get('0');
        this.authService.auth.onAuthStateChanged((user) => {
            userForm.get('uid').get('value').setValue(user.uid);
            userForm.get('email').get('value').setValue(user.email);
            userForm.get('displayName').get('value').setValue(user.displayName);
            userForm.get('uid').disable();
            userForm.get('email').disable();
            userForm.get('displayName').disable();
        }).then();
    }

    removeIdentifier(index: number): void {
        this.identifierFormArray.removeAt(index);
    }

    removeCategory(index: number): void {
        --this.categoryLength;
        this.categoryFormArray.removeAt(index);
    }

    removeNote(index: number): void {
        this.noteFormArray.removeAt(index);
    }

    submit(): void {
    }
}

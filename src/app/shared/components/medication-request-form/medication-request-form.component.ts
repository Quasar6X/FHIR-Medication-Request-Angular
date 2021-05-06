import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MedicationRequest } from '../../model/medication-request.model';
import { FbAuth } from '../../../services/fb-auth.service';
import { FormArray, FormGroup } from '@angular/forms';
import { getMedicationRequestForm } from '../../forms/medication-request.form';
import { getUserForm } from '../../forms/user.form';
import { getCategoryForm } from '../../forms/category.form';
import { getNoteForm } from '../../forms/note.form';
import { getDosageInstructionForm } from '../../forms/dosage-instruction.form';

@Component({
    selector: 'app-medication-request-form',
    templateUrl: './medication-request-form.component.html',
    styleUrls: ['./medication-request-form.component.scss']
})
export class MedicationRequestFormComponent implements OnInit {

    @Input() medicationRequest: MedicationRequest | null = null;
    @Input() isEditForm = false;
    @Output() medicationRequestEvent = new EventEmitter<MedicationRequest | null>();

    form: FormGroup | null = null;
    categoryLength = 0;

    constructor(private authService: FbAuth) {
    }

    ngOnInit(): void {
        this.form = getMedicationRequestForm();
        this.form.get('id').disable();
        if (this.medicationRequest !== null && this.isEditForm) {
            this.form.get('id').setValue(this.medicationRequest.id);
            this.form.get('status').setValue(this.medicationRequest.status);
            this.form.get('statusReason').setValue(this.medicationRequest?.statusReason);
            this.form.get('intent').setValue(this.medicationRequest.intent);
            this.form.get('priority').setValue(this.medicationRequest?.priority);
            this.form.get('doNotPerform').setValue(this.medicationRequest?.doNotPerform);
            this.form.get('reported').setValue(this.medicationRequest?.reported);
            this.form.get('medication').setValue(this.medicationRequest.medication);
            this.form.get('subject').setValue(this.medicationRequest.subject);
            this.form.get('authoredOn').setValue(this.medicationRequest?.authoredOn.toDate());
            this.form.get('substitution').get('allowed').setValue(this.medicationRequest?.substitution.allowed);
            this.form.get('substitution').get('reason').setValue(this.medicationRequest?.substitution?.reason);
            this.medicationRequest?.identifier?.forEach(user => {
                const userFormRef = getUserForm();
                userFormRef.get('uid').get('value').setValue(user.uid.value);
                userFormRef.get('email').get('value').setValue(user.email.value);
                userFormRef.get('displayName').get('value').setValue(user.displayName.value);
                this.identifierFormArray.push(userFormRef);
            });
            this.medicationRequest?.category?.forEach(category => {
                const categoryFormRef = getCategoryForm();
                console.log(category.text);
                categoryFormRef.get('text').setValue(category.text);
                this.categoryFormArray.push(categoryFormRef);
            });
            this.medicationRequest?.dosageInstruction?.forEach(dosage => {
                const dosageFormRef = getDosageInstructionForm();
                dosageFormRef.get('text').setValue(dosage.text);
                this.dosageInstructionFormArray.push(dosageFormRef);
            });
            this.medicationRequest?.note?.forEach(note => {
                const noteFormRef = getNoteForm();
                noteFormRef.get('author').get('authorString').setValue(note?.author.authorString);
                noteFormRef.get('time').setValue(note?.time.toDate());
                noteFormRef.get('text').setValue(note.text);
                this.noteFormArray.push(noteFormRef);
            });
        }
        Object.keys(this.form.controls).forEach(key => {
            this.form.controls[key].markAsTouched();
        });
    }

    output(request: MedicationRequest | null): void {
        this.medicationRequestEvent.emit(request);
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

    get dosageInstructionFormArray(): FormArray {
        return this.form?.get('dosageInstruction') as FormArray;
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

    addDosageInstruction(): void {
        this.dosageInstructionFormArray.push(getDosageInstructionForm());
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

    removeDosageInstruction(index: number): void {
        this.dosageInstructionFormArray.removeAt(index);
    }
}

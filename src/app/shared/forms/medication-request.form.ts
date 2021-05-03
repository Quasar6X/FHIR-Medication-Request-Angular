import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { getIdentifierForm } from './identifier.form';

export function getMedicationForm(): FormGroup {
    return new FormGroup({
        id: new FormControl(), // id from firebase, required but will be set automatically
        identifier: new FormArray([
            getIdentifierForm('uid'),
            getIdentifierForm('email')
        ]), // required
        status: new FormControl('', Validators.required), // active | on-hold | cancelled | completed | entered-in-error | stopped | draft | unknown
        statusReason: new FormControl(), // reason for the above field
        intent: new FormControl('', Validators.required), // proposal | plan | order | original-order | reflex-order | filler-order | instance-order | option
        category: new FormArray([]), // getCategoryForm from category.form.ts
        priority: new FormControl(), // routine | urgent | asap | stat
        doNotPerform: new FormControl('', Validators.required), // radio button true/false
        reported: new FormControl(), // radio button true/false or NONE for not required
        medication: new FormControl('', Validators.required), // medication SNOMED CT code
        subject: new FormControl('', Validators.required), // name of the person receiving the medication
        authoredOn: new FormControl(), // date when the medication was issued
        note: new FormArray([]), // getNoteForm from note.form.ts
        dosageInstruction: new FormArray([]), // getDosageInstructionForm from dosage-instruction.form.ts
        substitution: new FormGroup({
            allowed: new FormControl('', Validators.required), // allow substitution or not
            reason: new FormControl() // reason for above decision
        })
    });
}

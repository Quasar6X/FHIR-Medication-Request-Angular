import { FormControl, FormGroup, Validators } from '@angular/forms';

export function getDosageInstructionForm(): FormGroup {
    return new FormGroup({
        text: new FormControl('', Validators.required) // dosage inforamtion
    });
}

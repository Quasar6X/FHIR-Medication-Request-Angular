import { FormControl, FormGroup, Validators } from '@angular/forms';

export function getIdentifierForm(typeText: string): FormGroup {
    return new FormGroup({
        type: new FormGroup({
            text: new FormControl(typeText, Validators.required)
        }),
        value: new FormControl()
    });
}

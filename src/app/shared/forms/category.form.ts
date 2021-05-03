import { FormControl, FormGroup, Validators } from '@angular/forms';

export function getCategoryForm(): FormGroup {
    return new FormGroup({
        text: new FormControl('', Validators.required) // inpatient, outpatient, community, discharge etc.. (Type of medication usage)
    });
}

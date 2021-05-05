import { FormControl, FormGroup, Validators } from '@angular/forms';

export function getCategoryForm(): FormGroup {
    return new FormGroup({
        text: new FormControl('inpatient', Validators.required) // inpatient, outpatient, community, discharge (Type of medication usage)
    });
}

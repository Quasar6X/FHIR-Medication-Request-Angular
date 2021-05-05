import { FormGroup } from '@angular/forms';
import { getIdentifierForm } from './identifier.form';

export function getUserForm(): FormGroup {
    return new FormGroup({
        uid: getIdentifierForm('uid'), // str
        email: getIdentifierForm('email'), // str
        displayName: getIdentifierForm('displayName'), // str
    });
}

import { FormControl, FormGroup, Validators } from '@angular/forms';

export function getNoteForm(): FormGroup {
    return new FormGroup({
        author: new FormGroup({ // author of this note
            authorString: new FormControl() // name of the author
        }),
        time: new FormControl(), // when this note was written
        text: new FormControl('', Validators.required) // the note text itself
    });
}

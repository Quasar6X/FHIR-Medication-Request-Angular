import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FbAuth } from '../../services/fb-auth.service';
import { Router } from '@angular/router';
import { getUserForm } from '../../shared/forms/user.form';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    userForm = getUserForm();
    form = new FormGroup({
        user: this.userForm,
        pwd1: new FormControl('', [Validators.required, Validators.minLength(6)]),
        pwd2: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    private static passwordsSame(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.get('pwd1').value !== control.get('pwd2').value) {
            return {passwordsDontMatch: true};
        }
        return null;
    }

    constructor(private snackBar: MatSnackBar, private authService: FbAuth, private router: Router) {
    }

    ngOnInit(): void {
        this.userForm.get('email').get('value').setValidators([Validators.required, Validators.email]);
        this.userForm.get('displayName').get('value').setValidators([Validators.required]);
        this.form.setValidators(RegistrationComponent.passwordsSame);
    }

    register(): void {
        this.authService.register(this.form.value.user.email.value, this.form.value.pwd1, this.form.value.user.displayName.value).then(() => {
            this.snackBar.open('Registering is successful', 'OK', {duration: 10000});
            this.navigateTo('/home');
        }).catch((error) => {
            this.snackBar.open(error.message, 'OK', {duration: 10000});
        });
    }

    navigateTo(url: string): void {
        this.router.navigate([url]).then();
    }
}

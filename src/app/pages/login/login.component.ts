import { Component, OnInit } from '@angular/core';
import { FbAuth } from '../../services/fb-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getUserForm } from '../../shared/forms/user.form';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    userForm = getUserForm();
    form = new FormGroup({
        user: this.userForm,
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    constructor(private snackBar: MatSnackBar, private authService: FbAuth, private router: Router) {
    }

    ngOnInit(): void {
        this.userForm.get('email').get('value').setValidators([Validators.required, Validators.email]);
    }

    login(): void {
        this.authService.signIn(this.form.value.user.email.value, this.form.value.password).then(() => {
            this.navigateTo('/home');
            this.snackBar.open('Login Successful! \ud83c\udf89', 'OK', {duration: 10000});
        }).catch(error => {
            this.snackBar.open(error.message, 'OK', {duration: 10000});
        });
    }

    navigateTo(url: string): void {
        this.router.navigate([url]).then();
    }

    success(event: FirebaseUISignInSuccessWithAuthResult): void {
        this.navigateTo('/home');
        this.snackBar.open('Login Successful! \ud83c\udf89', 'OK', {duration: 10000});
    }

    error(event: FirebaseUISignInFailure): void {
        this.snackBar.open(event.code, 'OK', {duration: 10000});
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FbAuth } from '../../services/fb-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import firebase from 'firebase';
import { getUserForm } from '../../shared/forms/user.form';
import User = firebase.User;

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    user: User | null;
    form = getUserForm();

    constructor(private router: Router, private authService: FbAuth, private snackbar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.authService.auth.onAuthStateChanged((user) => {
            if (user) {
                this.user = user;
                this.form.get('uid').get('value').setValue(this.user.uid);
                this.form.get('email').get('value').setValue(this.user.email);
                this.form.get('displayName').get('value').setValue(this.user.displayName);
            } else {
                if (this.authService.isLoggedIn) {
                    this.authService.signOut().then().finally(() => {
                        this.snackbar.open('Session was invalid, we have signed you out', 'OK', {duration: 10000});
                    });
                }
                this.router.navigate(['/login']).then().finally(() => {
                    this.snackbar.open('Session was invalid, we have signed you out', 'OK', {duration: 10000});
                });
            }
        }).then();

        this.form.get('uid').disable();
        this.form.get('email').disable();
    }

    modify(): void {
        this.authService.modifyUser(this.form.value.displayName.value).then(() => {
            this.router.navigate(['/profile']).then();
            this.snackbar.open('Changes are saved', 'OK', { duration: 10000 });
        }).catch(error => {
            this.snackbar.open(error.message, 'OK', { duration: 10000 });
        });
    }
}

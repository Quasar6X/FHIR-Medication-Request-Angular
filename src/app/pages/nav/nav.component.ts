import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FbAuth } from '../../services/fb-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import firebase from 'firebase';
import User = firebase.User;

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    user: User | null = null;
    disableProfileMenu = true;

    constructor(private router: Router, private authService: FbAuth, private snackbar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.authService.auth.onAuthStateChanged((user) => {
            if (user) {
                this.user = user;
                if (!user.isAnonymous) {
                    this.disableProfileMenu = false;
                }
            } else {
                this.router.navigate(['/login']).then();
            }
        }).then();
    }

    logout(): void {
        this.authService.signOut().then(() => {
            this.snackbar.open('Signed out successfully! \ud83c\udf89', 'OK', {duration: 10000});
            this.router.navigate(['login']).then();
        }).catch(error => {
            this.snackbar.open(error.message, 'OK', {duration: 10000});
        });
    }

    editProfile(): void {
        this.router.navigate(['/profile']).then();
    }
}

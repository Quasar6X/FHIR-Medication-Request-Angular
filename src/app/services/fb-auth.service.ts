import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class FbAuth {

    constructor(private afAuth: AngularFireAuth) {
    }

    signIn(email: string, password: string): Promise<void> {
        return this.afAuth.signInWithEmailAndPassword(email, password).then();
    }

    register(email: string, password: string, name: string): Promise<void> {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                    result.user.updateProfile({displayName: name, photoURL: null}).then();
                }
            );
    }

    get isLoggedIn(): boolean {
        return this.afAuth.currentUser !== null;
    }

    signOut(): Promise<void> {
        return this.afAuth.signOut().then();
    }

    get auth(): AngularFireAuth {
        return this.afAuth;
    }

    modifyUser(name: string): Promise<void> {
        return this.afAuth.currentUser.then(user => {
            user.updateProfile({ displayName: name, photoURL: null }).then();
        });
    }
}

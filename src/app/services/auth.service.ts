import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
user: User;
  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService,
    private db: AngularFireDatabase
    ) {
    this.user$ = afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.log(this.db.object(`users/${user.uid}`).valueChanges())
          return this.db.object(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
    this.user$.subscribe(user => console.log(user));
  }

  login() {
    // when we login with google we can not give the returnUrl to google and get it back.
    // so we need to store it somewhere in de storage
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  // get appUser$(): Observable<User> {
  //   return this.user$.pipe(
  //     switchMap(user => this.userService.get(user.uid))
  //   );
  // }
}

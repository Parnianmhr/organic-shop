import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  fbUser: firebase.User;
  user: Observable<User>;

  constructor(private auth: AuthService,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth) {

      this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
    }

  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => user && user.isAdmin),
      tap(isAdmin => {
        if (!isAdmin) { console.log('denied!'); }
      })
      );
  }
}

// this.fbUser = firebase.auth().currentUser;
//     return this.userService.get(this.fbUser.uid).pipe(
//       map((appUser: User) => appUser.isAdmin)
//     );

// return this.auth.user$.pipe(
//   switchMap(user => this.userService.get(user.uid).valueChanges()),
//   map((appUser: User) => appUser.isAdmin));

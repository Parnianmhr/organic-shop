import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  fbUser: firebase.User;

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$
    .pipe(switchMap(user => this.userService.get(user.uid)))
    .pipe(map((appUser) => appUser.isAdmin));
  }
}

// this.fbUser = firebase.auth().currentUser;
//     return this.userService.get(this.fbUser.uid).pipe(
//       map((appUser: User) => appUser.isAdmin)
//     );

// return this.auth.user$.pipe(
//   switchMap(user => this.userService.get(user.uid).valueChanges()),
//   map((appUser: User) => appUser.isAdmin));
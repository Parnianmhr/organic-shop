import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  save(user: firebase.User) {
    this.db.doc('/users/' + user.uid).set({
      name: user.displayName,
      email: user.email
    }, {merge: true })
    .then(() => console.log())
    .catch((reason: any) => console.log(reason));
  }

  get(uid: string): Observable<User> {
    return this.db.collection('users').doc('/users' + uid).valueChanges() as Observable<User>;
  }
}

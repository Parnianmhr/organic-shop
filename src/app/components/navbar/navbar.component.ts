import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user: firebase.User;

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => this.user = user);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}

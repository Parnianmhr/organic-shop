import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // using async pipe to allow angular unsubscrie automatically and we dont need to do that manualy
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}

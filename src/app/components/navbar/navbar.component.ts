import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user: User;
  // using async pipe in html to allow angular unsubscrie automatically and we dont need to do that manualy
  constructor(public auth: AuthService) {
    this.auth.user$.subscribe(user => this.user = user)
   }

  logout() {
    this.auth.logout();
  }

}

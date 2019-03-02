import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // using async pipe in html to allow angular unsubscrie automatically and we dont need to do that manualy
  constructor(public auth: AuthService) { }

  logout() {
    this.auth.logout();
  }

}

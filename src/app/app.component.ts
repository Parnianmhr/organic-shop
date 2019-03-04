import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // for appcomponent no need to unsubscribe because it is root component and
  // single instance of app component in the dom
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
    ) {
    // auth.user$.subscribe(user => {
    //   if (user) {
    //     userService.save(user);
    //     const returnUrl = localStorage.getItem('returnUrl');
    //     router.navigateByUrl(returnUrl);
    //   }
    // }
    // );
  }
}

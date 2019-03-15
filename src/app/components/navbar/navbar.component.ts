import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User;
  cart$: Observable<ShoppingCart>;

  // using async pipe in html to allow angular unsubscrie automatically and we dont need to do that manualy
  constructor(
    public auth: AuthService,
    private CartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);
    this.cart$ = await this.CartService.getCart();
  }

  logout() {
    this.auth.logout();
  }

}

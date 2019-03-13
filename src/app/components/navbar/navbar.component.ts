import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User;
shoppingCartItemCount: number;

  // using async pipe in html to allow angular unsubscrie automatically and we dont need to do that manualy
  constructor(
    public auth: AuthService,
    private CartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);
    const cart$ = await this.CartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (const productId in cart.items) {
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    });
  }

  logout() {
    this.auth.logout();
  }

}

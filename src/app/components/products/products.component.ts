import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: any[];
  category: string;
cart: any;
subscription: Subscription;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute
    ) {
    this.productService.getAll().pipe(
    switchMap(p => {
      this.products = p;
      return route.queryParamMap;
    }))
    .subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
    });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).valueChanges().subscribe(cart => {
      this.cart = cart;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


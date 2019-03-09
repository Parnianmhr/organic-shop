import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  subscription: Subscription;
  query: string;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.subscription = this.productService.getAll().subscribe(p => {
      this.products = p;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

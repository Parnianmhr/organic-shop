import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  product$: Observable<{}>;
  categories$: Observable<{}>;

  constructor(private productService: ProductService, private categoryService: CategoryService) {
    this.product$ = this.productService.getAll();
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit() {
  }

}

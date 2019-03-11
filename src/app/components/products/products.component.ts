import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: any[] = [];
  filteredProducts: any[];
  categories$: Observable<{}>;
  category: string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
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
    this.categories$ = this.categoryService.getCategories();
  }
}


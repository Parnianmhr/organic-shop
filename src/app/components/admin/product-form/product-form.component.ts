import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  categories$;
  product = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
    ) {
    this.categories$ = categoryService.getCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.get(id).pipe(take(1)).subscribe(p => this.product = p);
    }
  }

  save(product) {
    // console.log(product)
    this.productService.create(product);
    this.router.navigate(['admin/products']);
  }

}

import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  product: any = {};
  categories: any[];
  id: string;
  isProduct = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
    ) {
    categoryService.getCategories().subscribe( c => this.categories = c);
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isProduct = true;
      this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
    }
  }

  save(product: Product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['admin/products']);
  }

  delete() {
    if (!confirm('are you sure?')) { return; }

    this.productService.delete(this.id);
    this.router.navigate(['admin/products']);
  }
}

import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
  categories$: Observable<{}>;
  @Input() category: string;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getCategories();
  }
}

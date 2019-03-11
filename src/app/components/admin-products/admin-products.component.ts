import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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

  displayedColumns = ['title', 'price', 'category', 'edit'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAll().subscribe(p => {
      this.products = p;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

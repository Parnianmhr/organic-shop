import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input('product') product: any;
// tslint:disable-next-line: no-input-rename
  @Input('show-actions') showActions = true;

  constructor() { }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProducts'
})
export class SearchProductsPipe implements PipeTransform {

  transform(items: any[], searchText?: any): any {
    if (!items || !searchText) { return items; }
    if (searchText !== undefined && searchText !== '') {
      items = items.filter(item =>
        item.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        item.category.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      );
    }
    return items;
  }

}

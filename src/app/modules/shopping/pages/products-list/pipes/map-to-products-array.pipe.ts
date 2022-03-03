import { Pipe, PipeTransform } from '@angular/core';
import { ProductItem } from '@modules/shopping/models';

@Pipe({ name: 'mapToProductsArray' })
export class MapToProductsArrayPipe implements PipeTransform {
  transform(value: Record<number, ProductItem[]>): any {
    return Object.keys(value).map((key) => {
      const categoryId = parseInt(key);
      return ({ categoryId, products: value[categoryId] });
    })
  }
}
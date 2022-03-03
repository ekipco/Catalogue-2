import { Pipe, PipeTransform } from '@angular/core';
import { CategoryItem } from '@modules/shopping/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { productListSelectors } from '../store';

@Pipe({ name: 'getCategory' })
export class GetCategoryPipe implements PipeTransform {

  constructor(private _store$: Store) { }

  transform(categoryId: number): Observable<CategoryItem> {
    return this._store$.select(productListSelectors.category(categoryId))
  }

}
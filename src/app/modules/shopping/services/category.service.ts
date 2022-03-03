import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryItem, ProductItem } from '@modules/shopping/models';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {

  private readonly path: string = '/api/categories';

  constructor(private _http: HttpClient) { }

  public getCategories(): Observable<CategoryItem[]> {
    return this._http.get<CategoryItem[]>(`${this.path}`);
  }

  public getCategory(id: number): Observable<CategoryItem> {
    return this._http.get<CategoryItem>(`${this.path}/${id}`);
  }
  public getCategoryProducts(id: number): Observable<ProductItem[]> {
    return this._http.get<ProductItem[]>(`${this.path}/${id}/products`);
  }

}

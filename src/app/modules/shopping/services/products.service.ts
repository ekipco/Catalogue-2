import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductItem } from '../models';

@Injectable()
export class ProductsService {

  private readonly path: string = '/api/products';

  constructor(private _http: HttpClient) { }

  public getProduct(productId: number): Observable<ProductItem> {
    return this._http.get<ProductItem>(`${this.path}/${productId}`);
  }

}

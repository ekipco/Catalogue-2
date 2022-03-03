import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductItem } from '../models';

@Injectable()
export class FavoritesService {

  private readonly path: string = '/api/favorites';

  constructor(private _http: HttpClient) { }

  public addToFavorites(productId: number): Observable<void> {
    return this._http.post<void>(`${this.path}`, { productId });
  }

  public getFavorites(): Observable<ProductItem[]> {
    return this._http.get<ProductItem[]>(`${this.path}`);
  }

}

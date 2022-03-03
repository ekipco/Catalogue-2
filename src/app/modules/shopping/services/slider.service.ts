import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SliderImage } from '@modules/shopping/models';
import { Observable } from 'rxjs';
@Injectable()
export class SliderService {

  private readonly path: string = '/api/sliders';

  constructor(private _http: HttpClient) { }

  public getImages(): Observable<SliderImage[]> {
    return this._http.get<SliderImage[]>(`${this.path}`);
  }

}

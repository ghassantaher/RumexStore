import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces';
export interface ICategoryData {
  id: number;
  categoryName: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}
  getCategories(): Observable<ICategory[]> {
    return this.httpClient
      .get<ICategoryData[]>(`${environment.webAPIUrl}/Category`)
      .pipe(map((data) => this.transformToICategory(data)));
  }
  private transformToICategory(
    data: ICategoryData[]
  ): ICategory[] {
    let partialArrayItems = data?.map((item) => {
      return { id: item.id, categoryName: item.categoryName, products:[] };
    });
    return partialArrayItems;
  }
}


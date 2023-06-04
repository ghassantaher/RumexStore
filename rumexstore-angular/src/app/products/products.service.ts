import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ICategory, IProduct } from '../interfaces';
export interface ICategoryData {
  id: number;
  categoryName: string;
}
export interface IProductDetailData {
  modelName: string;
  description: string;
  productImage: string;
}

export interface IProductData {
  id: number;
  currentPrice:number;
  categoryName:string;
  details: IProductDetailData;
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
  getProducts(categoryId: string): Observable<IProduct[]> {
      return this.httpClient
        .get<IProductData[]>(
          `${environment.webAPIUrl}/Category/${categoryId}/products`
        )
        .pipe(map((data) => this.transformToIProducts(data)));
  }
  getAllProducts(): Observable<IProduct[]> {
      return this.httpClient
        .get<IProductData[]>(`${environment.webAPIUrl}/product`)
        .pipe(map((data) => this.transformToIProducts(data)));
  }
  getProduct(id: string): Observable<IProduct> {
    return this.httpClient
      .get<IProductData>(`${environment.webAPIUrl}/product/${id}`)
      .pipe(map((data) => this.transformToIProduct(data)));
  }

  private transformToICategory(data: ICategoryData[]): ICategory[] {
    let partialArrayItems = data?.map((item) => {
      return { id: item.id, categoryName: item.categoryName, products: [] };
    });
    return partialArrayItems;
  }

  private transformToIProducts(data: IProductData[]): IProduct[] {
    let partialArrayItems = data?.map((item) => {
      return {
        id: item.id,
        name: item.details.modelName,
        description: item.details.description,
        price: item.currentPrice,
        categoryName: item.categoryName,
        imageUrl: item.details.productImage,
      };
    });
    return partialArrayItems;
  }
  private transformToIProduct(data: IProductData): IProduct {
    return {
      id: data.id,
      name: data.details.modelName,
      description: data.details.description,
      price: data.currentPrice,
      categoryName: data.categoryName,
      imageUrl: data.details.productImage,
    };
  }
}


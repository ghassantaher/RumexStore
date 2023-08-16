import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import {
  ICategoriesResponse,
  IHttpParams,
  IAllProductsResponse,
  IProductsResponse,
  DisplayTypes,
} from '../interfaces';
import { ICategory, IProduct } from '../interfaces';

export interface ICategoryData {
  id: number;
  categoryName: string;
}
export interface IProductDetailData {
  modelName: string;
  description: string;
  productImage: string;
  productImages: string;
}

export interface IProductData {
  id: number;
  currentPrice: number;
  categoryName: string;
  details: IProductDetailData;
}
export interface IProductDataWithInfo {
  data: IProductData[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
}
export interface ICategoryDataWithInfo {
  data: ICategoryData[];
  totalCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}
  getAllProducts(httpParams: IHttpParams): Observable<IAllProductsResponse> {
    var params = new HttpParams()
      .set('pageIndex', httpParams.pageIndex.toString())
      .set('pageSize', httpParams.pageSize.toString())
      .set('sortColumn', httpParams.sortField)
      .set('sortOrder', httpParams.sortDirection)
      .set('filterColumn', httpParams.filterColumn)
      .set('filterQuery', httpParams.filterQuery);
    return this.httpClient
      .get<IProductDataWithInfo>(`${environment.webAPIUrl}/product`, { params })
      .pipe(map((data) => this.transformToAllProductsResponse(data)));
  }
  getCategories(): Observable<ICategoriesResponse> {
    return this.httpClient
      .get<ICategory[]>(`${environment.webAPIUrl}/Category`)
      .pipe(map((data) => this.transformToCategoriesResponse(data)));
  }
  getProducts(categoryId: string): Observable<IProductsResponse> {
    return this.httpClient
      .get<IProductData[]>(
        `${environment.webAPIUrl}/Category/${categoryId}/products`,
      )
      .pipe(map((data) => this.transformToProductsResponse(data)));
  }
  getFeaturedProducts(): Observable<IProductsResponse> {
    return this.httpClient
      .get<IProductData[]>(`${environment.webAPIUrl}/product/featured`)
      .pipe(map((data) => this.transformToProductsResponse(data)));
  }

  findProductById(productId: number): Observable<IProduct> {
    return this.httpClient
      .get<IProductData>(`${environment.webAPIUrl}/product/${productId}`)
      .pipe(map((data) => this.transformToProduct(data)));
  }

  saveProductsDisplayType(displayType: DisplayTypes): Observable<DisplayTypes> {
    localStorage.setItem('ProductsDisplayType', displayType);
    return of(displayType);
  }

  private transformToCategory(data: ICategoryData[]): ICategory[] {
    let partialArrayItems = data?.map((item) => {
      return { id: item.id, categoryName: item.categoryName, products: [] };
    });
    return partialArrayItems;
  }

  private transformToProduct(data: IProductData): IProduct {
    return {
      id: data.id,
      name: data.details.modelName,
      description: data.details.description,
      price: data.currentPrice,
      categoryName: data.categoryName,
      imageUrl: data.details.productImage,
    };
  }

  private transformToAllProductsResponse(
    data: IProductDataWithInfo,
  ): IAllProductsResponse {
    return {
      total: data.totalCount,
      products: data.data?.map((item) => {
        return {
          id: item.id,
          name: item.details.modelName,
          description: item.details.description,
          price: item.currentPrice,
          categoryName: item.categoryName,
          imageUrl: item.details.productImage,
        };
      }),
    };
  }
  private transformToProductsResponse(data: IProductData[]): IProductsResponse {
    return {
      total: data?.length,
      products: data?.map((item) => {
        return {
          id: item.id,
          name: item.details.modelName,
          description: item.details.description,
          price: item.currentPrice,
          categoryName: item.categoryName,
          imageUrl: item.details.productImage,
        };
      }),
    };
  }

  private transformToCategoriesResponse(
    data: ICategory[],
  ): ICategoriesResponse {
    return {
      total: data?.length,
      categories: data?.map((item) => {
        return {
          id: item.id,
          categoryName: item.categoryName,
          products: [],
        };
      }),
    };
  }

  private getFakeProducts(params: IHttpParams): IAllProductsResponse {
    let data = <IProduct[]>[];

    data = products.filter(
      (c) =>
        ~c.categoryName.toLocaleLowerCase().indexOf(params.filterQuery) ||
        ~c.name.toLocaleLowerCase().indexOf(params.filterQuery) ||
        ~c.description.toLocaleLowerCase().indexOf(params.filterQuery),
    );

    data.sort(
      (a, b) =>
        ((a as any)[params.sortField] > (b as any)[params.sortField] ? 1 : -1) *
        (params.sortDirection === 'asc' ? 1 : -1),
    );

    return {
      total: data.length,
      products: data.slice(
        params.pageIndex * params.pageSize,
        (params.pageIndex + 1) * params.pageSize,
      ),
    };
  }
}

const products = <IProduct[]>[
  <IProduct>{
    id: 1,
    price: 100,
    name: 'Nikolai',
    description: 'Uvarov',
    categoryName: 'Admin',
    imageUrl: 'image1',
  },
  <IProduct>{
    id: 2,
    price: 140,
    name: 'John',
    description: 'Conor',
    imageUrl: 'image2',
    categoryName: 'Admin',
  },
  <IProduct>{
    id: 3,
    price: 80,
    name: 'Olya',
    description: 'Bytsenko',
    imageUrl: 'image3',
    categoryName: 'User',
  },
  <IProduct>{
    id: 4,
    price: 100,
    name: 'Vasya',
    description: 'Pupkin',
    imageUrl: 'image4',
    categoryName: 'Partner',
  },
  <IProduct>{
    id: 5,
    price: 140,
    name: 'Ivan',
    description: 'Grozniy',
    imageUrl: 'image5',
    categoryName: 'Admin',
  },
  <IProduct>{
    id: 6,
    price: 80,
    name: 'Svet',
    description: 'Svetoslav',
    imageUrl: 'image6',
    categoryName: 'User',
  },
  ,
  <IProduct>{
    id: 7,
    price: 200,
    name: 'Alex',
    description: 'Great',
    imageUrl: 'image7',
    categoryName: 'Partner',
  },
  <IProduct>{
    id: 8,
    price: 40,
    name: 'Kolya',
    description: 'Smith',
    imageUrl: 'image8',
    categoryName: 'User',
  },
  <IProduct>{
    id: 9,
    price: 160,
    name: 'Tolya',
    description: 'Alikov',
    imageUrl: 'image9',
    categoryName: 'User',
  },
  <IProduct>{
    id: 10,
    price: 10,
    name: 'Tolya10',
    description: 'Alikov10',
    imageUrl: 'image10',
    categoryName: 'User',
  },
  ,
  <IProduct>{
    id: 11,
    price: 11,
    name: 'Tolya11',
    description: 'Alikov11',
    imageUrl: 'image11',
    categoryName: 'User',
  },
  ,
  <IProduct>{
    id: 12,
    price: 12,
    name: 'Tolya12',
    description: 'Alikov12',
    imageUrl: 'image12',
    categoryName: 'User',
  },
];

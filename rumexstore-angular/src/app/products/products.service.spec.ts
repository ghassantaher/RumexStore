import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService, ICategoryData } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule],});
    service = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should transform to undefined ICategory[] when passing null ICategoryData[]', () => {
    // @ts-ignore
    const result = service.transformToCategory(null);
    expect(result).toBeUndefined();
  });
  it('should transform to empty ICategory[] when passing empty ICategoryData[]', () => {
    // @ts-ignore
    const result = service.transformToCategory([]);
    expect(result).toBeDefined();
    expect(result[0]).toBeUndefined();
  });
  it('should transform to ICategory[] with 2 elements when passing ICategoryData[] with 2 elements', () => {
    // @ts-ignore
    const result = service.transformToCategory([
      { id: 1, categoryName: 'Cat1' },
      { id: 2, categoryName: 'Cat2' },
    ]);
    expect(result).toBeDefined();
    expect(result[0]).toBeDefined();
    expect(result.length).toEqual(2);
    expect(result[0].categoryName).toEqual('Cat1');
    expect(result[1].categoryName).toEqual('Cat2');
  });
  it('should get categories', () => {
    service.getCategories().subscribe();
    const req = httpTestingController.expectOne(
      'https://localhost:7092/api/Category'
    );
    expect(req.request.method).toBe('GET');
  });
});

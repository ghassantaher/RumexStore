import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { ShopComponent } from './shop.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsService } from '../../products/products.service';
import { ICategory } from '../../interfaces';

// describe('ShopComponent', () => {
//   let component: ShopComponent;
//   let fixture: ComponentFixture<ShopComponent>;
//   beforeEach(async () => {
//     // Create a mock productsService object with a mock 'getCategories' method
//     let productsService = jasmine.createSpyObj<ProductsService>(
//       'ProductsService',
//       ['getCategories'],
//     );
//     // Configure the 'getCategories' spy method
//     // productsService.getCategories.and.returnValue(
//     //   // return an Observable with some test data productsService
//     //   of<ICategory[]>(<ICategory[]>[
//     //     { id: 1, categoryName: 'cat1' },
//     //     { id: 2, categoryName: 'cat2' },
//     //   ])
//     // );

//     await TestBed.configureTestingModule({
//       declarations: [ShopComponent],
//       imports: [BrowserAnimationsModule, MaterialModule, RouterTestingModule],
//       providers: [
//         {
//           provide: ProductsService,
//           useValue: productsService,
//         },
//       ],
//     }).compileComponents();
//   });
//   beforeEach(() => {
//     fixture = TestBed.createComponent(ShopComponent);
//     component = fixture.componentInstance;

//     fixture.detectChanges();
//   });
//   // it('should create', () => {
//   //   expect(component).toBeTruthy();
//   // });

//   // it('should contain a toolbar with a list of one or more category buttons', () => {
//   //   let toolbar = fixture.nativeElement.querySelector('mat-toolbar.menu-bar');
//   //   let toolbarButtons = toolbar.querySelectorAll('button.mdc-button');
//   //   expect(toolbarButtons.length).toBeGreaterThan(0);
//   // });
// });

import { Component, OnInit } from '@angular/core';
import {ICategory} from '../interfaces'
import {ProductsService} from '../products/products.service'

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  categories: ICategory[];

  constructor(private productsService: ProductsService) {
    this.categories=[];
    this.productsService
      .getCategories()
      .subscribe((data) => (this.categories = data));
  }
  ngOnInit(): void {
  }
}

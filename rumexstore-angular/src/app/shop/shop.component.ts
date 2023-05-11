import { Component, OnInit } from '@angular/core';
import {ICategory} from '../interfaces'
import {ProductsService} from '../products/products.service'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
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

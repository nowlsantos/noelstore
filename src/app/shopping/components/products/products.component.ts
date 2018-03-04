import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';

import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.populateProducts();
    this.cart$ = await this.cartService.getCart();
  }

  private populateProducts() {
    this.productService
      .getAll()
      .switchMap( products => {
        this.products = products;
        return this.route.queryParamMap;
      })

      .subscribe( params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(prod => prod.category === this.category) :
      this.products;
  }
}

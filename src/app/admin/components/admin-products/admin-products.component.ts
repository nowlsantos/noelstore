import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  filteredProducts: any[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAll()
                            .subscribe(products => this.filteredProducts = this.products = products );
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter( product => product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ) :
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

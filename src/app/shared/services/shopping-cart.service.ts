import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../models/product';

import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-cart').push( {
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartID = await this.getOrCreateCartID();
    return this.db.object('/shopping-cart/' + cartID)
      .map( obj => new ShoppingCart(obj.items));
  }

  getItem(cartID: string, productID: string) {
    return this.db.object('/shopping-cart/' + cartID + '/items/' + productID);
  }

  async getOrCreateCartID(): Promise<string> {
    const cartID = localStorage.getItem('cartID');
    if ( cartID ) {
      return cartID;
    }

    const result = await this.create();
    localStorage.setItem('cartID', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartID = await this.getOrCreateCartID();
    this.db.object('/shopping-cart/' + cartID + '/items').remove();
  }

  private async updateItem(product: Product, count: number) {
    const cartID = await this.getOrCreateCartID();
    const item$ = this.getItem(cartID, product.$key);
    item$.take(1).subscribe( item => {
      const quantity = (item.quantity || 0) + count;
      if ( quantity <= 0 ) {
        item$.remove();
      } else {
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
      }
    });
  }
}

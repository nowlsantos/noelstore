import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products/').push(product);
  }

  getAll() {
    return this.db.list('/products/');
  }

  getProduct(productID: string) {
    return this.db.object('/products/' + productID);
  }

  update(id: string, product) {
    return this.db.object('/product/' + id).update(product);
  }

  delete(id: string) {
    return this.db.object('/products/' + id).remove();
  }
}

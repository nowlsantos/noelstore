import { Component, Input } from '@angular/core';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-shopping-summary',
  templateUrl: './shopping-summary.component.html',
  styleUrls: ['./shopping-summary.component.css']
})
export class ShoppingSummaryComponent {
  @Input('cart') cart: ShoppingCart;
}

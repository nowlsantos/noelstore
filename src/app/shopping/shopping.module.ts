/* Angular */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

/* Components */
import { ProductsComponent } from './components/products/products.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';

import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ShoppingSummaryComponent } from './components/shopping-summary/shopping-summary.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { AuthGuardService } from 'shared/services/auth-guard.service';

const routes: Routes = [
  /* anonymousUser */
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'myorders', component: MyOrdersComponent, canActivate: [ AuthGuardService ] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [ AuthGuardService ] },
  { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [ AuthGuardService ] },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProductsComponent,
    ProductFilterComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ShoppingSummaryComponent,
    ShippingFormComponent
  ]
})
export class ShoppingModule { }

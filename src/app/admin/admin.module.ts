/* Angular */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Shared */
import { SharedModule } from 'shared/shared.module';

/* Components */
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';

const routes: Routes = [
  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [ AuthGuardService, AdminGuardService ]
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [ AuthGuardService, AdminGuardService ]
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [ AuthGuardService, AdminGuardService ]
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [ AuthGuardService, AdminGuardService ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
  ]
})
export class AdminModule { }

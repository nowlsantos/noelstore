/* Angular */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

/* Shared Module */
import { SharedModule } from 'shared/shared.module';
import { CoreModule } from './core/core.module';
import { AdminModule } from './admin/admin.module';
import { ShoppingModule } from './shopping/shopping.module';

/* Firebase AngularFire2 */
import { AngularFireModule } from 'angularfire2';

/* Environment */
import { environment } from '../environments/environment';

/* Components */
import { AppComponent } from './app.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { LoginComponent } from './core/components/login/login.component';

/* Services */
import { AdminGuardService } from './admin/services/admin-guard.service';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CoreModule,
    SharedModule,
    AdminModule,
    ShoppingModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot(routes)
  ],
  providers: [
    AdminGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

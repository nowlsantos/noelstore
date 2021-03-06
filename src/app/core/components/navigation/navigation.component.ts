import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { AppUser } from '../../../shared/models/app-user';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(public authService: AuthService,
              private cartService: ShoppingCartService) {}

  async ngOnInit() {
    this.authService.appUser$
      .subscribe( appUser => this.appUser = appUser );

    this.cart$ = await this.cartService.getCart();
  }

  /* login() {
    this.authService.login();
  } */

  logout() {
    this.authService.logout();
  }

}

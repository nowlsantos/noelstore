import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/map';
// import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
    /* this.authService.user$.subscribe( user => {
      console.log('Guard:', user);
    }); */
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.user$.map( user => {
      if ( user ) {
        return true;
      } else {
        this.router.navigate(['/login'], { queryParams: { redirectUrl: state.url }});
        return false;
      }
    });
  }
}

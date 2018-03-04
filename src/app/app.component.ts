import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
    this.authService.user$.subscribe( (user) => {
      if ( !user ) {
        return;
      }

      this.userService.save(user);

      const returnUrl = localStorage.getItem('returnUrl');
      if ( !returnUrl ) {
        return;
      }
      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(returnUrl);
    });
  }
}
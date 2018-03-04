import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

import { AppUser } from '../models/app-user';
import { UserService } from './user.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/checkout';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider() );
  }

  logout() {
    this.router.navigate(['/']);
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap( user => {
        if ( user ) {
          return this.userService.get(user.uid);
        }
        return Observable.of(null);
      });
  }
}

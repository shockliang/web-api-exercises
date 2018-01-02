import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs/Rx';
import { AlertifyService } from './../services/alertify.service';
import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { User } from './../models/User';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class MemberEditResolver implements Resolve<User> {

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.authService.decodedToken.nameid)
      .catch(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/members']);
        return Observable.of(null);
      });
  }
}
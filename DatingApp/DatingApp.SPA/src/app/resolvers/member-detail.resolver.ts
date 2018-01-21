import { Observable } from 'rxjs/observable';
import { AlertifyService } from './../services/alertify.service';
import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { User } from './../models/User';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(route.params['id'])
      .catch(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/members']);
        return Observable.of(null);
      });
  }
}

import { Observable } from 'rxjs/Rx';
import { AlertifyService } from './../services/alertify.service';
import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { User } from './../models/User';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ListResolver implements Resolve<User[]> {
  pageSize = 5;
  pageNumber = 1;
  likeParam = 'Likers';

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likeParam)
      .catch(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/members']);
        return Observable.of(null);
      });
  }
}
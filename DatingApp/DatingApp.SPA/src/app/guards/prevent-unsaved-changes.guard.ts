import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { CanDeactivate } from '@angular/router/src/interfaces';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable()
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {
  canDeactivate(component: MemberEditComponent) {
    if (component.editFrom.dirty) {
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
    }

    return true;
  }
}

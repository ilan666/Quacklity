import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfileEditComponent } from '../UserProfile/user-profile-edit/user-profile-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<UserProfileEditComponent> {
  canDeactivate(
    component: UserProfileEditComponent): boolean {
    if (component.detailsForm.dirty || component.billingForm.dirty) {
      return confirm("Are you sure you want to continue?\n\nUnsaved changes will be lost.")
    }

    return true;
  }

}

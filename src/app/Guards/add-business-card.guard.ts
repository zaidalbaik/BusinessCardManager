import { CanActivateFn, Router } from '@angular/router';
import { AddBusinessCardAccessService } from '../Services/add-business-card-access.service';
import { inject } from '@angular/core';
import { PathsNames } from '../PathsNames';

export const addBusinessCardGuard: CanActivateFn = (route, state) => {
  const accessService = inject(AddBusinessCardAccessService);
  const router = inject(Router);

  // Check if access is allowed through the service
  if (accessService.isAccessAllowed()) {
    return true;
  } else {
    // Redirect to Business Cards page if accessed manually
    router.navigate([`${PathsNames.home}/${PathsNames.BusinessCards}`]);
    return false;
  }
};
